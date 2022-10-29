import { Cookies } from "next/dist/server/web/spec-extension/cookies";
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
  getChesskidCookie: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.username == "dionz") {
        console.log("returning dion's cookie from .env.local");
        return process.env.CHESSKID_PHPSESSID_COOKIE;
      } else return null;
    }),
  setChesskidCookie: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      console.log("🍪🍪🍪🍪 set cookie: ", input);
      return "true";
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
