import type { Metadata } from 'next';
import { Fira_Sans } from 'next/font/google';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading';
import ErrorBoundary from '@/components/error/ErrorBoundary';

import './globals.css';
import '@xyflow/react/dist/style.css';
import { NavBar } from '@/components/navBar';

const fira_sans = Fira_Sans({
  subsets: ['cyrillic'],
  weight: ['400'],
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Star Wars heroes',
  description: 'Full list of Star Wars movie heroes with description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fira_sans.className}>
        <ErrorBoundary>
          <NavBar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
