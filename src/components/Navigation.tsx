import * as React from 'react';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import NoteStatistics from './NoteStatistics';
import NavigationCreateNoteButton from './NavigationCreateNoteButton';
import NavigationRecentlyViewedNotes from './NavigationRecentlyViewedNotes';
import { Separator } from './ui/Separator';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[];
    recentlyViewedNotes: Note[];
    isLoading: boolean;
}

const Navigation: React.FC<Props> = ({ notes, recentlyViewedNotes, isLoading }) => {
    return (
        <div className="relative flex min-h-screen w-[300px] min-w-[300px] flex-col border border-r-slate-400 bg-slate-200">
            {!!notes && (
                <>
                    <Logo />
                    <UserDropdown />
                    <NoteStatistics notes={notes} isLoading={isLoading} />
                    <NavigationRecentlyViewedNotes notes={recentlyViewedNotes} isLoading={isLoading} />
                    <Separator />
                    <NavigationNotes notes={notes} isLoading={isLoading} />
                    <NavigationCreateNoteButton />
                </>
            )}
        </div>
    );
};

export default Navigation;
