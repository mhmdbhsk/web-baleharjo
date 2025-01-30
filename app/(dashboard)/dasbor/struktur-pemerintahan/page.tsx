import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertCircle } from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/actions/users';
import SocialMediaForm from '@/components/form/social-media-form';

export default async function SocialMediaPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Sosial Media
      </h1>

      <SocialMediaForm />
    </section>
  );
}
