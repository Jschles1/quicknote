import * as React from 'react';
import { Note } from '@prisma/client';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import { notesSortedByCategory } from '@/lib/util';
import { api } from '@/utils/api';

interface Props {
    notes: Note[] | undefined;
}

const NavigationNotes: React.FC<Props> = ({ notes }) => {
    const utils = api.useContext();
    // TODO: add optimistic update
    const { mutateAsync } = api.notes.toggleNoteType.useMutation({
        onMutate: async (data) => {
            // Cancel outgoing fetches (so they don't overwrite our optimistic update)
            await utils.notes.getAll.cancel();
        },
        onSuccess: async (data) => {
            // await utils.invalidate();
            await utils.notes.invalidate();
        },
    });

    if (!notes) return null;

    const sortedNotes = notesSortedByCategory(notes);

    const handleStarClick = async (noteId: string) => {
        await mutateAsync({ noteId, type: 'starred' });
    };

    return (
        <div className="p-4">
            <Accordion type="single" collapsible>
                {sortedNotes.map((category, i) => (
                    <AccordionItem key={category.notes[i]?.name} value={i.toString()} className="border-0">
                        <AccordionTrigger className="mb-4 rounded-md p-2 decoration-0 hover:bg-slate-200 hover:no-underline data-[state=open]:bg-slate-200">
                            {category.name}
                        </AccordionTrigger>
                        <AccordionContent className="ml-4">
                            {category.notes.map((note) => (
                                <NavigationCategoryNote
                                    key={note.id}
                                    note={note}
                                    onStarClick={() => handleStarClick(note.id)}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default NavigationNotes;
