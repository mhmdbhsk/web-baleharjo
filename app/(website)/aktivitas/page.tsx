'use client';

import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/services/activity.services';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import BlurHashImage from '@/components/blurhash-image';
import { formatDate } from '@/lib/utils';

export default function ActivitiesPage() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(),
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Aktivitas </span>
            Desa
          </h1>
          <p className="text-gray-600">
            Kegiatan-kegiatan yang dilaksanakan di Desa Baleharjo
          </p>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="h-48 w-full md:w-72" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : !activities?.data?.length ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Tidak ada kegiatan
                  </h3>
                  <p className="text-gray-500">
                    Belum ada kegiatan yang dilaksanakan saat ini
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            activities.data.map((activity: any) => (
              <Card key={activity.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative h-48 w-full md:w-72">
                      <BlurHashImage
                        src={activity.image}
                        alt={activity.title}
                        blurhash={activity.blurhash}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl font-bold">{activity.title}</h2>
                      <p className="text-sm text-gray-500">
                        {formatDate(activity.date)}
                      </p>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
