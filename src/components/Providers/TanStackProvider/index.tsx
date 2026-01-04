'use client';

import { useState, type ReactNode, type FC } from 'react';
import { RealtimeProvider } from '@upstash/realtime/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

const TanStackProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RealtimeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RealtimeProvider>
  );
};

export default TanStackProvider;
