'use client';

import BlurHashImage from '@/components/blurhash-image';
import { ArrowRight, Database, Mail, MapPin, Phone } from 'lucide-react';
import Maps from '@/components/maps';
import { FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProfile } from '@/services/profile.services';
import { getBlogPosts } from '@/services/blog.services';

const services = [
  {
    id: 'surat',
    name: 'Layanan Persuratan',
    description:
      'Pengurusan berbagai surat meliputi: Surat Keterangan Domisili, Surat Keterangan Tidak Mampu, Surat Pengantar KTP, dan lainnya.',
    icon: <FileText className="h-8 w-8 text-orange-500" />,
    href: '/layanan/surat',
  },
  {
    id: 'pengaduan',
    name: 'Layanan Pengaduan',
    description:
      'Sampaikan keluhan, saran, atau masukan untuk perbaikan layanan dan pembangunan Desa Baleharjo.',
    icon: <MessageCircle className="h-8 w-8 text-orange-500" />,
    href: '/layanan/pengaduan',
  },
];

// Remove 'use client' and add these imports
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', { page: 1, limit: 3 }],
    queryFn: () => getBlogPosts({ page: 1, limit: 3 }),
  });

  return (
    <main>
      <section className="py-4 sm:py-6 lg:py-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <BlurHashImage
            blurhash="LjHx]5%NM{t7?wW?Rjog?ckCRjoz"
            src="/hero.webp"
            width={1400}
            height={300}
            alt="Hero Image"
            rounded
          />
          <div className="max-w-2xl mx-auto lg:col-span-12 text-center absolute top-0 bottom-0 right-0 left-0 z-50 flex items-center">
            <span className="text-4xl font-bold text-white tracking-tight sm:text-6xl md:text-8xl">
              Selamat Datang di Desa
              <span className="text-orange-500"> Baleharjo</span>
            </span>
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-orange-500">Sejarah</span> Desa Baleharjo
            </h2>
            <p className="text-gray-600 text-xl">
              Desa Baleharjo memiliki banyak sejarah yang menarik untuk
              diketahui. Berikut adalah sejarah singkat Desa Baleharjo
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 flex w-max mx-auto"
          >
            <Link href="/profil">
              Baca Selengkapnya
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Potensi Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                <span className="text-orange-500">Potensi</span> Desa Baleharjo
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Desa Baleharjo memiliki beragam potensi yang menjadi kebanggaan
                masyarakat. Dari kekayaan budaya, hasil bumi unggulan, hingga
                destinasi wisata yang menarik, semua menjadi bagian dari
                pengembangan desa yang berkelanjutan.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/potensi">
                  Telusuri Potensi Desa
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <BlurHashImage
                src="/potensi.webp"
                alt="Potensi Desa Baleharjo"
                fill
                className="object-cover"
                blurhash="LRG8U9=|%#NG~BIU-oX80KNFxZ$*"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-orange-500">Layanan</span> Desa Baleharjo
            </h2>
            <p className="text-gray-600">
              Desa Baleharjo berkomitmen memberikan pelayanan terbaik untuk
              masyarakat melalui berbagai layanan yang mudah diakses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button asChild variant="outline">
                  <Link href={service.href}>
                    Selengkapnya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
