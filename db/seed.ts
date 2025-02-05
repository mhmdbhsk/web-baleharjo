import { db } from './drizzle';
import { profile, users } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createAccout() {
  const email = 'admin@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  await db
    .insert(users)
    .values([
      {
        name: 'Admin',
        email: email,
        passwordHash: passwordHash,
        role: "ADMIN",
      },
    ])
    .returning();
}

async function createProfile() {
  await db.insert(profile)
    .values([
      {
        title: 'configuration',
        description: 'this is default configuration for profiles',
        vision: null,
        mission: null,
        address: null,
        phone: null,
        email: null,
        logo: null,
        blurhash: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();
}


async function seed() {
  await createAccout();
  await createProfile();
}

seed()
  .catch((error) => {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('✅ Seed process finished. Exiting...');
    process.exit(0);
  });
