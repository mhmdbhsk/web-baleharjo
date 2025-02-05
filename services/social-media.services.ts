import { SocialMedia } from '@/db/schema';

interface GetSocialMediaParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface SocialMediaResponse {
  data: SocialMedia[];
  metadata: {
    totalPages: number;
    totalItems: number;
  };
}

export async function getSocialMedia({
  page = 1,
  limit = 10,
  search = '',
}: GetSocialMediaParams = {}): Promise<SocialMediaResponse> {
  const response = await fetch(
    `/api/social-media?page=${page}&limit=${limit}&search=${search}`
  );
  return response.json();
}

export async function createSocialMedia(data: Partial<SocialMedia>) {
  const response = await fetch('/api/social-media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateSocialMedia(id: string, data: Partial<SocialMedia>) {
  const response = await fetch(`/api/social-media/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteSocialMedia(id: string) {
  const response = await fetch(`/api/social-media/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}