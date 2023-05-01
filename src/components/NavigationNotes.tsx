import * as React from 'react';
import { Note } from '@prisma/client';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import { notesSortedByCategory } from '@/lib/util';
import useNoteType from '@/lib/hooks/use-note-type';
import { Skeleton } from './ui/Skeleton';

const NavigationNotesSkeleton = () => (
    <>
        {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} height={40} isLoading className="mb-4 h-[40px]" />
        ))}
    </>
);

interface Props {
    notes: Note[] | undefined;
    isLoading: boolean;
}

const NavigationNotes: React.FC<Props> = ({ notes, isLoading }) => {
    const { mutateNoteType } = useNoteType();

    if (!notes) return null;

    const sortedNotes = notesSortedByCategory(notes);

    const handleStarClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'starred' });
    };

    return (
        <div className="my-[0.5px] h-[calc(100%-73px)] overflow-y-scroll p-4 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300">
            <Accordion type="single" collapsible>
                {isLoading ? (
                    <NavigationNotesSkeleton />
                ) : (
                    sortedNotes.map((category, i) => (
                        <AccordionItem key={category.name} value={i.toString()} className="border-0">
                            <AccordionTrigger className="mb-4 rounded-md p-2 decoration-0 data-[state=open]:bg-slate-300 hover:bg-slate-300 hover:no-underline">
                                <span className="max-w-[186px] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm lg:max-w-[226px] lg:text-base">
                                    {category.name}
                                </span>
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
                    ))
                )}
            </Accordion>
        </div>
    );
};

export default NavigationNotes;
