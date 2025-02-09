'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RWManagement } from '@/components/wilayah/rw-management';
import { RTManagement } from '@/components/wilayah/rt-management';

export default function WilayahPage() {
  return (
    <div className="container mx-auto w-full space-y-6">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Wilayah
          </h1>
        </div>
      </div>

      <Tabs defaultValue="rw" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger className="font-medium" value="rw">
            RW
          </TabsTrigger>
          <TabsTrigger className="font-medium" value="rt">
            RT
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rw" className="space-y-4">
          <RWManagement />
        </TabsContent>
        <TabsContent value="rt" className="space-y-4">
          <RTManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
