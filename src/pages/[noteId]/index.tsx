import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/AppLayout';
import TextEditor from '@/components/ui/TextEditor';
import { Separator } from '@/components/ui/Separator';
import { Note } from '@prisma/client';
import NoteTypes from '@/components/NoteTypes';
import useUpdateNote from '@/lib/hooks/use-update-note';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { decodeHtml } from '@/lib/util';

const NoteDetailPage: NextPageWithLayout<{ notes: Note[] }> = ({ notes }) => {
    const { mutateUpdateNote } = useUpdateNote();
    const router = useRouter();
    const [param, setParam] = React.useState('');
    const [note, setNote] = React.useState<Note | undefined>(undefined);
    const [eventListenersAdded, setEventListenersAdded] = React.useState(false);
    const {
        watch,
        setValue,
        setError,
        clearErrors,
        formState: { errors, dirtyFields },
        getValues,
        control,
    } = useForm({ defaultValues: { name: '', content: note?.content, category: '', starred: false } });
    const updatedContent = watch('content');

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = '';
    };

    const handleBrowseAway = () => {
        const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';
        if (window.confirm(warningText)) return;
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
    };

    const handleUpdateContent = async () => {
        if (note && note.content !== updatedContent) {
            const updatedContent = getValues().content as string;
            if (!decodeHtml(updatedContent)) {
                setError('content', {
                    type: 'manual',
                    message: 'Note content is required.',
                });
            } else {
                clearErrors('content');
                await mutateUpdateNote({
                    noteId: note.id,
                    content: updatedContent,
                    name: note.name,
                    category: note.category,
                    starred: note.starred,
                });
            }
        }
    };

    const handleChangeContent = (value: string) => {
        setValue('content', value);
    };

    React.useEffect(() => {
        if (router.isReady) {
            setParam(router.query.noteId as string);
        }
    }, [router.isReady, router.pathname, router?.query?.noteId]);

    React.useEffect(() => {
        if (param && notes.length) {
            const note = notes.find((note) => note.id === param) || undefined;
            if (note) {
                setNote(note);
                setValue('content', note.content);
            } else {
                router.push('/404');
            }
        }
    }, [param, notes]);

    React.useEffect(() => {
        // Add note to local storage for recent notes
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

    React.useEffect(() => {
        if (note?.content) {
            if (updatedContent !== note?.content) {
                if (!eventListenersAdded) {
                    console.log('Adding listeners');
                    window.addEventListener('beforeunload', handleBeforeUnload);
                    router.events.on('routeChangeStart', handleBrowseAway);
                    setEventListenersAdded(true);
                    return () => {
                        window.removeEventListener('beforeunload', handleBeforeUnload);
                        router.events.off('routeChangeStart', handleBrowseAway);
                    };
                }
            } else if (dirtyFields?.content) {
                console.log('Removing listeners');
                window.removeEventListener('beforeunload', handleBeforeUnload);
                router.events.off('routeChangeStart', handleBrowseAway);
                setEventListenersAdded(false);
            }
        }
    }, [updatedContent]);

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
                    <div className="flex items-center justify-between">
                        <NoteTypes note={note} />
                    </div>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center">
                    <Button
                        disabled={note?.content === updatedContent}
                        className="mb-3 mr-3"
                        onClick={handleUpdateContent}
                    >
                        Save Content Changes
                    </Button>
                    {errors?.content && <p className="mb-3 text-sm text-red-500">{errors?.content?.message}</p>}
                </div>

                <TextEditor
                    note={note}
                    mode="edit"
                    height="auto"
                    onEditorChange={handleChangeContent}
                    control={control}
                    error={errors?.content?.message}
                />
            </div>
        </>
    );
};

export default NoteDetailPage;

NoteDetailPage.getLayout = function getLayout(page) {
    return <AppLayout>{page}</AppLayout>;
};
