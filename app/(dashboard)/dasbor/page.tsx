'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Newspaper, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getGuestBooks } from '@/services/guest-book.services';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { getInstitutionals } from '@/services/institutional.services';
import { getBlogPosts } from '@/services/blog.services';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const { data: guestBooks, isLoading: isLoadingGuestBooks } = useQuery({
    queryKey: ['guest-books'],
    queryFn: getGuestBooks,
  });

  const { data: institutions, isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: () => getInstitutionals(),
  });

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryKey: ['news'],
    queryFn: getBlogPosts,
  });

  const stats = [
    {
      name: 'Total Pengunjung',
      value: guestBooks?.length || 0,
      icon: Users,
      description: 'Total pengunjung yang mengisi buku tamu',
    },
    {
      name: 'Total Lembaga',
      value: institutions?.data?.length || 0,
      icon: Building2,
      description: 'Jumlah lembaga yang terdaftar',
    },
    {
      name: 'Total Berita',
      value: news?.data?.length || 0,
      icon: Newspaper,
      description: 'Jumlah berita yang dipublikasikan',
    },
    {
      name: 'Pengunjung Bulan Ini',
      value:
        guestBooks?.filter((guest: any) => {
          const date = new Date(guest.createdAt);
          const now = new Date();
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        }).length || 0,
      icon: Activity,
      description: 'Jumlah pengunjung dalam bulan ini',
    },
  ];

  // Purpose distribution data
  const purposeData = {
    labels: ['Surat Pengantar', 'Konsultasi', 'Pengaduan', 'Lainnya'],
    datasets: [
      {
        data: [
          guestBooks?.filter((guest: any) =>
            guest.purpose.toLowerCase().includes('surat')
          ).length || 0,
          guestBooks?.filter((guest: any) =>
            guest.purpose.toLowerCase().includes('konsultasi')
          ).length || 0,
          guestBooks?.filter((guest: any) =>
            guest.purpose.toLowerCase().includes('pengaduan')
          ).length || 0,
          guestBooks?.filter(
            (guest: any) =>
              !guest.purpose.toLowerCase().includes('surat') &&
              !guest.purpose.toLowerCase().includes('konsultasi') &&
              !guest.purpose.toLowerCase().includes('pengaduan')
          ).length || 0,
        ],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
      },
    ],
  };

  const monthlyData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Pengunjung',
        data: Array(12)
          .fill(0)
          .map(
            (_, month) =>
              guestBooks?.filter((guest: any) => {
                const date = new Date(guest.createdAt);
                return date.getMonth() === month;
              }).length || 0
          ),
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 1,
      },
      {
        label: 'Berita',
        data: Array(12)
          .fill(0)
          .map(
            (_, month) =>
              news?.data?.filter((item: any) => {
                const date = new Date(item.createdAt);
                return date.getMonth() === month;
              }).length || 0
          ),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  if (isLoadingGuestBooks || isLoadingInstitutions || isLoadingNews) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px]" />
                <Skeleton className="h-4 w-[120px] mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
              }}
              data={monthlyData}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Tujuan Kunjungan</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
              }}
              data={purposeData}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
