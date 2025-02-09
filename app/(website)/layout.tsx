'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/footer';
import { getSocialMedia } from '@/services/social-media.services';
import { getProfile } from '@/services/profile.services';
import Maps from '@/components/maps';

const navigationLinks = [
  {
    name: 'Beranda',
    href: '/',
  },
  {
    name: 'Profil',
    href: '/profil',
  },
  {
    name: 'Lembaga',
    href: '/lembaga',
  },
  {
    name: 'Berita',
    href: '/berita',
  },
  {
    name: 'Potensi',
    href: '/potensi',
  },
  {
    name: 'Aktivitas',
    href: '/aktivitas',
  },
  // {
  //   name: 'Kontak',
  //   href: '/kontak',
  // },
  // {
  //   name: 'Layanan',
  //   href: '/layanan',
  // },
  {
    name: 'Buku Tamu',
    href: '/buku-tamu',
  },
] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <header className="fixed inset-x-0 top-0 z-100 border-b border-gray-950/5 dark:border-white/10 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8 w-full justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer size-9">
                    <AvatarImage alt={user.name || ''} />
                    <AvatarFallback>
                      {user.email
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="flex flex-col gap-1"
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/dasbor" className="flex w-full items-center">
                      <span>Dasbor</span>
                    </Link>
                  </DropdownMenuItem>

                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="flex w-full">
                      <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                        Keluar
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 "
              >
                <Link href="/login">Masuk</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => getProfile(),
  });

  const { data: socials, isLoading: isLoadingSocials } = useQuery({
    queryKey: ['socials'],
    queryFn: async () => getSocialMedia(),
  });

  const isLoading = isLoadingProfile || isLoadingSocials;

  return (
    <section className="flex flex-col min-h-screen isolate">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <div className="bg-gray-50">
        <Maps />
        <Footer
          profile={profile?.data}
          socials={socials?.data}
          navigationLinks={[...navigationLinks]}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
