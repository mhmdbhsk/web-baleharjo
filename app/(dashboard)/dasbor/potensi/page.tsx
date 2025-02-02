import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function RegionPotentialPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex w-full justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
            Potensi Daerah
          </h1>
        </div>

        <div className="">
          <Button size="sm">
            <Plus />
            Tambah Potensi
          </Button>
        </div>
      </div>
    </section>
  );
}
