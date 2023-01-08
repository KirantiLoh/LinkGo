import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
    createLink: protectedProcedure
        .input(z.object({
            name: z.string(),
            url: z.string().url()
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma, session } = ctx;
            const { name, url } = input;
            const page = await prisma.page.findUnique({
                where: {
                    userId: session.user.id
                }
            });
            if (!page) throw new Error("No page found");
            const link = await prisma.link.create({
                data: {
                    pageId: page.userId,
                    name: name,
                    url: url
                }
            })
            return link;
        }),
    toggleShow: protectedProcedure
        .input(z.object({
            id: z.string(),
            show: z.boolean()
        }))
        .mutation(async ({ctx, input}) => {
            const link = await ctx.prisma.link.findUnique({
                where: {
                    id: input.id
                }
            });
            if (link?.pageId !== ctx.session.user.id) throw new Error("Unauthorized");
            await ctx.prisma.link.update({
                where: {
                    id: link.id
                },
                data: {
                    show: input.show
                }
            });
            return;
        }),
    deleteLink: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ctx, input}) => {
            const link = await ctx.prisma.link.findUnique({
                where: {
                    id: input.id
                }
            });
            if (link?.pageId !== ctx.session.user.id) throw new Error("Unauthorized");
            await ctx.prisma.link.delete({
                where: {
                    id: link.id
                }
            });
            return;
        }),
    addClick: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ctx, input}) => {
            const link = await ctx.prisma.link.findUnique({
                where: {
                    id: input.id
                }
            });
            if (!link) throw new Error("No link found");
            await ctx.prisma.link.update({
                where: {
                    id: input.id
                },
                data: {
                    clicks: link.clicks + 1
                }
            });
            return;
        })
})