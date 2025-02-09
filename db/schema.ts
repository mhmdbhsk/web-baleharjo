import {
  pgTable,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { cuid2 } from 'drizzle-cuid2/postgres';

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['ADMIN', 'RT', 'RW'] }).notNull().default('ADMIN'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  areaRt: varchar('area_rt', { length: 100 }),
  areaRw: varchar('area_rw', { length: 100 }),
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

export const documentRequests = pgTable('document_requests', {
  id: cuid2('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  nik: text('nik').notNull(),
  address: text('address').notNull(),
  purpose: text('purpose').notNull(),
  description: text('description'),
  status: text('status').notNull().default('PENDING'),
  rtComment: text('rt_comment'),
  rwComment: text('rw_comment'),
  adminComment: text('admin_comment'),
  documentNumber: text('document_number'),
  userId: cuid2('user_id').references(() => users.id, { onDelete: 'cascade' }),
  rtId: cuid2('rt_id').references(() => users.id).notNull(),
  rwId: cuid2('rw_id').references(() => users.id).notNull(),
  adminId: cuid2('admin_id').references(() => users.id),
  areaRt: text('area_rt').notNull(),
  areaRw: text('area_rw').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const documentNumbers = pgTable('document_numbers', {
  id: cuid2('id').defaultRandom().primaryKey(),
  number: text('number').notNull(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  documentRequestId: cuid2('document_request_id').references(() => documentRequests.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const letterStatements = pgTable('letter_statements', {
  id: cuid2('id').defaultRandom().primaryKey(),
  documentRequestId: cuid2('document_request_id').references(() => documentRequests.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  placeDateOfBirth: text('place_date_of_birth').notNull(),
  kkNumber: text('kk_number').notNull(),
  ktpNumber: text('ktp_number').notNull(),
  nationality: text('nationality').notNull(),
  religion: text('religion').notNull(),
  occupation: text('occupation').notNull(),
  address: text('address').notNull(),
  maritalStatus: text('marital_status').notNull(),
  letterPurpose: text('letter_purpose').notNull(),
  additionalInfo: text('additional_info'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const businessLetterRequests = pgTable('business_letter_requests', {
  id: cuid2('id').defaultRandom().primaryKey(),
  documentRequestId: cuid2('document_request_id').references(() => documentRequests.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  placeDateOfBirth: text('place_date_of_birth').notNull(),
  nik: text('nik').notNull(),
  nationality: text('nationality').notNull(),
  religion: text('religion').notNull(),
  occupation: text('occupation').notNull(),
  address: text('address').notNull(),
  phoneNumber: text('phone_number').notNull(),
  business: text('business').notNull(),
  businessAddress: text('business_address').notNull(),
  mothersName: text('mothers_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const landAppraisalLetters = pgTable('land_appraisal_letters', {
  id: cuid2('id').defaultRandom().primaryKey(),
  documentRequestId: cuid2('document_request_id').references(() => documentRequests.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  address: text('address').notNull(),
  no: text('no').notNull(),
  certificate: text('certificate').notNull(),
  noC: text('no_c').notNull(),
  noPersil: text('no_persil').notNull(),
  area: text('area').notNull(),
  builtOn: text('built_on').notNull(),
  boundaryNorth: text('boundary_north').notNull(),
  boundarySouth: text('boundary_south').notNull(),
  boundaryEast: text('boundary_east').notNull(),
  boundaryWest: text('boundary_west').notNull(),
  sinceDate: timestamp('since_date').notNull(),
  occupation: text('occupation').notNull(),
  usedFor: text('used_for').notNull(),
  appraisalPrice: text('appraisal_price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const guestBooks = pgTable('guest_books', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull(),
  purpose: text('purpose').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const documentRequestsRelations = relations(documentRequests, ({ one }) => ({
  letterStatement: one(letterStatements, {
    fields: [documentRequests.id],
    references: [letterStatements.documentRequestId],
  }),
  businessLetter: one(businessLetterRequests, {
    fields: [documentRequests.id],
    references: [businessLetterRequests.documentRequestId],
  }),
  landAppraisalLetter: one(landAppraisalLetters, {
    fields: [documentRequests.id],
    references: [landAppraisalLetters.documentRequestId],
  }),
  user: one(users, {
    fields: [documentRequests.userId],
    references: [users.id],
  }),
  rt: one(users, {
    fields: [documentRequests.rtId],
    references: [users.id],
  }),
  rw: one(users, {
    fields: [documentRequests.rwId],
    references: [users.id],
  }),
  admin: one(users, {
    fields: [documentRequests.adminId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type DocumentRequest = typeof documentRequests.$inferSelect;
export type NewDocumentRequest = typeof documentRequests.$inferInsert;
export type LetterStatement = typeof letterStatements.$inferSelect;
export type NewLetterStatement = typeof letterStatements.$inferInsert;
export type BusinessLetterRequest = typeof businessLetterRequests.$inferSelect;
export type NewBusinessLetterRequest = typeof businessLetterRequests.$inferInsert;
export type LandAppraisalLetter = typeof landAppraisalLetters.$inferSelect;
export type NewLandAppraisalLetter = typeof landAppraisalLetters.$inferInsert;

export enum DocumentType {
  LETTER_STATEMENT = 'LETTER_STATEMENT',
  BUSINESS_LETTER = 'BUSINESS_LETTER',
  LAND_APPRAISAL = 'LAND_APPRAISAL',
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED_RT = 'APPROVED_RT',
  REJECTED_RT = 'REJECTED_RT',
  APPROVED_RW = 'APPROVED_RW',
  REJECTED_RW = 'REJECTED_RW',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

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
// Add this type to enforce the area requirement in your application logic
export type UserWithArea = User & {
  areaRt: string | null;
  areaRw: string | null;
};

// Add this validation function
export function validateUserArea(user: UserWithArea): boolean {
  if (user.role === 'RT' && !user.areaRt) {
    return false;
  }
  if (user.role === 'RW' && !user.areaRw) {
    return false;
  }
  return true;
}

export const rw = pgTable('rw', {
  id: cuid2('id').defaultRandom().primaryKey(),
  number: varchar('number', { length: 10 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: cuid2('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const rt = pgTable('rt', {
  id: cuid2('id').defaultRandom().primaryKey(),
  number: varchar('number', { length: 10 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  rwId: cuid2('rw_id').references(() => rw.id).notNull(),
  userId: cuid2('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Add relations
export const rwRelations = relations(rw, ({ one, many }) => ({
  user: one(users, {
    fields: [rw.userId],
    references: [users.id],
  }),
  rts: many(rt),
}));

export const rtRelations = relations(rt, ({ one }) => ({
  rw: one(rw, {
    fields: [rt.rwId],
    references: [rw.id],
  }),
  user: one(users, {
    fields: [rt.userId],
    references: [users.id],
  }),
}));

// Add types
export type RW = typeof rw.$inferSelect;
export type NewRW = typeof rw.$inferInsert;
export type RT = typeof rt.$inferSelect;
export type NewRT = typeof rt.$inferInsert;

