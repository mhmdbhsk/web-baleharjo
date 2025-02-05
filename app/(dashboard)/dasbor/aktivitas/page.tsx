import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  type LucideIcon,
} from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/actions/users';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'baru saja';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return 'Anda mendaftar';
    case ActivityType.SIGN_IN:
      return 'Anda masuk';
    case ActivityType.SIGN_OUT:
      return 'Anda keluar';
    case ActivityType.UPDATE_PASSWORD:
      return 'Anda mengubah kata sandi';
    case ActivityType.DELETE_ACCOUNT:
      return 'Anda menghapus akun';
    case ActivityType.UPDATE_ACCOUNT:
      return 'Anda memperbarui akun';
    default:
      return 'Tindakan tidak dikenal terjadi';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Riwayat Aktivitas
      </h1>

      {logs.length > 0 ? (
        <ul className="space-y-4">
          {logs.map((log) => {
            const Icon = iconMap[log.action as ActivityType] || Settings;
            const formattedAction = formatAction(log.action as ActivityType);

            return (
              <li key={log.id} className="flex items-center space-x-4">
                <div className="bg-pink-100 rounded-full p-2">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {formattedAction}
                    {log.ipAddress && ` from IP ${log.ipAddress}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getRelativeTime(new Date(log.timestamp))}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No activity yet
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            When you perform actions like signing in or updating your account,
            they'll appear here.
          </p>
        </div>
      )}
    </section>
  );
}
