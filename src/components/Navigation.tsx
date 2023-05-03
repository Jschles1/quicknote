import * as React from 'react';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import NoteStatistics from './NoteStatistics';
import NavigationCreateNoteButton from './NavigationCreateNoteButton';
import NavigationRecentlyViewedNotes from './NavigationRecentlyViewedNotes';
import { Separator } from './ui/Separator';
import { Note } from '@prisma/client';
import useMediaQuery from '@/lib/hooks/use-media-query';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

interface Props {
    notes: Note[];
    recentlyViewedNotes: Note[];
    isLoading: boolean;
}

const Navigation: React.FC<Props> = ({ notes, recentlyViewedNotes, isLoading }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    console.log({ isMobile });
    return (
        // add "fixed h-[60px] min-h-0" after done with styles
        <div className="flex w-full flex-col border border-r-0 border-b-slate-400 bg-slate-200 md:relative md:min-h-screen md:w-[260px] md:min-w-[260px] md:border-b-0 md:border-r-slate-400 lg:w-[300px] lg:min-w-[300px]">
            {!!notes && (
                <>
                    <div className="flex items-center justify-center">
                        <Logo />
                    </div>

                    <UserDropdown isDesktop />
                    <NoteStatistics notes={notes} isLoading={isLoading} isDesktop />
                    <NavigationRecentlyViewedNotes notes={recentlyViewedNotes} isLoading={isLoading} isDesktop />
                    <Separator className={HIDDEN_MOBILE_CLASS} />
                    <NavigationNotes notes={notes} isLoading={isLoading} isDesktop />
                    <NavigationCreateNoteButton isDesktop />
                </>
            )}
        </div>
    );
};

export default Navigation;
