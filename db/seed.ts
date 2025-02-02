import { db } from './drizzle';
import { profile, socialMedia, users } from './schema';
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
        role: "admin",
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
  createAccout()
    .catch((error) => {
      console.error('❌ Seed process failed:', error);
      process.exit(1);
    })
    .finally(() => {
      console.log('🤵‍♂️ Initialize account');
      process.exit(0);
    });

  createProfile()
    .catch((error) => {
      console.error('❌ Seed process failed:', error);
      process.exit(1);
    })
    .finally(() => {
      console.log('🪪 Initialize profile');
      process.exit(0);
    });
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
