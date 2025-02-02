'use client';

import ProfileForm from '@/components/forms/profile-form';
import { Profile } from '@/db/schema';
import { getProfile, updateProfile } from '@/services/profile.services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { mutate } = useMutation({
    mutationFn: (values: Partial<Profile>) =>
      updateProfile({
        address: values.address ?? '',
        phone: values.phone ?? '',
        email: values.email ?? '',
        vision: values.vision ?? '',
        mission: values.mission ?? '',
      }),
    onSuccess: () => {
      refetch();
      toast.success('Berhasil memperbarui profil');
    },
    onError: () => {
      refetch();
      toast.error('Gagal memperbarui profil');
    },
  });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Profil
      </h1>

      <ProfileForm
        initialValues={{
          address: data?.data?.address ?? '',
          phone: data?.data?.phone ?? '',
          email: data?.data?.email ?? '',
          vision: data?.data?.vision ?? '',
          mission: data?.data?.mission ?? '',
        }}
        isLoading={isLoading}
        onSubmit={(values) => mutate(values)}
      />
    </section>
  );
}
