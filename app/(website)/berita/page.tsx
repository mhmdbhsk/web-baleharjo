'use client';

import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import BlurHashImage from '@/components/blurhash-image';
import Link from 'next/link';
import { getBlogPosts } from '@/services/blog.services';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog'],
    queryFn: () => getBlogPosts({}),
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Berita </span>
            Terkini
          </h1>
          <p className="text-gray-600">
            Informasi terbaru seputar Desa Baleharjo
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <Newspaper className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Gagal memuat berita
            </h2>
            <p className="text-gray-600">
              Terjadi kesalahan saat memuat berita. Silakan coba lagi nanti.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid gap-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-6 bg-white rounded-lg p-4"
                >
                  <Skeleton className="w-full md:w-72 aspect-video rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
          </div>
        ) : blog?.data?.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Newspaper className="h-8 w-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Belum ada berita
            </h2>
            <p className="text-gray-600">
              Belum ada berita yang dipublikasikan saat ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blog?.data.map((item: any) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="flex flex-col md:flex-row gap-6 bg-white hover:bg-gray-50 p-6 rounded-lg transition group"
              >
                <div className="w-full md:w-72 relative aspect-video">
                  <BlurHashImage
                    src={item.image}
                    alt={item.title}
                    blurhash={item.blurhash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'}
                    className="rounded-lg group-hover:scale-105 transition"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </p>
                  <p className="text-gray-600 line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
