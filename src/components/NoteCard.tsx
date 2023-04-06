import * as React from 'react';
import Link from 'next/link';
import NoteTypes from './NoteTypes';
import { cn, decodeHtml } from '@/lib/util';
import { Note } from '@prisma/client';

interface Props {
    note: Note;
    isSwiperSlide?: boolean;
}

const NoteCard: React.FC<Props> = ({ note, isSwiperSlide }) => {
    return (
        <Link
            href={`/${note.id}`}
            className={cn(
                'block h-[300px] rounded-md border border-slate-200 bg-white p-4  hover:border-slate-400',
                isSwiperSlide ? '' : 'm-2 basis-[30%] gap-2'
            )}
        >
            <div>
                {!isSwiperSlide && (
                    <div className="mb-2 flex items-center justify-between text-xl italic">
                        <div>{note.category}</div>
                        <NoteTypes note={note} />
                    </div>
                )}
                <div className={cn('mb-2 text-xl font-bold', isSwiperSlide ? 'flex items-center justify-between' : '')}>
                    <div>{note.name}</div>
                    {isSwiperSlide && <NoteTypes note={note} />}
                </div>
            </div>

            <div className="overflow-clip truncate text-gray-500">{decodeHtml(note.content)}</div>
        </Link>
    );
};

export default NoteCard;
