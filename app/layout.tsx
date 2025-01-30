import './globals.css';
import type { Metadata, Viewport } from 'next';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/actions/users';
import generalSans from './fonts';

export const metadata: Metadata = {
  title: 'Baleharjo',
  description: 'Desa Baleharjo, Eromoko, Wonogiri',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${generalSans.className} antialiased`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
