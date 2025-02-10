'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile.services';
import { getSocialMedia } from '@/services/social-media.services';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Maps from '@/components/maps';

export default function ContactPage() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: socials, isLoading: isLoadingSocials } = useQuery({
    queryKey: ['socials'],
    queryFn: async () => getSocialMedia,
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Kontak </span>
            Kami
          </h1>
          <p className="text-gray-600">
            Hubungi kami melalui berbagai platform yang tersedia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {isLoadingProfile ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Alamat</h3>
                    <p className="text-gray-600">{profile?.data?.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Telepon</h3>
                    <p className="text-gray-600">{profile?.data?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">{profile?.data?.email}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="h-[400px]">
            <Maps />
          </div>
        </div>
      </div>
    </div>
  );
}
