'use client';

import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export default function Maps() {
  return (
    <div className="relative w-full aspect-[21/7]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31606.983285898452!2d110.85478995000001!3d-8.01204005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bcc2cb3e74c61%3A0x5027a76e3569e00!2sBaleharjo%2C%20Eromoko%2C%20Wonogiri%20Regency%2C%20Central%20Java%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1739111438515!5m2!1sen!2sus"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-12">
        <div className="text-center space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold">Peta Lokasi</h2>
          <h3 className="text-xl font-semibold">Desa Baleharjo</h3>
          <p className="text-gray-200">
            Berikut adalah peta lokasi Desa Baleharjo, Kecamatan Eromoko,
            Kabupaten Wonogiri, Jawa Tengah.
          </p>
        </div>

        <Button asChild className="bg-orange-500 hover:bg-orange-600 mt-6">
          <a
            href="https://maps.google.com/maps?q=Baleharjo,+Eromoko,+Wonogiri,+Central+Java"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Buka di Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
}
