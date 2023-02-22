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
            <Link href="/?type=starred" className="mb-4 flex items-center gap-4">
                <Star color="gold" fill="gold" /> Starred <span> {stats.starred}</span>
            </Link>
            <Link href="/?type=archived" className="mb-4 flex items-center gap-4">
                <Archive color="limegreen" fill="limegreen" /> Archived <span> {stats.archived}</span>
            </Link>
            <Link href="/?type=trash" className="mb-4 flex items-center gap-4">
                <Trash color="red" fill="red" /> Trash <span> {stats.trashed}</span>
            </Link>
        </div>
    );
};

export default NoteStatistics;
