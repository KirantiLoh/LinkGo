import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const pageRouter = createTRPCRouter({
    createPage: protectedProcedure
        .input(z.object({
            name: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma, session } = ctx;
            if (!session.user.name) return;
            await prisma.page.create({
                data: {
                    name: input.name,
                    title: session.user.name,
                    userId: session.user.id,
                    image: session.user.image
                }
            })
            return {message: "Page created!"};
        }),
    updatePage: protectedProcedure
        .input(z.object({
            title: z.string(),
            bio: z.string().nullish(),
            bgColor: z.string().startsWith("#"),
            textColor: z.string().startsWith("#"),
        }))
        .mutation(async ({ctx, input}) => {
            const { prisma, session } =  ctx;
            const { title, bio, bgColor, textColor } = input;
            const page = await prisma.page.update({
                where: {
                    userId: session.user.id
                },
                data: {
                     title,
                     bio,
                     bgColor,
                     textColor,
                }
            })
            if (!page) throw new Error("No Page found");
            return page;
        })
    ,
    getUserPage: protectedProcedure
        .query(async ({ctx}) => {
            const { prisma, session } = ctx;
            const page = await prisma.page.findUnique({
                where: {
                    userId: session.user.id
                },
                include: {
                    links: {
                        orderBy: {
                             createdAt: "desc"
                        }
                    },
                }
            });
            if (!page) throw new Error("No Page found");
            return page;
        }),
    getPageByName: protectedProcedure
        .input(z.object({
            name: z.string()
        }))
        .query(async ({ctx, input}) => {
            const { prisma } = ctx;
            const page = await prisma.page.findUnique({
                where: {
                    name: input.name
                },
                include: {
                    links: {
                        where: {
                            show: true
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    }
                }
            });
            console.log(page)
            if (!page) throw new Error("No Page found");
            return page;
        }),
    addVisitor: publicProcedure
        .input(z.object({
            name: z.string()
        }))
        .mutation(async ({ctx, input}) => {
            const page = await ctx.prisma.page.findUnique({
                where: {
                    name: input.name
                }
            });
            if (!page) throw new Error("No Page found");
            await ctx.prisma.page.update({
                where: {
                    name: input.name
                },
                data: {
                    visitor: page.visitor + 1
                }
            });
            return;
        }),
})