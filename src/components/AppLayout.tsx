import * as React from 'react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import LoadingOverlay from './LoadingOverlay';
import { Toaster } from '@/components/ui/Toaster';
import { api } from '@/utils/api';
import { Note } from '@prisma/client';
import useCreateNote from '@/lib/hooks/use-create-note';
import useUpdateNote from '@/lib/hooks/use-update-note';

interface AppLayoutProps {
    children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [recentlyViewedNotes, setRecentlyViewedNotes] = React.useState<Note[]>([]);
    const { data, isLoading: isGetAllLoading } = api.notes.getAll.useQuery('notes', {
        refetchOnWindowFocus: false,
        notifyOnChangeProps: ['data'],
        refetchOnMount: false,
    });

    const { isCreateNoteLoading } = useCreateNote();
    const { isUpdateNoteLoading } = useUpdateNote();

    React.useEffect(() => {
        const recentlyViewedNotesStorage = localStorage.getItem('recentlyViewedNotes');
        if (recentlyViewedNotesStorage && data) {
            const parsedRecentlyViewedNotes = JSON.parse(recentlyViewedNotesStorage) as string[];
            const notes = data.filter((note) => parsedRecentlyViewedNotes.includes(note.id));
            setRecentlyViewedNotes(notes);
        }
    }, [router.pathname, data]);

    const isLoading = isGetAllLoading || isCreateNoteLoading || isUpdateNoteLoading;

    if (isLoading && !data) return <LoadingOverlay />;

    return (
        <main className="min-w-screen relative flex max-h-screen min-h-screen flex-col md:flex-row">
            <Navigation notes={data || []} recentlyViewedNotes={recentlyViewedNotes} isLoading={isGetAllLoading} />
            <div className="relative mx-auto flex w-full flex-1 flex-col items-center gap-12 md:w-[calc(100%-260px)] md:overflow-y-scroll lg:w-[calc(100%-300px)]">
                {React.cloneElement(children, { notes: !!data ? data : [] })}
                {isLoading && <LoadingOverlay />}
            </div>
            <Toaster />
        </main>
    );
};

export default React.memo(AppLayout);
