import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  date,
  jsonb,
  numeric,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

/**
 * Every table carries tenant_id.
 *
 * You are deploying one school per instance today, so this column is
 * effectively constant. Keep it anyway: adding it later across twenty tables
 * and every query is genuinely painful, and it is what lets you flip to
 * shared-database multi-tenancy (host -> tenant in middleware + row level
 * security) without a schema migration.
 */
const tenant = () => text('tenant_id').notNull();

/* ---------------------------------------------------------------- admissions */

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    parentName: text('parent_name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    childName: text('child_name'),
    childDob: date('child_dob'),
    programSlug: text('program_slug'),
    preferredDate: date('preferred_date'),
    message: text('message'),
    /** new | contacted | tour_booked | visited | enrolled | lost */
    status: text('status').notNull().default('new'),
    /** organic | ads | referral | walkin */
    source: text('source').default('organic'),
    phoneVerified: boolean('phone_verified').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    byTenantStatus: index('leads_tenant_status_idx').on(t.tenantId, t.status),
    byCreated: index('leads_created_idx').on(t.tenantId, t.createdAt),
  })
);

/** Short-lived OTP codes for the tour form. Kills most junk leads. */
export const otpCodes = pgTable(
  'otp_codes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    phone: text('phone').notNull(),
    codeHash: text('code_hash').notNull(),
    attempts: integer('attempts').notNull().default(0),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ byPhone: index('otp_phone_idx').on(t.tenantId, t.phone) })
);

/* ------------------------------------------------------------------- people */

export const guardians = pgTable(
  'guardians',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    relation: text('relation'),
    passwordHash: text('password_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ uniquePhone: uniqueIndex('guardians_tenant_phone_key').on(t.tenantId, t.phone) })
);

export const staff = pgTable(
  'staff',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    /** admin | teacher | accounts */
    role: text('role').notNull().default('teacher'),
    bio: text('bio'),
    photoKey: text('photo_key'),
    showOnWebsite: boolean('show_on_website').notNull().default(false),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ uniqueEmail: uniqueIndex('staff_tenant_email_key').on(t.tenantId, t.email) })
);

export const classes = pgTable('classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  name: text('name').notNull(),
  programSlug: text('program_slug').notNull(),
  academicYear: text('academic_year').notNull(),
  leadTeacherId: uuid('lead_teacher_id').references(() => staff.id),
});

export const students = pgTable(
  'students',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    dob: date('dob').notNull(),
    classId: uuid('class_id').references(() => classes.id),
    /** Blocks a photo from ever reaching a public page. Gate publish on this. */
    mediaConsent: boolean('media_consent').notNull().default(false),
    allergies: text('allergies'),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ byClass: index('students_class_idx').on(t.tenantId, t.classId) })
);

export const guardianStudents = pgTable('guardian_students', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  guardianId: uuid('guardian_id').notNull().references(() => guardians.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  isPrimary: boolean('is_primary').notNull().default(false),
});

/* -------------------------------------------------------------- daily rhythm */

export const attendance = pgTable(
  'attendance',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    day: date('day').notNull(),
    /** present | absent | late | leave */
    status: text('status').notNull(),
    note: text('note'),
  },
  (t) => ({ uniquePerDay: uniqueIndex('attendance_student_day_key').on(t.studentId, t.day) })
);

export const diaryEntries = pgTable(
  'diary_entries',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    /** Null studentId = a class-wide note every parent in the class sees. */
    studentId: uuid('student_id').references(() => students.id, { onDelete: 'cascade' }),
    classId: uuid('class_id').references(() => classes.id),
    day: date('day').notNull(),
    meals: text('meals'),
    nap: text('nap'),
    mood: text('mood'),
    learning: text('learning'),
    note: text('note'),
    authorId: uuid('author_id').references(() => staff.id),
    publishedAt: timestamp('published_at', { withTimezone: true }),
  },
  (t) => ({ byDay: index('diary_day_idx').on(t.tenantId, t.day) })
);

/* --------------------------------------------------------------------- media */

export const media = pgTable(
  'media',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    /** R2 object key. Never a full URL - the public base is env-driven. */
    key: text('key').notNull(),
    kind: text('kind').notNull().default('image'),
    width: integer('width'),
    height: integer('height'),
    bytes: integer('bytes'),
    alt: text('alt'),
    caption: text('caption'),
    /** gallery | diary | staff | brand | activity */
    collection: text('collection').notNull().default('gallery'),
    classId: uuid('class_id').references(() => classes.id),
    diaryEntryId: uuid('diary_entry_id').references(() => diaryEntries.id, { onDelete: 'cascade' }),
    /** Only true once every child in the frame has media consent on file. */
    publicOk: boolean('public_ok').notNull().default(false),
    uploadedBy: uuid('uploaded_by').references(() => staff.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ byCollection: index('media_collection_idx').on(t.tenantId, t.collection) })
);

/**
 * Lets the school swap its own logo from the admin console without a deploy.
 * Resolution order in the app is: this table -> brand config default.
 */
export const brandAssets = pgTable(
  'brand_assets',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    /** logo | logoDark | mark | ogImage | heroA | heroB */
    role: text('role').notNull(),
    key: text('key').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ uniqueRole: uniqueIndex('brand_assets_tenant_role_key').on(t.tenantId, t.role) })
);

/* ------------------------------------------------------------------ comms */

export const announcements = pgTable('announcements', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  /** all | class | program */
  audience: text('audience').notNull().default('all'),
  classId: uuid('class_id').references(() => classes.id),
  pinned: boolean('pinned').notNull().default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  title: text('title').notNull(),
  description: text('description'),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  endsAt: timestamp('ends_at', { withTimezone: true }),
  location: text('location'),
  isPublic: boolean('is_public').notNull().default(true),
});

export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  parentName: text('parent_name').notNull(),
  relation: text('relation'),
  quote: text('quote').notNull(),
  photoKey: text('photo_key'),
  published: boolean('published').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
});

/* ------------------------------------------------------------------- money */

export const invoices = pgTable(
  'invoices',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    studentId: uuid('student_id').notNull().references(() => students.id),
    number: text('number').notNull(),
    term: text('term'),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    currency: text('currency').notNull().default('INR'),
    dueDate: date('due_date'),
    /** draft | sent | paid | overdue | cancelled */
    status: text('status').notNull().default('draft'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({ uniqueNumber: uniqueIndex('invoices_tenant_number_key').on(t.tenantId, t.number) })
);

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: tenant(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  provider: text('provider').notNull().default('razorpay'),
  providerRef: text('provider_ref'),
  status: text('status').notNull().default('created'),
  paidAt: timestamp('paid_at', { withTimezone: true }),
});

/* --------------------------------------------------------------- kids zone */

/**
 * Activities are content, not code. Five reusable question types are
 * implemented in the app; everything else is rows.
 *
 * isGlobal = true rows are the shared library every tenant inherits, so you
 * are not duplicating the whole question bank per school. A school can add
 * its own rows scoped to its tenantId.
 */
export const activities = pgTable(
  'activities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: text('tenant_id'),
    isGlobal: boolean('is_global').notNull().default(false),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    /** pick_one | audio_match | pair_match | sequence | snap_place */
    kind: text('kind').notNull(),
    /** toddler | nursery | kinder */
    ageBand: text('age_band').notNull(),
    /** Emoji or icon key used on the big tappable tile. */
    icon: text('icon').notNull().default('star'),
    tone: text('tone').notNull().default('primary'),
    /** Spoken aloud before the first question. Children cannot read. */
    introAudioKey: text('intro_audio_key'),
    published: boolean('published').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => ({ bySlug: index('activities_slug_idx').on(t.slug) })
);

export const activityItems = pgTable(
  'activity_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    activityId: uuid('activity_id').notNull().references(() => activities.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
    /** Shown as large text for adults, but the audio is what the child uses. */
    promptText: text('prompt_text').notNull(),
    promptAudioKey: text('prompt_audio_key'),
    promptImageKey: text('prompt_image_key'),
    /** [{ id, label, imageKey?, emoji? }] */
    options: jsonb('options').notNull(),
    correctOptionId: text('correct_option_id').notNull(),
    rewardSticker: text('reward_sticker').default('star'),
  },
  (t) => ({ byActivity: index('activity_items_activity_idx').on(t.activityId, t.sortOrder) })
);

/**
 * Only written for signed-in parents. Anonymous children keep progress in
 * IndexedDB on the device - no row, no identifier, nothing collected.
 */
export const childProgress = pgTable(
  'child_progress',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: tenant(),
    studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    activityId: uuid('activity_id').notNull().references(() => activities.id, { onDelete: 'cascade' }),
    roundsCompleted: integer('rounds_completed').notNull().default(0),
    firstTryCorrect: integer('first_try_correct').notNull().default(0),
    totalAnswered: integer('total_answered').notNull().default(0),
    lastPlayedAt: timestamp('last_played_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    uniquePair: uniqueIndex('child_progress_student_activity_key').on(t.studentId, t.activityId),
  })
);
