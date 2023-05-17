import * as React from 'react';
import Link from 'next/link';
import NoteTypes from './NoteTypes';
import { cn, decodeHtml, formatDate } from '@/lib/util';
import { Note } from '@prisma/client';

interface Props {
    note: Note;
    isSwiperSlide?: boolean;
}

const NoteCard: React.FC<Props> = ({ note, isSwiperSlide }) => {
    return (
        <div
            className={cn(
                'mb-2 flex h-[300px] basis-[47%] flex-col gap-2 rounded-md border border-slate-200 bg-white p-4 hover:border-slate-400 max-[841px]:basis-auto md:m-2 lg:basis-[30%]',
                isSwiperSlide ? '' : 'max-w-[47%] max-[841px]:w-full max-[841px]:max-w-[100%] lg:max-w-[30%]'
            )}
        >
            <div>
                {!isSwiperSlide && (
                    <div className="mb-2 flex items-center justify-between text-lg italic lg:text-xl">
                        <Link
                            href={`/${note.id}`}
                            className="max-w-[600px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                            {note.category}
                        </Link>
                        <NoteTypes note={note} variant="card" />
                    </div>
                )}
                <Link
                    href={`/${note.id}`}
                    className={cn(
                        'mb-2 text-lg font-bold lg:text-xl',
                        isSwiperSlide ? 'flex items-center justify-between' : ''
                    )}
                >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">{note.name}</div>
                    {isSwiperSlide && <NoteTypes note={note} variant="card" />}
                </Link>
            </div>

            <Link href={`/${note.id}`} className="relative flex-1">
                <p className="max-h-full break-words text-sm text-gray-700 line-clamp-4 lg:text-base">
                    {decodeHtml(note.content)}
                </p>
            </Link>

            <p className="mb-2 text-xs italic text-gray-500">Last Updated: {formatDate(note.updatedAt)}</p>
        </div>
    );
};

export default React.memo(NoteCard);
