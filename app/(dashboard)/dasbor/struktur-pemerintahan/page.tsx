import OrganizationChart from '@/components/organization-chart';
import { OrganizationService } from '@/db/actions/organization';

export default async function SocialMediaPage() {
  const data = await OrganizationService.getAll();

  console.log(data, 'ini org data');

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Struktur Pemerintahan
      </h1>

      <div className="overflow-x-auto">
        <OrganizationChart />
      </div>
    </section>
  );
}
