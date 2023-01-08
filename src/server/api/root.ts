import { linkRouter } from "./routers/link";
import { pageRouter } from "./routers/page";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  page: pageRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
