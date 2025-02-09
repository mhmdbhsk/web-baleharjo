import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { profile, users, socialMedia, potential, activity } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createAccount() {
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, 'admin@test.com')).limit(1);
    if (existingUser.length > 0) {
      console.log('✓ Admin account already exists');
      return;
    }

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
    console.log('✓ Created admin account');
  } catch (error) {
    console.error('Failed to create admin account:', error);
    throw error;
  }
}

async function createProfile() {
  try {
    const existingProfile = await db.select().from(profile).limit(1);
    if (existingProfile.length > 0) {
      console.log('✓ Profile configuration already exists');
      return;
    }

    await db.insert(profile)
      .values([
        {
          title: 'Desa Baleharjo',
          description: 'Selamat datang di website resmi Desa Baleharjo',
          vision: 'Mewujudkan Desa Baleharjo yang mandiri, maju, dan sejahtera',
          mission: 'Meningkatkan pelayanan masyarakat\nMengembangkan potensi desa\nMeningkatkan kesejahteraan masyarakat',
          address: 'Jl. Desa Baleharjo, Kec. Wonosari, Kab. Gunungkidul',
          phone: '(0274) 123456',
          email: 'desa@baleharjo.desa.id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning();
    console.log('✓ Created profile configuration');
  } catch (error) {
    console.error('Failed to create profile:', error);
    throw error;
  }
}

async function createDefaultSocialMedia() {
  try {
    const existingSocial = await db.select().from(socialMedia).limit(1);
    if (existingSocial.length > 0) {
      console.log('✓ Default social media already exists');
      return;
    }

    await db.insert(socialMedia)
      .values([
        {
          platform: 'Facebook',
          url: 'https://facebook.com/desabaleharjo',
          icon: 'facebook',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          platform: 'Instagram',
          url: 'https://instagram.com/desabaleharjo',
          icon: 'instagram',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          platform: 'YouTube',
          url: 'https://youtube.com/@desabaleharjo',
          icon: 'youtube',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning();
    console.log('✓ Created default social media');
  } catch (error) {
    console.error('Failed to create social media:', error);
    throw error;
  }
}

async function createDefaultPotential() {
  try {
    const existingPotential = await db.select().from(potential).limit(1);
    if (existingPotential.length > 0) {
      console.log('✓ Default potential already exists');
      return;
    }

    await db.insert(potential)
      .values([
        {
          title: 'Wisata Goa Pindul',
          description: 'Goa Pindul adalah destinasi wisata cave tubing yang terletak di Desa Baleharjo',
          category: 'Wisata',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .returning();
    console.log('✓ Created default potential');
  } catch (error) {
    console.error('Failed to create potential:', error);
    throw error;
  }
}

async function seed() {
  console.log('🌱 Starting seed process...');

  try {
    await createAccount();
    await createProfile();
    await createDefaultSocialMedia();
    await createDefaultPotential();

    console.log('✅ Seed process completed successfully');
  } catch (error) {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  }
}

seed()
  .catch((error) => {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('👋 Seed process finished. Exiting...');
    process.exit(0);
  });
