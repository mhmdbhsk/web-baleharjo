import { User } from '@/db/schema';
import { PenggunaDto, UpdatePenggunaDto } from '@/types/dto/users.dto';

interface GetPenggunaParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface PenggunaResponse {
  data: User[];
  metadata: {
    totalPages: number;
    totalItems: number;
  };
}

export async function getPengguna({
  page = 1,
  limit = 10,
  search = '',
}: GetPenggunaParams = {}): Promise<PenggunaResponse> {
  const response = await fetch(
    `/api/users?page=${page}&limit=${limit}&search=${search}`
  );
  return response.json();
}

export async function createPengguna(data: PenggunaDto) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updatePengguna(id: string, data: UpdatePenggunaDto) {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deletePengguna(id: string) {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}