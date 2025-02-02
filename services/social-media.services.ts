import { SocialMedia } from '@/db/schema';

export const getSocialMedia = async () => {
  const response = await fetch(`/api/social-media`);

  const data = await response.json();
  return data;
};

export const getSocialMediaById = async (id: string) => {
  const response = await fetch(`/api/social-media/${id}`);

  const data = await response.json();
  return data;
};

export const createSocialMedia = async (data: SocialMedia) => {
  const response = await fetch(`/api/social-media`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataResponse = await response.json();
  return dataResponse;
}

export const updateSocialMedia = async (id: string, data: Partial<SocialMedia>) => {
  const response = await fetch(`/api/social-media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataResponse = await response.json();
  return dataResponse;
};

export const deleteSocialMedia = async (id: string) => {
  const response = await fetch(`/api/social-media/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataResponse = await response.json();
  return dataResponse;
};