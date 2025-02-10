'use client';

import { useQuery } from '@tanstack/react-query';
import { getPotentials } from '@/services/potential.services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import BlurHashImage from '@/components/blurhash-image';

export default function PotentialPage() {
  const { data: potentials, isLoading } = useQuery({
    queryKey: ['potentials'],
    queryFn: async () => getPotentials(),
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Potensi </span>
            Desa
          </h1>
          <p className="text-gray-600">
            Berbagai potensi yang dimiliki Desa Baleharjo
          </p>
        </div>

        <div className="mb-8">
          <BlurHashImage
            alt="Potensi Desa Baleharjo"
            blurhash="LVJRXCrn~qV?off,RPtRXBNgIVkD"
            src="/potensi.webp"
            rounded
            aspectRatio="wide"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20" />
                  </CardContent>
                </Card>
              ))
            : potentials?.data?.map((potential) => (
                <Card key={potential.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    {potential.image && (
                      <BlurHashImage
                        src={potential?.image}
                        alt={potential?.title}
                        blurhash={potential?.blurhash as string}
                        className="object-cover"
                        aspectRatio="square"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center text-center">
                      {potential.title}
                    </CardTitle>
                  </CardHeader>
                  {/* <CardContent className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {potential.title}
                    </h3>
                  </CardContent> */}
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
