import * as React from 'react';
import Link from 'next/link';
import { decodeHtml } from '@/lib/util';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[];
}

const AllNotesList: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    return (
        <div className="flex flex-wrap">
            {notes.map((note) => (
                <Link
                    href={`/${note.id}`}
                    className="block h-[300px] rounded-md border border-slate-200 bg-white p-4  hover:border-slate-400"
                >
                    <div>
                        <div className="mb-2 text-xl font-bold">{note.name}</div>
                    </div>

                    <div>{decodeHtml(note.content)}</div>
                </Link>
            ))}
        </div>
    );
};

export default AllNotesList;
