import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createContext } from "server/context";
import { appRouter } from "server/routers/_app";
import superjson from "superjson";

describe("appRouter queries", () => {
  describe("getChesskidCookie", () => {
    it("should return a cookie", async () => {
      const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: await createContext(),
        transformer: superjson,
      });

      const result = await ssg.getChesskidCookie.fetch({
        username: "dionz",
        password: "password",
      });

      expect(result).toEqual({
        PHPSESSID_COOKIE: process.env.CHESSKID_PHPSESSID_COOKIE,
      });
    });
  });

  describe("setChesskidCookie", () => {
    it("should create a cookie", async () => {
      const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: await createContext(),
        transformer: superjson,
      });

      const result = await ssg.get;

      expect(result).toEqual("true");
    });
  });
});
