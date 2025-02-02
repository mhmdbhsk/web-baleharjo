import { db } from '@/db/drizzle';
import { organizationMembers } from '@/db/schema';

import { eq } from 'drizzle-orm';

export interface OrganizationMember {
  id: string;
  name: string;
  title: string;
  parentId: string | null;
}

export class OrganizationService {
  static async getAll(): Promise<OrganizationMember[]> {
    const members = await db.select({
      id: organizationMembers.id,
      name: organizationMembers.name,
      title: organizationMembers.title,
      parentId: organizationMembers.parentId
    }).from(organizationMembers);
    return members;
  }

  static async getHierarchy(): Promise<OrganizationMember[]> {
    const allMembers = await this.getAll();
    return this.buildHierarchy(allMembers);
  }

  static async create(data: Omit<OrganizationMember, 'id'>): Promise<OrganizationMember> {
    const [member] = await db
      .insert(organizationMembers)
      .values(data)
      .returning();
    return member;
  }

  static async update(id: string, data: Partial<OrganizationMember>): Promise<OrganizationMember> {
    const [updated] = await db
      .update(organizationMembers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(organizationMembers.id, id))
      .returning({
        id: organizationMembers.id,
        name: organizationMembers.name,
        title: organizationMembers.title,
        parentId: organizationMembers.parentId
      });
    return updated;
  }

  static async delete(id: string): Promise<void> {
    await db.delete(organizationMembers).where(eq(organizationMembers.id, id));
  }

  private static buildHierarchy(members: OrganizationMember[]): OrganizationMember[] {
    const memberMap = new Map<string, OrganizationMember & { children: OrganizationMember[] }>();

    members.forEach(member => {
      memberMap.set(member.id, { ...member, children: [] });
    });

    const roots: OrganizationMember[] = [];

    members.forEach(member => {
      if (member.parentId === null) {
        roots.push(memberMap.get(member.id)!);
      } else {
        const parent = memberMap.get(member.parentId);
        if (parent) {
          parent.children.push(memberMap.get(member.id)!);
        }
      }
    });

    return roots;
  }
}