import { onRequest, Request } from 'firebase-functions/v2/https';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { appRouter } from './routers/app';

const getSafleUrl = (req: Request) => {
  let url = req.url;

  if (url.startsWith('/trpc')) {
    url = url.slice(5);
  }

  if (url.startsWith('/')) url = url.slice(1);

  if (url.includes('?')) url = url.split('?')[0] as string;

  console.log(url);
  return url;
};

export const trpc = onRequest(
  {
    cors: true,
    minInstances: 0,
    concurrency: 400,
  },
  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }

    const url = getSafleUrl(req);

    nodeHTTPRequestHandler({
      req,
      res,
      path: url,
      router: appRouter,
    });
  },
);
