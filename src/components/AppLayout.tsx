import * as React from 'react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import LoadingOverlay from './LoadingOverlay';
import { Toaster } from '@/components/ui/Toaster';
import { api } from '@/utils/api';
import { Note } from '@prisma/client';
import useCreateNote from '@/lib/hooks/use-create-note';
import useUpdateNote from '@/lib/hooks/use-update-note';
import useMediaQuery from '@/lib/hooks/use-media-query';
import NotSupported from './NotSupported';

interface AppLayoutProps {
    children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [recentlyViewedNotes, setRecentlyViewedNotes] = React.useState<Note[]>([]);
    const { data, isLoading: isGetAllLoading } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
    const { isCreateNoteLoading } = useCreateNote();
    const { isUpdateNoteLoading } = useUpdateNote();
    const matches = useMediaQuery('(max-width: 1023px)');

    React.useEffect(() => {
        const recentlyViewedNotesStorage = localStorage.getItem('recentlyViewedNotes');
        if (recentlyViewedNotesStorage && data) {
            const parsedRecentlyViewedNotes = JSON.parse(recentlyViewedNotesStorage) as string[];
            const notes = data.filter((note) => parsedRecentlyViewedNotes.includes(note.id));
            setRecentlyViewedNotes(notes);
        }
    }, [router.pathname, data]);

    const isLoading = isGetAllLoading || isCreateNoteLoading || isUpdateNoteLoading;

    if (matches) {
        return <NotSupported />;
    }

    return (
        <main className="min-w-screen relative flex max-h-screen min-h-screen">
            <Navigation notes={data || []} recentlyViewedNotes={recentlyViewedNotes} isLoading={isGetAllLoading} />
            <div className="relative mx-auto flex w-[calc(100%-300px)] flex-col items-center gap-12 overflow-y-scroll">
                {React.cloneElement(children, { notes: !!data ? data : [] })}
                {isLoading && <LoadingOverlay />}
            </div>
            <Toaster />
        </main>
    );
};

export default AppLayout;
