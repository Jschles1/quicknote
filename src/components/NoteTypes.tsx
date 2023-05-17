import * as React from 'react';
import { Star, Trash, Archive } from 'lucide-react';
import { Note } from '@prisma/client';
import useNoteType from '@/lib/hooks/use-note-type';
import { cn } from '@/lib/util';

interface Props {
    note: Note | undefined;
    variant: 'card' | 'detail';
}

const NoteTypes: React.FC<Props> = ({ note, variant }) => {
    const { mutateNoteType } = useNoteType();

    const handleStarClick = React.useCallback(async () => {
        await mutateNoteType({ noteId: note!.id, type: 'starred' });
    }, [note?.id]);

    const handleArchiveClick = React.useCallback(async () => {
        await mutateNoteType({ noteId: note!.id, type: 'archived' });
    }, [note?.id]);

    const handleTrashClick = React.useCallback(async () => {
        await mutateNoteType({ noteId: note!.id, type: 'trash' });
    }, [note?.id]);

    const variantClass = variant === 'card' ? 'gap-2' : 'gap-4 mr-3';

    if (!note) return null;

    return (
        <div className={cn('flex items-center gap-2', variantClass)}>
            <Star
                className={cn(
                    'cursor-pointer',
                    note.starred ? 'fill-amber-500 hover:fill-none' : 'fill-none hover:fill-amber-500'
                )}
                onClick={handleStarClick}
                strokeWidth={1}
            />
            <Archive
                className={cn(
                    'cursor-pointer',
                    note.archived ? 'fill-lime-500 hover:fill-none' : 'fill-none hover:fill-lime-500'
                )}
                onClick={handleArchiveClick}
                strokeWidth={1}
            />
            <Trash
                className={cn(
                    'cursor-pointer',
                    note.trash ? 'fill-red-500 hover:fill-none' : 'fill-none hover:fill-red-500'
                )}
                onClick={handleTrashClick}
                strokeWidth={1}
            />
        </div>
    );
};

export default NoteTypes;
