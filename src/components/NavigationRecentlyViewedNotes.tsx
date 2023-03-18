import * as React from 'react';
import { Separator } from './ui/Separator';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[] | undefined;
}

const NavigationRecentlyViewedNotes: React.FC<Props> = ({ notes }) => {
    if (!notes || !notes.length) return null;
    return (
        <>
            <Separator />
            <div className="p-4">
                <div className="p-2 font-bold">Recently Viewed:</div>
                {notes.map((note: any) => (
                    <NavigationCategoryNote key={note.id} note={note} onStarClick={() => {}} />
                ))}
            </div>
        </>
    );
};

export default NavigationRecentlyViewedNotes;
