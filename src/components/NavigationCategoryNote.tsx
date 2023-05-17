import * as React from 'react';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { FileText, Star } from 'lucide-react';
import { cn } from '@/lib/util';

interface Props {
    note: Note;
    onStarClick: (noteId: string) => void;
}

const NavigationCategoryNote: React.FC<Props> = ({ note, onStarClick }) => {
    const isStarred = note.starred;
    return (
        <div className="relative mb-2 rounded-md p-2 last:mb-0 hover:bg-slate-300">
            <Link href={`/${note.id}`} key={note.id} className="flex items-center gap-2 text-sm">
                <FileText size="1rem" color="gray" />{' '}
                <span className="w-[225px] overflow-hidden text-ellipsis whitespace-nowrap md:w-[calc(100%-3rem)]">
                    {note.name}
                </span>{' '}
            </Link>
            <Star
                size="1rem"
                className={cn(
                    'absolute right-[14px] top-[10px] cursor-pointer',
                    isStarred ? 'fill-amber-500 hover:fill-none' : 'fill-none hover:fill-amber-500'
                )}
                strokeWidth={1}
                onClick={() => onStarClick(note.id)}
            />
        </div>
    );
};

export default React.memo(NavigationCategoryNote);
