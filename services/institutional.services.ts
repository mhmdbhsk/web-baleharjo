import { Institutional } from '@/db/schema';

interface GetInstitutionalParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface InstitutionalResponse {
  data: Institutional[];
  metadata: {
    totalPages: number;
    totalItems: number;
  };
}

export async function getInstitutionals({
  page = 1,
  limit = 10,
  search = '',
}: GetInstitutionalParams = {}): Promise<InstitutionalResponse> {
  const response = await fetch(
    `/api/institutionals?page=${page}&limit=${limit}&search=${search}`
  );
  return response.json();
}

export async function createInstitutional(data: Partial<Institutional>) {
  const response = await fetch('/api/institutionals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateInstitutional(id: string, data: Partial<Institutional>) {
  const response = await fetch(`/api/institutionals/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteInstitutional(id: string) {
  const response = await fetch(`/api/institutionals/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}