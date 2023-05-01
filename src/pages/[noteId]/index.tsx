import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/AppLayout';
import TextEditor from '@/components/ui/TextEditor';
import { Separator } from '@/components/ui/Separator';
import type { Note } from '@prisma/client';
import NoteTypes from '@/components/NoteTypes';
import useUpdateNote from '@/lib/hooks/use-update-note';
import { Button } from '@/components/ui/Button';
import { cn, decodeHtml } from '@/lib/util';
import { Input } from '@/components/ui/Input';
import { formSchema, FormSchemaType } from '@/lib/formSchemas';

const NoteDetailPage: NextPageWithLayout<{ notes: Note[] }> = ({ notes }) => {
    const { mutateUpdateNote, isUpdateNoteLoading } = useUpdateNote();
    const router = useRouter();
    const [param, setParam] = React.useState('');
    const [note, setNote] = React.useState<Note | undefined>(undefined);
    const [eventListenersAdded, setEventListenersAdded] = React.useState(false);
    const [isEditingTitleOrCategory, setIsEditingTitleOrCategory] = React.useState(false);
    const {
        watch,
        setValue,
        clearErrors,
        register,
        formState: { errors, dirtyFields },
        control,
        handleSubmit,
    } = useForm<FormSchemaType>({
        defaultValues: {
            name: note?.name || '',
            content: note?.content || '',
            category: note?.category || '',
            starred: false,
        },
        resolver: zodResolver(formSchema),
    });

    const updatedContent = watch('content');
    const errorInputClass = 'border-red-500';
    const overflowClass = 'whitespace-nowrap overflow-hidden max-w-[900px] text-ellipsis';

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

    const handleChangeContent = (value: string) => {
        setValue('content', value);
    };

    const handleUpdateContent: SubmitHandler<FormSchemaType> = async (data): Promise<void> => {
        if (note && note.content !== updatedContent) {
            clearErrors('content');
            await mutateUpdateNote({
                noteId: note.id,
                content: updatedContent,
                name: note.name,
                category: note.category,
                starred: note.starred,
            });
            window.removeEventListener('beforeunload', handleBeforeUnload);
            router.events.off('routeChangeStart', handleBrowseAway);
            setEventListenersAdded(false);
        }
    };

    const handleSaveTitleAndCategoryChanges: SubmitHandler<FormSchemaType> = async (data): Promise<void> => {
        if (note) {
            clearErrors();
            if (note?.name !== data.name || note?.category !== data.category) {
                await mutateUpdateNote({
                    noteId: note?.id,
                    content: note?.content,
                    name: data.name,
                    category: data.category,
                    starred: note?.starred,
                });
            }
            setIsEditingTitleOrCategory(false);
        }
    };

    React.useEffect(() => {
        if (router.isReady) {
            setParam(router.query.noteId as string);
        }
    }, [router.isReady, router.pathname, router?.query?.noteId]);

    React.useEffect(() => {
        const redirect = async () => {
            await router.push('/404');
        };
        if (param && notes.length) {
            const note = notes.find((note) => note.id === param) || undefined;
            if (note) {
                setNote(note);
                setValue('content', note.content);
                setValue('name', note.name);
                setValue('category', note.category);
            } else {
                redirect().catch((err) => console.error(err));
            }
        }
    }, [param, notes]);

    React.useEffect(() => {
        // Add note to local storage for recent notes
        if (note) {
            const recentlyViewedNotes = localStorage.getItem('recentlyViewedNotes');
            if (recentlyViewedNotes) {
                const parsedRecentlyViewedNotes = JSON.parse(recentlyViewedNotes) as string[];
                const alreadyExists = parsedRecentlyViewedNotes.find((id: string) => id === param);
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
                    <div className="max-w-[85%] basis-1/2">
                        {isEditingTitleOrCategory ? (
                            <div>
                                <div className="py-2 font-bold">Note Title:</div>
                                <Input
                                    className={cn('h-12 py-2 px-3 text-2xl', errors.name && errorInputClass)}
                                    {...register('name', { required: true })}
                                    placeholder="Note Title"
                                    maxLength={100}
                                />
                                {errors.name && <div className="mt-2 text-sm text-red-500">{errors.name.message}</div>}
                                <div className="py-2 font-bold">Note Category:</div>
                                <Input
                                    className={cn('h-12 py-2 px-3 text-2xl', errors.category && errorInputClass)}
                                    {...register('category', { required: true })}
                                    placeholder="Note Category"
                                    maxLength={100}
                                />
                                {errors.category && (
                                    <div className="mt-2 text-sm text-red-500">{errors.category.message}</div>
                                )}
                            </div>
                        ) : (
                            <>
                                <p className={cn('text-lg italic text-gray-500', overflowClass)}>
                                    Category: {note?.category}
                                </p>
                                <h1 className={cn('mt-2 text-3xl font-extrabold', overflowClass)}>
                                    {note?.name || 'Loading...'}
                                </h1>
                            </>
                        )}
                    </div>

                    <div className="mr-3 flex items-center justify-between">
                        <NoteTypes note={note} variant="detail" />
                    </div>
                </div>

                <Separator className="my-3" />

                <div className="mb-3 flex items-center justify-between">
                    {isEditingTitleOrCategory ? (
                        <Button
                            className="mr-3"
                            onClick={handleSubmit(handleSaveTitleAndCategoryChanges)}
                            disabled={isUpdateNoteLoading}
                        >
                            Save Note Title / Content Changes
                        </Button>
                    ) : (
                        <Button className="mr-3" onClick={() => setIsEditingTitleOrCategory(true)}>
                            Edit Note Title / Content
                        </Button>
                    )}
                    <Button
                        disabled={note?.content === updatedContent || isUpdateNoteLoading}
                        onClick={handleSubmit(handleUpdateContent)}
                    >
                        Save Note Content Changes
                    </Button>
                </div>

                {errors?.content && <p className="mb-3 text-sm text-red-500">{errors?.content?.message}</p>}

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
