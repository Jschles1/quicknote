import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Trash } from 'lucide-react';
import { NextPageWithLayout } from './_app';
import { GetServerSidePropsContext } from 'next';
import AppLayout from '../components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Note } from '@prisma/client';
import { Separator } from '@/components/ui/Separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/Dialog';
import SearchAndFilter from '@/components/SearchAndFilter';
import CategoryNotes from '@/components/CategoryNotes';

import { Button } from '@/components/ui/Button';

type NotesByCategory = {
    category: string;
    notes: Note[];
};

const sortNotesByCategory = (notes: Note[]): NotesByCategory[] => {
    const notesByCategory: NotesByCategory[] = [];

    notes.forEach((note) => {
        const category = note.category;
        const existingCategory = notesByCategory.find((nbc) => nbc.category === category);

        if (existingCategory) {
            existingCategory.notes.push(note);
        } else {
            notesByCategory.push({
                category,
                notes: [note],
            });
        }
    });

    return notesByCategory;
};

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
    let defaultTab = 'all';
    if (query?.type) {
        defaultTab = query.type as string;
    }
    return { props: { defaultTab } };
}

interface Props {
    notes: Note[];
    defaultTab?: string;
}

const Home: NextPageWithLayout<Props> = ({ notes, defaultTab }) => {
    const session = useSession();
    const router = useRouter();
    const [tabValue, setTabValue] = React.useState(defaultTab);
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('');
    const [isDialogOpen, setisDialogOpen] = React.useState(false);
    if (!session) return null;

    const allNotes = sortNotesByCategory(notes.filter((n) => !n.archived && !n.trash));
    const starredNotes = sortNotesByCategory(notes.filter((n) => n.starred && !n.archived && !n.trash));
    const archivedNotes = sortNotesByCategory(notes.filter((n) => n.archived));
    const trashNotes = sortNotesByCategory(notes.filter((n) => n.trash));

    const handleTabChange = (e: React.SyntheticEvent) => {
        setTabValue(e.currentTarget.getAttribute('data-value')!);
    };

    const handleSearchChange = (value: any) => {
        console.log(value);
    };

    const handleFilterChange = (value: any) => {
        console.log(value);
    };

    const handleEmptyTrash = () => {
        closeDialog();
    };

    const closeDialog = () => {
        setisDialogOpen(false);
    };

    React.useEffect(() => {
        if (router.query.type) {
            setTabValue(router.query.type.toString());
        }
    }, [router.isReady, router.query?.type]);

    return (
        <>
            <Head>
                <title>QuickNote - Home</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex w-full flex-1 flex-col">
                <div className="mx-auto w-full max-w-7xl p-4 pb-0">
                    <h1 className="text-3xl font-extrabold text-black">Notes</h1>
                </div>
                <Tabs defaultValue={tabValue} value={tabValue} className="flex w-full flex-1 flex-col">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
                        <TabsList>
                            <TabsTrigger onClick={handleTabChange} data-value="all" value="all">
                                All Notes
                            </TabsTrigger>
                            <TabsTrigger onClick={handleTabChange} data-value="starred" value="starred">
                                Starred
                            </TabsTrigger>
                            <TabsTrigger onClick={handleTabChange} data-value="archived" value="archived">
                                Archived
                            </TabsTrigger>
                            <TabsTrigger onClick={handleTabChange} data-value="trash" value="trash">
                                Trash
                            </TabsTrigger>
                        </TabsList>

                        {tabValue === 'trash' && (
                            <div>
                                <Dialog open={isDialogOpen}>
                                    <DialogTrigger
                                        onClick={() => setisDialogOpen(true)}
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-red-600 dark:hover:text-slate-100 dark:focus:ring-slate-400"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Empty Trash
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your notes
                                                marked as trash from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button className="w-full" variant="destructive" onClick={handleEmptyTrash}>
                                                Empty Trash
                                            </Button>
                                            <Button className="w-full" variant="subtle" onClick={closeDialog}>
                                                Cancel
                                            </Button>
                                        </DialogFooter>
                                        <DialogClose onClick={closeDialog} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>

                    <SearchAndFilter onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

                    <div className="flex-1 bg-slate-100">
                        <div className="mx-auto h-full w-full max-w-7xl p-4">
                            <TabsContent value="all" className="mt-0 border-0 p-0">
                                {allNotes.map((notesByCategory) => (
                                    <CategoryNotes key={notesByCategory.category} data={notesByCategory} />
                                ))}
                            </TabsContent>
                            <TabsContent value="starred" className="mt-0 border-0 p-0">
                                {starredNotes.map((notesByCategory) => (
                                    <CategoryNotes key={notesByCategory.category} data={notesByCategory} />
                                ))}
                            </TabsContent>
                            <TabsContent value="archived" className="mt-0 border-0 p-0">
                                {archivedNotes.map((notesByCategory) => (
                                    <CategoryNotes key={notesByCategory.category} data={notesByCategory} />
                                ))}
                            </TabsContent>
                            <TabsContent value="trash" className="mt-0 border-0 p-0">
                                {trashNotes.map((notesByCategory) => (
                                    <CategoryNotes key={notesByCategory.category} data={notesByCategory} />
                                ))}
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </>
    );
};

export default Home;

Home.getLayout = function getLayout(page) {
    return <AppLayout>{page}</AppLayout>;
};
