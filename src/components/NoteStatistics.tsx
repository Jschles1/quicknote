import * as React from 'react';
import Link from 'next/link';
import { Note } from '@prisma/client';
import { Skeleton } from './ui/Skeleton';
import { Star, Archive, Trash } from 'lucide-react';
import { cn } from '@/lib/util';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

const StatLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="mb-2 flex items-center gap-4 rounded-md p-2 font-bold last:mb-0 hover:bg-slate-300">
        {children}
    </Link>
);

const NoteStatisticsSkeletons: React.FC<{ isDesktop?: boolean }> = ({ isDesktop }) => (
    // TODO: Need to figure out why skeleton only shows on height={25} and not on others
    <div className={cn('md:p-4', isDesktop && HIDDEN_MOBILE_CLASS)}>
        <Skeleton isLoading={true} height={40} className="mb-2 h-[40px]" />
        <Skeleton isLoading={true} height={40} className="mb-2 h-[40px]" />
        <Skeleton isLoading={true} height={40} className="mb-2 h-[40px]" />
    </div>
);

interface Props {
    notes: Note[] | undefined;
    isLoading: boolean;
    isDesktop?: boolean;
}

const NoteStatistics: React.FC<Props> = ({ notes, isLoading, isDesktop }) => {
    if (isLoading) return <NoteStatisticsSkeletons isDesktop={isDesktop} />;
    if (!notes) return null;
    const stats = {
        starred: 0,
        archived: 0,
        trashed: 0,
    };

    notes.forEach((note) => {
        if (note.starred) stats.starred++;
        if (note.archived) stats.archived++;
        if (note.trash) stats.trashed++;
    });

    const hiddenClass = isDesktop ? HIDDEN_MOBILE_CLASS : '';

    return (
        <div className={cn('md:p-4', hiddenClass)}>
            <StatLink href="/?type=starred">
                <Star className="fill-amber-500" strokeWidth={1} /> Starred{' '}
                <span className="font-normal"> {stats.starred}</span>
            </StatLink>
            <StatLink href="/?type=archived">
                <Archive className="fill-lime-500" strokeWidth={1} /> Archived{' '}
                <span className="font-normal"> {stats.archived}</span>
            </StatLink>
            <StatLink href="/?type=trash">
                <Trash className="fill-red-500" strokeWidth={1} /> Trash{' '}
                <span className="font-normal"> {stats.trashed}</span>
            </StatLink>
        </div>
    );
};

export default NoteStatistics;
