import { Note } from '@prisma/client';
import { z } from 'zod';
import sanitize from '@/lib/sanitize';

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
        .input(z.object({ name: z.string(), category: z.string(), content: z.string(), starred: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            const sanitizedContent = sanitize(input.content);
            const userId = ctx.session.user.id;
            const result = await ctx.prisma.note.create({ data: { ...input, userId, content: sanitizedContent } });
            return result;
        }),
    updateOne: protectedProcedure
        .input(
            z.object({
                noteId: z.string(),
                name: z.string(),
                category: z.string(),
                content: z.string(),
                starred: z.boolean(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const result = (await ctx.prisma.note.findFirst({ where: { id: input.noteId, userId } })) as Note;
            if (result) {
                const sanitizedContent = sanitize(input.content);
                const updated = await ctx.prisma.note.update({
                    where: { id: result.id },
                    data: {
                        name: input.name,
                        category: input.category,
                        content: sanitizedContent,
                        starred: input.starred,
                    },
                });
                return updated;
            }
            return 'Unauthorized';
        }),
    toggleNoteType: protectedProcedure
        .input(z.object({ noteId: z.string(), type: z.enum(['starred', 'archived', 'trash']) }))
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const result = (await ctx.prisma.note.findFirst({ where: { id: input.noteId, userId } })) as Note;

            if (result) {
                const updated = await ctx.prisma.note.update({
                    where: { id: result.id },
                    data: { [input.type]: !result[input.type] },
                });
                return updated;
            }

            return 'Unauthorized';
        }),
    emptyTrash: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const result = await ctx.prisma.note.deleteMany({ where: { trash: true, userId } });
        if (result) {
            console.log(result);
            return result;
        }
        return 'Unauthorized';
    }),
});
