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

    const handleStarClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'starred' });
    };

    const handleArchiveClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'archived' });
    };

    const handleTrashClick = async (noteId: string) => {
        await mutateNoteType({ noteId, type: 'trash' });
    };

    if (!note) return null;

    const variantClass = variant === 'card' ? 'gap-2' : 'gap-4 mr-3';

    return (
        <div className={cn('flex items-center gap-2', variantClass)}>
            <Star
                className={cn(
                    'cursor-pointer',
                    note.starred ? 'fill-amber-500 hover:fill-none' : 'fill-none hover:fill-amber-500'
                )}
                onClick={() => handleStarClick(note.id)}
                strokeWidth={1}
            />
            <Archive
                className={cn(
                    'cursor-pointer',
                    note.archived ? 'fill-lime-500 hover:fill-none' : 'fill-none hover:fill-lime-500'
                )}
                onClick={() => handleArchiveClick(note.id)}
                strokeWidth={1}
            />
            <Trash
                className={cn(
                    'cursor-pointer',
                    note.trash ? 'fill-red-500 hover:fill-none' : 'fill-none hover:fill-red-500'
                )}
                onClick={() => handleTrashClick(note.id)}
                strokeWidth={1}
            />
        </div>
    );
};

export default NoteTypes;
