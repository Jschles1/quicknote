import * as React from 'react';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import NoteStatistics from './NoteStatistics';
import NavigationCreateNoteButton from './NavigationCreateNoteButton';
import { Separator } from './ui/Separator';
import { Note } from '@prisma/client';

interface Props {
    notes: Note[];
}

const Navigation: React.FC<Props> = ({ notes }) => {
    return (
        <div className="relative min-h-screen w-[300px] min-w-[300px] border border-r-slate-300 bg-slate-100">
            {!!notes && (
                <>
                    <Logo />

                    <UserDropdown />

                    <NoteStatistics notes={notes} />

                    <Separator />

                    <NavigationNotes notes={notes} />

                    <NavigationCreateNoteButton />
                </>
            )}
        </div>
    );
};

export default Navigation;
