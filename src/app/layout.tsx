import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { cn } from 'tailwind-variants';

import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Project Management',
  description: 'A project management tool for efficient collaboration and organization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen font-sans text-sm antialiased',
          geistSans.variable,
          geistMono.variable,
        )}>
        <div className="relative flex h-screen flex-col">
          <div className="mx-auto w-full max-w-7xl grow px-4 py-16 lg:px-10">
            <div className="mb-5 border-content3 border-b pb-5">
              <h1 className="font-semibold text-2xl text-gray-900">Project Management</h1>
            </div>
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
