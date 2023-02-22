import * as React from 'react';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[] | undefined;
}

const NoteStatistics: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    return <div className="p-4">Notes Stats</div>;
};

export default NoteStatistics;
