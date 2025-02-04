import OrganizationChart from '@/components/organization-chart';

export default async function SocialMediaPage() {
  return (
    <section>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Struktur Pemerintahan
      </h1>

      <div className="overflow-x-auto">
        <OrganizationChart />
      </div>
    </section>
  );
}
