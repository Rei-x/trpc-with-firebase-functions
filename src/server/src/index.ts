import { TrpcFramework } from '@h4ad/serverless-adapter/lib/frameworks/trpc';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { CorsFramework } from '@h4ad/serverless-adapter/lib/frameworks/cors';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { appRouter } from './routers/app';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy';
import { HttpFirebaseHandler } from '@h4ad/serverless-adapter/lib/handlers/firebase';
import { DummyAdapter } from '@h4ad/serverless-adapter/lib/adapters/dummy';

const framework = new TrpcFramework();
const corsFramework = new CorsFramework(framework);
const jsonFramework = new JsonBodyParserFramework(corsFramework);

export const trpc = ServerlessAdapter.new(appRouter)
  .setHandler(new HttpFirebaseHandler())
  .setResolver(new DummyResolver())
  .setFramework(jsonFramework)
  .addAdapter(new DummyAdapter())
  .build();
