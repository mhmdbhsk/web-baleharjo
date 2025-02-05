import { Potential } from '@/db/schema';

interface GetPotentialParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface PotentialResponse {
  data: Potential[];
  metadata: {
    totalPages: number;
    totalItems: number;
  };
}

export async function getPotentials({
  page = 1,
  limit = 10,
  search = '',
}: GetPotentialParams = {}): Promise<PotentialResponse> {
  const response = await fetch(
    `/api/potentials?page=${page}&limit=${limit}&search=${search}`
  );
  return response.json();
}

export async function createPotential(data: Partial<Potential>) {
  const response = await fetch('/api/potentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updatePotential(id: string, data: Partial<Potential>) {
  const response = await fetch(`/api/potentials/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deletePotential(id: string) {
  const response = await fetch(`/api/potentials/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}