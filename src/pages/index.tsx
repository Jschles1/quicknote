import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { NextPageWithLayout } from './_app';
import { GetServerSidePropsContext } from 'next';
import AppLayout from '../components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Note } from '@prisma/client';
import SearchAndFilter from '@/components/SearchAndFilter';
import CategoryNotesList from '@/components/CategoryNotesList';
import AllNotesList from '@/components/AllNotesList';
import EmptyTrashDialog from '@/components/EmptyTrashDialog';
import useEmptyTrash from '@/lib/hooks/use-empty-trash';

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

export function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
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
    const [filter, setFilter] = React.useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { mutateEmptyTrash } = useEmptyTrash();
    const memoDeps = [notes, search, filter];

    const filterNotes = React.useCallback(
        (notes: Note[], type: 'all' | 'starred' | 'archived' | 'trash', isCategory = false) => {
            const hasSearch = search.trim().length > 0;
            const hasFilter = filter.trim().length > 0;
            let filteredNotes = notes;

            const hasSearchTerm = (note: Note) =>
                hasSearch
                    ? (note.name.toLowerCase().includes(search.toLowerCase()) ||
                          note.category.toLowerCase().includes(search.toLowerCase())) &&
                      !isCategory
                    : true;

            switch (type) {
                case 'all':
                    filteredNotes = notes.filter((note) => {
                        return hasSearchTerm(note) && !note.archived && !note.trash;
                    });
                    break;
                case 'starred':
                    filteredNotes = notes.filter((note) => {
                        return hasSearchTerm(note) && note.starred && !note.archived && !note.trash;
                    });
                    break;
                case 'archived':
                    filteredNotes = notes.filter((note) => {
                        return hasSearchTerm(note) && note.archived;
                    });
                    break;
                case 'trash':
                    filteredNotes = notes.filter((note) => {
                        return hasSearchTerm(note) && note.trash;
                    });
                    break;
                default:
                    break;
            }

            if (hasFilter) {
                filteredNotes =
                    filter === 'newest'
                        ? filteredNotes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                        : filteredNotes.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
            }

            return filteredNotes;
        },
        memoDeps
    );

    const allNotes = React.useMemo(() => filterNotes(notes, 'all'), memoDeps);
    const categoryNotes = React.useMemo(() => sortNotesByCategory(filterNotes(notes, 'all', true)), memoDeps);
    const starredNotes = React.useMemo(() => filterNotes(notes, 'starred'), memoDeps);
    const archivedNotes = React.useMemo(() => filterNotes(notes, 'archived'), memoDeps);
    const trashNotes = React.useMemo(() => filterNotes(notes, 'trash'), memoDeps);

    const handleTabChange = (e: React.SyntheticEvent) => {
        setTabValue(e.currentTarget.getAttribute('data-value')!);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e: React.SyntheticEvent) => {
        setFilter(e.currentTarget.getAttribute('data-value')!);
    };

    const handleEmptyTrash = async () => {
        await mutateEmptyTrash();
        closeDialog();
        setTabValue('all');
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    React.useEffect(() => {
        if (router.query.type) {
            setTabValue(router.query.type.toString());
        }
    }, [router.isReady, router.query?.type]);

    if (!session) return null;

    return (
        <>
            <Head>
                <title>QuickNote - Home</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex w-full flex-1 flex-col">
                <div className="mx-auto flex h-[calc(2rem+40px)] w-full max-w-7xl items-center justify-between p-4 md:h-auto md:pb-0">
                    <h1 className="text-2xl font-extrabold text-black md:text-3xl">Notes</h1>
                    {tabValue === 'trash' && (
                        <div className="block md:hidden">
                            <EmptyTrashDialog
                                isDialogOpen={isDialogOpen}
                                closeDialog={closeDialog}
                                handleEmptyTrash={handleEmptyTrash}
                                disabled={trashNotes.length === 0}
                                setIsDialogOpen={setIsDialogOpen}
                            />
                        </div>
                    )}
                </div>
                <Tabs defaultValue={tabValue} value={tabValue} className="flex w-full flex-1 flex-col">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-2 pb-3 scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300 max-[542px]:overflow-x-scroll max-[542px]:bg-slate-100 md:overflow-x-auto md:bg-inherit md:p-4 md:pb-4">
                        <TabsList>
                            <TabsTrigger
                                onClick={handleTabChange}
                                data-value="all"
                                value="all"
                                className="text-xs md:text-sm"
                            >
                                All Notes
                            </TabsTrigger>
                            <TabsTrigger
                                onClick={handleTabChange}
                                data-value="category"
                                value="category"
                                className="text-xs md:text-sm"
                            >
                                By Category
                            </TabsTrigger>
                            <TabsTrigger
                                onClick={handleTabChange}
                                data-value="starred"
                                value="starred"
                                className="text-xs md:text-sm"
                            >
                                Starred
                            </TabsTrigger>
                            <TabsTrigger
                                onClick={handleTabChange}
                                data-value="archived"
                                value="archived"
                                className="text-xs md:text-sm"
                            >
                                Archived
                            </TabsTrigger>
                            <TabsTrigger
                                onClick={handleTabChange}
                                data-value="trash"
                                value="trash"
                                className="text-xs md:text-sm"
                            >
                                Trash
                            </TabsTrigger>
                        </TabsList>

                        {tabValue === 'trash' && (
                            <div className="hidden md:block">
                                <EmptyTrashDialog
                                    isDialogOpen={isDialogOpen}
                                    closeDialog={closeDialog}
                                    handleEmptyTrash={handleEmptyTrash}
                                    disabled={trashNotes.length === 0}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                            </div>
                        )}
                    </div>

                    <SearchAndFilter
                        onSearchChange={handleSearchChange}
                        onFilterChange={handleFilterChange}
                        currentTab={tabValue as string}
                        currentFilter={filter}
                    />

                    <div className="flex-1 bg-slate-100">
                        <div className="mx-auto w-full max-w-7xl p-4">
                            <TabsContent value="all" className="mt-0 border-0 p-0">
                                <AllNotesList notes={allNotes} />
                            </TabsContent>
                            <TabsContent value="category" className="mt-0 border-0 p-0">
                                {categoryNotes.map((notesByCategory) => (
                                    <CategoryNotesList key={notesByCategory.category} data={notesByCategory} />
                                ))}
                            </TabsContent>
                            <TabsContent value="starred" className="mt-0 border-0 p-0">
                                <AllNotesList notes={starredNotes} />
                            </TabsContent>
                            <TabsContent value="archived" className="mt-0 border-0 p-0">
                                <AllNotesList notes={archivedNotes} />
                            </TabsContent>
                            <TabsContent value="trash" className="mt-0 border-0 p-0">
                                <AllNotesList notes={trashNotes} />
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
