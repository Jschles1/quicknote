import * as React from 'react';
import { Star, Trash, Archive } from 'lucide-react';
import { Note } from '@prisma/client';
import useNoteType from '@/lib/hooks/use-note-type';
import { cn } from '@/lib/util';

interface Props {
    note: Note | undefined;
}

const NoteTypes: React.FC<Props> = ({ note }) => {
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

    return (
        <div className="flex items-center gap-2">
            <Star
                className={cn(
                    'cursor-pointer',
                    note.starred ? 'fill-amber-500 hover:fill-none' : 'fill-none hover:fill-amber-500'
                )}
                onClick={() => handleStarClick(note.id)}
            />
            <Archive
                className={cn(
                    'cursor-pointer',
                    note.archived ? 'fill-lime-500 hover:fill-none' : 'fill-none hover:fill-lime-500'
                )}
                onClick={() => handleArchiveClick(note.id)}
            />
            <Trash
                className={cn(
                    'cursor-pointer',
                    note.trash ? 'fill-red-500 hover:fill-none' : 'fill-none hover:fill-red-500'
                )}
                onClick={() => handleTrashClick(note.id)}
            />
        </div>
    );
};

export default NoteTypes;
