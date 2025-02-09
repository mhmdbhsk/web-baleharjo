'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Users,
  Settings,
  Shield,
  Activity,
  Menu,
  Newspaper,
  Info,
  Globe,
  Calendar,
  Component,
  Landmark,
  Workflow,
  FileStack,
  Gauge,
  Map,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dasbor', icon: Gauge, label: 'Dasbor', subgroup: null },
    {
      href: '/dasbor/berita',
      icon: Newspaper,
      label: 'Berita',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/profil',
      icon: Info,
      label: 'Profil',
      subgroup: 'Pengaturan',
    },
    {
      href: '/dasbor/struktur-pemerintahan',
      icon: Workflow,
      label: 'Struktur Pemerintahan',
      subgroup: 'Pengaturan',
    },
    {
      href: '/dasbor/lembaga',
      icon: Landmark,
      label: 'Lembaga',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/wilayah',
      icon: Map,
      label: 'Wilayah',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/potensi',
      icon: Component,
      label: 'Potensi',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/kegiatan',
      icon: Calendar,
      label: 'Kegiatan',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/sosial-media',
      icon: Globe,
      label: 'Sosial Media',
      subgroup: 'Pengaturan',
    },
    {
      href: '/dasbor/umum',
      icon: Settings,
      label: 'General',
      subgroup: 'Akun',
    },
    {
      href: '/dasbor/aktivitas',
      icon: Activity,
      label: 'Aktivitas',
      subgroup: 'Akun',
    },
    {
      href: '/dasbor/keamanan',
      icon: Shield,
      label: 'Kemananan',
      subgroup: 'Akun',
    },
    {
      href: '/dasbor/surat',
      icon: FileStack,
      label: 'Surat',
      subgroup: 'Manajemen',
    },
    {
      href: '/dasbor/pengguna',
      icon: Users,
      label: 'Pengguna',
      subgroup: 'Manajemen',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:hidden fixed top-[78px] left-0 right-0 z-50 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-end max-w-7xl mx-auto w-full">
          <Button
            variant="outline"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 pt-[78px]">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[78px] left-0 h-[calc(100vh-78px)] w-64 
            bg-white lg:bg-gray-50 border-r border-gray-200 
            overflow-y-auto transition-transform duration-300 ease-in-out
            lg:translate-x-0 z-[100]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}
        >
          <nav className="h-full p-2 z-50">
            {navItems
              .filter((item) => !item.subgroup)
              .map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className={`shadow-none my-1 w-full justify-start text-sm ${
                      pathname === item.href ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}

            {/* Render grouped items */}
            {Object.entries(
              navItems.reduce((acc, item) => {
                if (item.subgroup && !acc.hasOwnProperty(item.subgroup)) {
                  (acc as Record<string, typeof navItems>)[item.subgroup] = [];
                }
                if (item.subgroup)
                  (acc as Record<string, typeof navItems>)[item.subgroup].push(
                    item
                  );
                return acc;
              }, {})
            ).map(([subgroup, items]) => (
              <div key={subgroup}>
                <h3 className="text-xs tracking-wide text-muted-foreground my-2 ml-4">
                  {subgroup}
                </h3>
                {(items as typeof navItems).map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? 'secondary' : 'ghost'}
                      className={`shadow-none my-1 w-full justify-start text-sm ${
                        pathname === item.href ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 w-full lg:w-[calc(100%-16rem)] min-h-[calc(100vh-78px)] p-10 px-4 pt-[86px] lg:pt-8 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
