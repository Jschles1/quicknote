import { Note } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const notesRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.session.user.id;
        return ctx.prisma.note.findMany({ where: { userId } });
    }),
    getOne: protectedProcedure.input(z.object({ noteId: z.string() })).query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return ctx.prisma.note.findFirst({ where: { id: input.noteId, userId } });
    }),
    createOne: protectedProcedure
        .input(z.object({ name: z.string(), category: z.string(), content: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const result = await ctx.prisma.note.create({ data: { ...input, userId } });
            return result;
        }),
    updateOne: protectedProcedure
        .input(z.object({ noteId: z.string(), name: z.string(), category: z.string(), content: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const result = (await ctx.prisma.note.findFirst({ where: { id: input.noteId, userId } })) as Note;
            if (result) {
                const updated = await ctx.prisma.note.update({
                    where: { id: result.id },
                    data: { name: input.name, category: input.category, content: input.content },
                });
                return updated;
            }
            return 'Unauthorized';
        }),
    deleteOne: protectedProcedure.input(z.object({ noteId: z.string() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const result = (await ctx.prisma.note.findFirst({ where: { id: input.noteId, userId } })) as Note;
        if (result) {
            const deleted = await ctx.prisma.note.delete({ where: { id: result.id } });
            return deleted;
        }
        return 'Unauthorized';
    }),
});
