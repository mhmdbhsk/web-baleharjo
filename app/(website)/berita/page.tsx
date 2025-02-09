'use client';

import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/services/blog.services';

export default function NewsPage() {
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: getBlogPosts,
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Berita Terkini</h1>
        <div className="grid gap-8">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="w-full md:w-72 aspect-video" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
            : blog?.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="flex flex-col md:flex-row gap-6 hover:bg-gray-50 p-4 rounded-lg transition"
                >
                  <div className="w-full md:w-72 relative aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </p>
                    <p className="text-gray-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
