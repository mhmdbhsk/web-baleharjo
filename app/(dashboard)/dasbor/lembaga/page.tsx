import { Plus } from 'lucide-react';
import SocialMediaForm from '@/components/form/social-media-form';
import { Button } from '@/components/ui/button';

export default async function SocialMediaPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex w-full justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
            Lembaga
          </h1>
        </div>

        <div className="">
          <Button size="sm">
            <Plus />
            Tambah Lembaga
          </Button>
        </div>
      </div>

      <SocialMediaForm />
    </section>
  );
}
