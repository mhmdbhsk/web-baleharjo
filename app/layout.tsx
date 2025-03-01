import './globals.css';
import type { Metadata, Viewport } from 'next';
import { UserProvider } from '@/lib/auth';
import generalSans from './fonts';
import QueryProvider from '@/components/query-provider';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export const metadata: Metadata = {
  title: 'Baleharjo',
  description: 'Desa Baleharjo, Eromoko, Wonogiri',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${generalSans.className} antialiased`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <QueryProvider>
          <UserProvider userPromise={getCurrentUser()}>{children}</UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
