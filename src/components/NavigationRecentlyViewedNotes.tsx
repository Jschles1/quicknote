import * as React from 'react';
import { Separator } from './ui/Separator';
import NavigationCategoryNote from './NavigationCategoryNote';
import { Note } from '@prisma/client';
import useNoteType from '@/lib/hooks/use-note-type';
import { Skeleton } from './ui/Skeleton';
import { cn } from '@/lib/util';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

const NavigationRecentlyViewedNotesSkeleton: React.FC<{ isDesktop?: boolean }> = ({ isDesktop }) => (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
                key={index}
                height={36}
                isLoading
                className={cn('mb-2 h-[36px]', isDesktop && HIDDEN_MOBILE_CLASS)}
            />
        ))}
    </>
);

interface Props {
    notes: Note[] | undefined;
    isLoading: boolean;
    isDesktop?: boolean;
}

const NavigationRecentlyViewedNotes: React.FC<Props> = ({ notes, isLoading, isDesktop }) => {
    const { mutateNoteType } = useNoteType();

    const handleStarClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'starred' });
    };

    const hasNotes = notes && notes.length > 0;
    const hiddenClass = isDesktop ? HIDDEN_MOBILE_CLASS : '';

    return (
        <>
            <Separator className={hiddenClass} />
            <div className={cn('md:p-4', hiddenClass)}>
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
                    <NavigationRecentlyViewedNotesSkeleton isDesktop={isDesktop} />
                ) : null}
            </div>
        </>
    );
};

export default NavigationRecentlyViewedNotes;
