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
        <div
            className={cn(
                'flex h-[300px] flex-col rounded-md border border-slate-200  bg-white p-4 hover:border-slate-400',
                isSwiperSlide ? '' : 'm-2 basis-[30%] gap-2'
            )}
        >
            <div>
                {!isSwiperSlide && (
                    <div className="mb-2 flex items-center justify-between text-xl italic">
                        <Link href={`/${note.id}`} className="flex-1">
                            {note.category}
                        </Link>
                        <NoteTypes note={note} />
                    </div>
                )}
                <Link
                    href={`/${note.id}`}
                    className={cn('mb-2 text-xl font-bold', isSwiperSlide ? 'flex items-center justify-between' : '')}
                >
                    <div>{note.name}</div>
                    {isSwiperSlide && <NoteTypes note={note} />}
                </Link>
            </div>

            <Link href={`/${note.id}`} className="flex-1">
                <div className="overflow-clip truncate text-gray-500">{decodeHtml(note.content)}</div>
            </Link>
        </div>
    );
};

export default NoteCard;
