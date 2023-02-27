import * as React from 'react';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { FileText } from 'lucide-react';

interface Props {
    note: Note;
}

const NavigationCategoryNote: React.FC<Props> = ({ note }) => {
    return (
        <Link href={`/${note.id}`} key={note.id} className="mb-2 flex items-center gap-2 text-sm">
            <FileText size="1rem" color="gray" /> <span>{note.name}</span>
        </Link>
    );
};

export default NavigationCategoryNote;
