import * as React from 'react';
import Link from 'next/link';
import NoteCard from './NoteCard';
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
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
};

export default AllNotesList;
