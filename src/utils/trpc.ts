import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '~/server/src/routers/app';
import SuperJSON from 'superjson';

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:5001/test-quiks/us-central1'
  );
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
