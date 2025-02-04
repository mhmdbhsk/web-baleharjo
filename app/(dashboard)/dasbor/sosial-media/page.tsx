'use client';

import SocialMediaForm from '@/components/forms/social-media-form';
import { SocialMedia } from '@/db/schema';
import {
  createSocialMedia,
  deleteSocialMedia,
  getSocialMedia,
  updateSocialMedia,
} from '@/services/social-media.services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export default async function SocialMediaPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['social-media'],
    queryFn: getSocialMedia,
  });

  const { mutate: create } = useMutation({
    mutationFn: (values: SocialMedia) => createSocialMedia(values),
    onSuccess: () => {
      refetch();
      toast.success('Berhasil membuat sosial media');
    },
    onError: () => {
      refetch();
      toast.error('Gagal membuat sosial media');
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: Partial<SocialMedia>;
    }) => updateSocialMedia(id, values),
    onSuccess: () => {
      refetch();
      toast.success('Berhasil memperbarui sosial media');
    },
    onError: () => {
      refetch();
      toast.error('Gagal memperbarui sosial media');
    },
  });

  const { mutate: del } = useMutation({
    mutationFn: (id: string) => deleteSocialMedia(id),
    onSuccess: () => {
      refetch();
      toast.success('Berhasil menghapus sosial media');
    },
    onError: () => {
      refetch();
      toast.error('Gagal menghapus sosial media');
    },
  });

  return (
    <section>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Sosial Media
      </h1>
    </section>
  );
}
