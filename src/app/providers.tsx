'use client';

import { NuqsAdapter } from 'nuqs/adapters/next';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
