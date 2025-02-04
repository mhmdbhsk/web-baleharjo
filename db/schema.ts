import {
  pgTable,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cuid2 } from 'drizzle-cuid2/postgres';

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('admin'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const activityLogs = pgTable('activity_logs', {
  id: cuid2('id').defaultRandom().primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const blogPosts = pgTable('blog_posts', {
  id: cuid2('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  blurhash: text('blurhash'),
  coverImage: text('cover_image'),
  isHighlighted: varchar('is_highlighted', { length: 1 }).default('0'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  authorId: varchar('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const organizationMembers: any = pgTable('organization_members', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  parentId: cuid2('parent_id').references(() => organizationMembers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationMembersRelations = relations(organizationMembers, ({ many, one }) => ({
  children: many(organizationMembers, {
    relationName: 'parent',
  }),
  parent: one(organizationMembers, {
    fields: [organizationMembers.parentId],
    references: [organizationMembers.id],
    relationName: 'children',
  }),
}));


export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const activity = pgTable('activity', {
  id: cuid2('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  image: text('image'),
  blurhash: text('blurhash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const institutional = pgTable('institutional', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  logo: text('logo'),
  blurhash: text('blurhash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const potential = pgTable('potential', {
  id: cuid2('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  image: text('image'),
  blurhash: text('blurhash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const socialMedia = pgTable('social_media', {
  id: cuid2('id').defaultRandom().primaryKey(),
  platform: varchar('platform', { length: 100 }).notNull(),
  url: text('url').notNull(),
  icon: varchar('icon', { length: 100 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const profile = pgTable('profile', {
  id: cuid2('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  vision: text('vision'),
  mission: text('mission'),
  address: text('address'),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  logo: text('logo'),
  blurhash: text('blurhash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type Activity = typeof activity.$inferSelect;
export type NewActivity = typeof activity.$inferInsert;
export type Institutional = typeof institutional.$inferSelect;
export type NewInstitutional = typeof institutional.$inferInsert;
export type Potential = typeof potential.$inferSelect;
export type NewPotential = typeof potential.$inferInsert;
export type SocialMedia = typeof socialMedia.$inferSelect;
export type NewSocialMedia = typeof socialMedia.$inferInsert;
export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;


export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_POST = 'CREATE_POST',
  UPDATE_POST = 'UPDATE_POST',
  DELETE_POST = 'DELETE_POST',
}

