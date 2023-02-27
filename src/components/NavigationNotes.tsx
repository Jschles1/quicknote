import * as React from 'react';
import { Note } from '@prisma/client';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import { notesSortedByCategory } from '@/lib/util';

interface Props {
    notes: Note[] | undefined;
}

const NavigationNotes: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    const sortedNotes = notesSortedByCategory(notes);
    return (
        <div className="p-4">
            <Accordion type="single" collapsible>
                {sortedNotes.map((category, i) => (
                    <AccordionItem key={category.notes[i]?.name} value={i.toString()} className="border-0">
                        <AccordionTrigger className="pt-0">{category.name}</AccordionTrigger>
                        <AccordionContent className="ml-4">
                            {category.notes.map((note) => (
                                <NavigationCategoryNote key={note.id} note={note} />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default NavigationNotes;
