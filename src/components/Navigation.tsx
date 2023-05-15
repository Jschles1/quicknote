import * as React from 'react';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import UserDropdown from './UserDropdown';
import NavigationNotes from './NavigationNotes';
import NoteStatistics from './NoteStatistics';
import NavigationCreateNoteButton from './NavigationCreateNoteButton';
import NavigationRecentlyViewedNotes from './NavigationRecentlyViewedNotes';
import { Separator } from './ui/Separator';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/Dialog';
import { Note } from '@prisma/client';
import useMediaQuery from '@/lib/hooks/use-media-query';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

interface Props {
    notes: Note[];
    recentlyViewedNotes: Note[];
    isLoading: boolean;
}

const Navigation: React.FC<Props> = ({ notes, recentlyViewedNotes, isLoading }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    console.log({ isMobile });
    return (
        // add "fixed h-[60px] min-h-0" after done with styles
        <div className="flex w-full flex-col border border-r-0 border-b-slate-400 bg-slate-200 md:relative md:min-h-screen md:w-[260px] md:min-w-[260px] md:border-b-0 md:border-r-slate-400 lg:w-[300px] lg:min-w-[300px]">
            {!!notes && (
                <>
                    <div className="w-full md:flex md:items-center md:justify-between">
                        <div className="absolute left-4 top-[1.1rem] flex items-center justify-center md:hidden">
                            <Dialog open={isDialogOpen}>
                                <DialogTrigger
                                    onClick={() => setIsDialogOpen(true)}
                                    // disabled={disabled}
                                    className=""
                                >
                                    <Menu />
                                </DialogTrigger>
                                <DialogContent className="h-full rounded-none slide-in-from-left-1 slide-in-from-bottom-0">
                                    {/* <DialogHeader>
                                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your notes marked
                                            as trash from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button className="w-full" variant="destructive" onClick={handleEmptyTrash}>
                                            Empty Trash
                                        </Button>
                                        <Button className="mb-2 w-full md:mb-0" variant="subtle" onClick={closeDialog}>
                                            Cancel
                                        </Button>
                                    </DialogFooter> */}
                                    Content
                                    <DialogClose onClick={() => setIsDialogOpen(false)} />
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
