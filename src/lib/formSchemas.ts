import { z } from 'zod';
import { decodeHtml } from './util';

export const formSchema = z
    .object({
        name: z.string().trim().min(1, 'Name is required.').max(100),
        category: z.string().trim().min(1, 'Name is required.').max(100),
        content: z.string().trim().min(1, 'Content is required.'),
        starred: z.boolean(),
    })
    .refine((data) => !!decodeHtml(data.content).trim(), {
        path: ['content'],
        message: 'Content is required.',
    });

export type FormSchemaType = z.infer<typeof formSchema>;
