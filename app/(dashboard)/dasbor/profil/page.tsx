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
        title: values.title ?? '',
        description: values.description ?? '',
        history: values.history ?? '',
        vision: values.vision ?? '',
        mission: values.mission ?? '',
        address: values.address ?? '',
        phone: values.phone ?? '',
        email: values.email ?? '',
        logo: values.logo ?? '',
        blurhash: values.blurhash ?? '',
        area: values.area ?? '',
        topography: values.topography ?? '',
        boundaries: values.boundaries ?? {
          north: '',
          south: '',
          east: '',
          west: '',
        },
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
    <section>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-2">
        Profil
      </h1>

      <ProfileForm
        initialValues={{
          title: data?.data?.title ?? '',
          description: data?.data?.description ?? '',
          history: data?.data?.history ?? '',
          vision: data?.data?.vision ?? '',
          mission: data?.data?.mission ?? '',
          address: data?.data?.address ?? '',
          phone: data?.data?.phone ?? '',
          email: data?.data?.email ?? '',
          logo: data?.data?.logo ?? '',
          blurhash: data?.data?.blurhash ?? '',
          area: data?.data?.area ?? '',
          topography: data?.data?.topography ?? '',
          boundaries: {
            // @ts-ignore
            north: data?.data?.boundaries?.north ?? '',
            // @ts-ignore
            south: data?.data?.boundaries?.south ?? '',
            // @ts-ignore
            east: data?.data?.boundaries?.east ?? '',
            // @ts-ignore
            west: data?.data?.boundaries?.west ?? '',
          },
        }}
        isLoading={isLoading}
        onSubmit={(values) => mutate(values)}
      />
    </section>
  );
}
