'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FileText, MessageCircle } from 'lucide-react';

const services = [
  {
    id: 'surat',
    name: 'Layanan Persuratan',
    description:
      'Pengurusan berbagai surat meliputi: Surat Keterangan Domisili, Surat Keterangan Tidak Mampu, Surat Pengantar KTP, Surat Keterangan Usaha, dan surat keterangan lainnya.',
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

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-orange-500">Layanan </span>
            Desa Baleharjo
          </h1>
          <p className="text-gray-600">
            Desa Baleharjo berkomitmen memberikan pelayanan terbaik untuk
            masyarakat melalui berbagai layanan yang mudah diakses dan
            transparan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="relative group hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  {service.icon}
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-lg">{service.description}</p>
                <Button asChild className="group">
                  <Link href={service.href}>
                    Ajukan Sekarang
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
