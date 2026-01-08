'use client';

import { NuqsAdapter } from 'nuqs/adapters/next';

import QueryProvider from './query-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryProvider>{children}</QueryProvider>
    </NuqsAdapter>
  );
}
