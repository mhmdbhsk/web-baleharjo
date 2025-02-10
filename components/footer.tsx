'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Profile, SocialMedia } from '@/db/schema';

interface FooterProps {
  profile?: Profile;
  socials?: SocialMedia[];
  navigationLinks: {
    name: string;
    href: string;
  }[];
  isLoading?: boolean;
}

export default function Footer({
  profile,
  socials,
  navigationLinks,
  isLoading,
}: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kelurahan Baleharjo</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </>
              ) : (
                <>
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 shrink-0" />
                    <span>{profile?.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{profile?.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>{profile?.email}</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Menu</h3>
            <nav className="flex flex-col space-y-2 text-sm text-gray-600">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Layanan</h3>
            <nav className="flex flex-col space-y-2 text-sm text-gray-600">
              <Link href="/layanan/surat" className="hover:text-gray-900">
                Pengajuan Surat
              </Link>
              <Link href="/layanan/pengaduan" className="hover:text-gray-900">
                Pengaduan
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            {/* Update social media rendering */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sosial Media</h3>
              <div className="flex space-x-4">
                {isLoading ? (
                  <div className="flex space-x-4">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                ) : (
                  <>
                    {socials?.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {social.platform === 'Facebook' && (
                          <Facebook className="h-5 w-5" />
                        )}
                        {social.platform === 'Instagram' && (
                          <Instagram className="h-5 w-5" />
                        )}
                        {social.platform === 'Youtube' && (
                          <Youtube className="h-5 w-5" />
                        )}
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Kelurahan Baleharjo. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
