import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function RegionPotentialPage() {
  return (
    <section>
      <div className="flex w-full justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Potensi Daerah
          </h1>
        </div>

        <div>
          <Button size="sm">
            <Plus />
            Tambah Potensi
          </Button>
        </div>
      </div>
    </section>
  );
}
