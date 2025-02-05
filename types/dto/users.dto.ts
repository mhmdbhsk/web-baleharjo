import { z } from 'zod';

export const penggunaSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  role: z.enum(['ADMIN', 'RT', 'RW']).default('ADMIN'),
});

export type PenggunaDto = z.infer<typeof penggunaSchema>;

export type UpdatePenggunaDto = Partial<Omit<PenggunaDto, 'password'>> & {
  password?: string;
};

export interface PenggunaWithId extends Omit<PenggunaDto, 'password'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}