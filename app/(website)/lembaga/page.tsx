'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getInstitutionals } from '@/services/institutional.services';
import BlurHashImage from '@/components/blurhash-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

function InstitutionalDialog({ org }: { org: any }) {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{org.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <BlurHashImage
            blurhash={org.blurhash}
            src={org.logo}
            alt={org.name}
            className="object-cover"
          />
        </div>

        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="prose max-w-none">
            <p className="text-sm leading-relaxed">{org.description}</p>
          </div>
        </ScrollArea>
      </div>
    </DialogContent>
  );
}

export default function InstitutionalsPage() {
  const { data: institutional, isLoading } = useQuery({
    queryKey: ['institutional'],
    queryFn: () => getInstitutionals(),
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mb-8">
            <span className="text-3xl font-bold">
              <span className="text-orange-500 mb-2">Kelembagaan </span>
              Baleharjo
            </span>
            <span>Kelembagaan yang terdapat di Kelurahan Karanganyar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <span className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Kelembagaan </span>
            Baleharjo
          </span>
          <span>Kelembagaan yang terdapat di Kelurahan Karanganyar</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutional?.data?.map((org) => (
            <Dialog key={org.id}>
              <DialogTrigger asChild>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative w-full overflow-hidden rounded-t-lg">
                    <BlurHashImage
                      blurhash={org.blurhash}
                      src={org.logo}
                      alt={org.name}
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl text-center">
                      {org.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <InstitutionalDialog org={org} />
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
