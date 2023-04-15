import * as React from 'react';
import { Separator } from './ui/Separator';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Note } from '@prisma/client';
import useNoteType from '@/lib/hooks/use-note-type';
import { Skeleton } from './ui/Skeleton';

const NavigationRecentlyViewedNotesSkeleton = () => (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={36} isLoading className="mb-2 h-[36px]" />
        ))}
    </>
);

interface Props {
    notes: Note[] | undefined;
    isLoading: boolean;
}

const NavigationRecentlyViewedNotes: React.FC<Props> = ({ notes, isLoading }) => {
    const { mutateNoteType } = useNoteType();

    const handleStarClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'starred' });
    };

    const hasNotes = notes && notes.length > 0;

    return (
        <>
            <Separator />
            <div className="p-4">
                <div className="p-2 font-bold">Recently Viewed:</div>
                {hasNotes ? (
                    notes.map((note: Note) => (
                        <NavigationCategoryNote
                            key={note.id}
                            note={note}
                            onStarClick={() => handleStarClick(note.id)}
                        />
                    ))
                ) : isLoading ? (
                    <NavigationRecentlyViewedNotesSkeleton />
                ) : null}
            </div>
        </>
    );
};

export default NavigationRecentlyViewedNotes;
