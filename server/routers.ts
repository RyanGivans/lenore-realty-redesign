import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { properties, leads, testimonials, blogPosts } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  properties: router({
    getFeatured: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(properties).where(eq(properties.featured, true)).limit(6);
      } catch { return []; }
    }),
    getAll: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(properties).orderBy(desc(properties.createdAt));
      } catch { return []; }
    }),
    create: adminProcedure.input(z.object({
      title: z.string(),
      description: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      price: z.string().optional(),
      bedrooms: z.number().optional(),
      bathrooms: z.number().optional(),
      squareFeet: z.number().optional(),
      yearBuilt: z.number().optional(),
      propertyType: z.enum(["Single Family", "Condo", "Townhouse", "Multi-Family", "Land", "Commercial"]).optional(),
      status: z.enum(["Available", "Pending", "Sold"]).optional(),
      featured: z.boolean().optional(),
      imageUrl: z.string().optional(),
      mlsNumber: z.string().optional(),
    })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.insert(properties).values(input);
      return { success: true };
    }),
  }),

  leads: router({
    create: publicProcedure.input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      inquiryType: z.enum(["Buy", "Sell", "Investment", "General"]).default("General"),
      message: z.string().optional(),
    })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      await db.insert(leads).values({ ...input, status: "New" });
      return { success: true };
    }),
    getAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(leads).orderBy(desc(leads.createdAt));
      } catch { return []; }
    }),
    updateStatus: adminProcedure.input(z.object({
      id: z.number(),
      status: z.enum(["New", "Contacted", "Qualified", "Closed"]),
    })).mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(leads).set({ status: input.status }).where(eq(leads.id, input.id));
      return { success: true };
    }),
  }),

  testimonials: router({
    getFeatured: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(testimonials).where(eq(testimonials.featured, true)).limit(6);
      } catch { return []; }
    }),
    getAll: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
      } catch { return []; }
    }),
  }),

  blog: router({
    getPublished: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
      } catch { return []; }
    }),
  }),
});

export type AppRouter = typeof appRouter;
