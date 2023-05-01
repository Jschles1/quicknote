import * as React from 'react';
import NoteCard from './NoteCard';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[];
}

const AllNotesList: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    return (
        <div className="flex flex-wrap max-[841px]:flex-col">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
};

export default AllNotesList;
