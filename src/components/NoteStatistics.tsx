import * as React from 'react';
import Link from 'next/link';
import { Note } from '@prisma/client';
import { Star, Archive, Trash } from 'lucide-react';

const StatLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="mb-2 flex items-center gap-4 rounded-md p-2 font-bold hover:bg-slate-300">
        {children}
    </Link>
);

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
            <StatLink href="/?type=starred">
                <Star className="fill-amber-500" /> Starred <span className="font-normal"> {stats.starred}</span>
            </StatLink>
            <StatLink href="/?type=archived">
                <Archive className="fill-lime-500" /> Archived <span className="font-normal"> {stats.archived}</span>
            </StatLink>
            <StatLink href="/?type=trash">
                <Trash className="fill-red-500" /> Trash <span className="font-normal"> {stats.trashed}</span>
            </StatLink>
        </div>
    );
};

export default NoteStatistics;
