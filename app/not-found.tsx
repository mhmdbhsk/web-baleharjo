import Link from 'next/link';
import { CircleIcon } from 'lucide-react';
import Logo from '@/components/logo';
import UnderlineLink from '@/components/underlined-link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-base text-gray-500">
          Halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau
          sementara tidak tersedia.
        </p>

        <UnderlineLink href="/">Kembali ke Beranda</UnderlineLink>
      </div>
    </div>
  );
}
