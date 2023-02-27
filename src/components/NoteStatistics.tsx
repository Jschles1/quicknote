import * as React from 'react';
import Link from 'next/link';
import { Note } from '@prisma/client';
import { Star, Archive, Trash } from 'lucide-react';

interface Props {
    notes: Note[] | undefined;
}

const NoteStatistics: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    const stats = {
        starred: 0,
        archived: 0,
        trashed: 0,
    };

    notes.forEach((note) => {
        if (note.starred) stats.starred++;
        if (note.archived) stats.archived++;
        if (note.trash) stats.trashed++;
    });

    return (
        <div className="p-4">
            <Link href="/?type=starred" className="mb-4 flex items-center gap-4 font-bold">
                <Star color="gold" fill="gold" /> Starred <span className="font-normal"> {stats.starred}</span>
            </Link>
            <Link href="/?type=archived" className="mb-4 flex items-center gap-4 font-bold">
                <Archive color="limegreen" fill="limegreen" /> Archived{' '}
                <span className="font-normal"> {stats.archived}</span>
            </Link>
            <Link href="/?type=trash" className="mb-4 flex items-center gap-4 font-bold">
                <Trash color="red" fill="red" /> Trash <span className="font-normal"> {stats.trashed}</span>
            </Link>
        </div>
    );
};

export default NoteStatistics;
