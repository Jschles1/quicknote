import * as React from 'react';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[] | undefined;
}

const NavigationNotes: React.FC<Props> = ({ notes }) => {
    if (!notes) return null;
    return <div className="p-4">Notes</div>;
};

export default NavigationNotes;
