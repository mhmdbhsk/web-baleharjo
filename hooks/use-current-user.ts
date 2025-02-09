import { useQuery } from '@tanstack/react-query';

async function getCurrentUser() {
  const response = await fetch('/api/auth/me');
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    user,
    isLoading,
  };
}