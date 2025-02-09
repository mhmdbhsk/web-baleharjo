'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile.services';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Profil Desa</h1>
              <div className="prose max-w-none">
                <p>{profile?.data.address}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
