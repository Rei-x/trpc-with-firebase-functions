import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { post } from '../models/question';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay it works!'),
  getQuestion: publicProcedure
    .output(
      z.object({
        questions: z.array(
          z.object({
            text: z.string(),
          }),
        ),
      }),
    )
    .query(async () => {
      const data = await post.get();
      return {
        questions: data.docs.map((doc) => ({
          text: doc.data().text,
        })),
      };
    }),
  createQuestion: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await post.add(input);
    }),
});

export type AppRouter = typeof appRouter;
