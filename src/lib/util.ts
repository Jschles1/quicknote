import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Note } from '@prisma/client';

export function notesSortedByCategory(notes: Note[]) {
    const notesByCategory: { name: string; notes: Note[] }[] = [];

    notes.forEach((note) => {
        const category = notesByCategory.find((category) => category.name === note.category);
        if (category) {
            category.notes.push(note);
        } else {
            notesByCategory.push({ name: note.category, notes: [note] });
        }
    });

    return notesByCategory;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
