import * as React from 'react';
import { Separator } from './ui/Separator';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Note } from '@prisma/client';
import useNoteType from '@/lib/hooks/use-note-type';

interface Props {
    notes: Note[] | undefined;
}

const NavigationRecentlyViewedNotes: React.FC<Props> = ({ notes }) => {
    const { mutateNoteType } = useNoteType();

    const handleStarClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'starred' });
    };

    if (!notes || !notes.length) return null;

    return (
        <>
            <Separator />
            <div className="p-4">
                <div className="p-2 font-bold">Recently Viewed:</div>
                {notes.map((note: Note) => (
                    <NavigationCategoryNote key={note.id} note={note} onStarClick={() => handleStarClick(note.id)} />
                ))}
            </div>
        </>
    );
};

export default NavigationRecentlyViewedNotes;
