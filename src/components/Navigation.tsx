import * as React from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import NoteStatistics from './NoteStatistics';
import NavigationCreateNoteButton from './NavigationCreateNoteButton';
import NavigationRecentlyViewedNotes from './NavigationRecentlyViewedNotes';
import { Separator } from './ui/Separator';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/Dialog';
import { Note } from '@prisma/client';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

interface Props {
    notes: Note[];
    recentlyViewedNotes: Note[];
    isLoading: boolean;
}

const Navigation: React.FC<Props> = ({ notes, recentlyViewedNotes, isLoading }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const router = useRouter();

    const closeDialog = () => setIsDialogOpen(false);

    React.useEffect(() => {
        router.events.on('routeChangeComplete', closeDialog);
        return () => {
            router.events.off('routeChangeComplete', closeDialog);
        };
    }, [closeDialog, router]);

    return (
        // add "fixed h-[60px] min-h-0" after done with styles
        <div className="flex w-full flex-col border border-r-0 border-b-slate-400 bg-slate-200 md:relative md:min-h-screen md:w-[260px] md:min-w-[260px] md:border-b-0 md:border-r-slate-400 lg:w-[300px] lg:min-w-[300px]">
            {!!notes && (
                <>
                    <div className="w-full md:flex md:items-center md:justify-between">
                        <div className="absolute left-4 top-[1.1rem] flex items-center justify-center md:hidden">
                            <Dialog open={isDialogOpen}>
                                <DialogTrigger onClick={() => setIsDialogOpen(true)}>
                                    <Menu />
                                </DialogTrigger>
                                <DialogContent className="h-full !max-w-full rounded-none bg-slate-200 px-4 pb-0 data-[state=open]:!slide-in-from-left-1 data-[state=open]:!slide-in-from-bottom-0">
                                    <DialogClose onClick={() => setIsDialogOpen(false)} />
                                    <UserDropdown />
                                    <NoteStatistics notes={notes} isLoading={isLoading} />
                                    <NavigationRecentlyViewedNotes notes={recentlyViewedNotes} isLoading={isLoading} />
                                    <Separator />
                                    <NavigationNotes notes={notes} isLoading={isLoading} />
                                    <NavigationCreateNoteButton />
                                </DialogContent>
                            </Dialog>
                        </div>
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
