import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/AppLayout';
import TextEditor from '@/components/ui/TextEditor';
import { Separator } from '@/components/ui/Separator';
import { Note } from '@prisma/client';
import NoteTypes from '@/components/NoteTypes';
import useUpdateNote from '@/lib/hooks/use-update-note';

const NoteDetailPage: NextPageWithLayout<{ notes: Note[] }> = ({ notes }) => {
    const { mutateUpdateNote } = useUpdateNote();
    const router = useRouter();
    const [param, setParam] = React.useState('');

    const note = notes.find((note) => note.id === param);

    React.useEffect(() => {
        if (router.isReady) {
            setParam(router.query.noteId as string);
        }
    }, [router.isReady]);

    React.useEffect(() => {
        if (note) {
            const recentlyViewedNotes = localStorage.getItem('recentlyViewedNotes');
            if (recentlyViewedNotes) {
                const parsedRecentlyViewedNotes = JSON.parse(recentlyViewedNotes);
                const alreadyExists = parsedRecentlyViewedNotes.find((note: Note) => note.id === param);
                if (!alreadyExists) {
                    if (parsedRecentlyViewedNotes.length >= 5) {
                        parsedRecentlyViewedNotes.pop();
                    }
                    parsedRecentlyViewedNotes.push(note.id);
                    localStorage.setItem('recentlyViewedNotes', JSON.stringify(parsedRecentlyViewedNotes));
                }
            } else {
                localStorage.setItem('recentlyViewedNotes', JSON.stringify([note.id]));
            }
        }
    }, [note]);

    const handleChange = async (value: string) => {
        if (note) {
            await mutateUpdateNote({
                noteId: note.id,
                content: value,
                name: note.name,
                category: note.category,
                starred: note.starred,
            });
        }
    };

    return (
        <>
            <Head>
                <title>QuickNote</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full max-w-7xl p-4">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-3xl font-extrabold">{note?.name || 'Loading...'}</h1>
                    <NoteTypes note={note} />
                </div>

                <Separator className="my-3" />
                <TextEditor note={note} mode="edit" height="auto" onChange={handleChange} />
            </div>
        </>
    );
};

export default NoteDetailPage;

NoteDetailPage.getLayout = function getLayout(page) {
    return <AppLayout>{page}</AppLayout>;
};
