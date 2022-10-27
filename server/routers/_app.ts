import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
  chesskidCookie: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.username == "dionz") {
        return {
          PHPSESSID_COOKIE: process.env.CHESSKID_PHPSESSID_COOKIE,
        };
      } else return null;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
