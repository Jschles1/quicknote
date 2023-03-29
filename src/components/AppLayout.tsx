import * as React from 'react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import LoadingOverlay from './LoadingOverlay';
import { api } from '@/utils/api';
import { Note } from '@prisma/client';

interface AppLayoutProps {
    children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [recentlyViewedNotes, setRecentlyViewedNotes] = React.useState<Note[]>([]);
    const { data, isLoading } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

    React.useEffect(() => {
        const recentlyViewedNotesStorage = localStorage.getItem('recentlyViewedNotes');
        if (recentlyViewedNotesStorage && data) {
            const parsedRecentlyViewedNotes = JSON.parse(recentlyViewedNotesStorage) as string[];
            const notes = data.filter((note) => parsedRecentlyViewedNotes.includes(note.id));
            setRecentlyViewedNotes(notes);
        }
    }, [router.pathname, data]);

    const overlayPages = ['/create-note'];
    const showOverlay = isLoading && overlayPages.includes(router.pathname);

    return (
        <main className="min-w-screen relative flex min-h-screen">
            <Navigation notes={data || []} recentlyViewedNotes={recentlyViewedNotes} />
            <div className="relative mx-auto flex w-full flex-col items-center gap-12">
                {React.cloneElement(children, { notes: !!data ? data : [] })}
                {showOverlay && <LoadingOverlay />}
            </div>
        </main>
    );
};

export default AppLayout;
