import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { NextPageWithLayout } from './_app';
import AppLayout from '../components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Note } from '@prisma/client';
import { Separator } from '@/components/ui/Separator';
import SearchAndFilter from '@/components/SearchAndFilter';

const Home: NextPageWithLayout<{ notes: Note[] }> = ({ notes }) => {
    const session = useSession();
    if (!session) return null;

    console.log(session);

    return (
        <>
            <Head>
                <title>QuickNote - Home</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex w-full flex-1 flex-col">
                <div className="p-4 pb-0">
                    <h1 className="text-3xl font-extrabold text-black">Notes</h1>
                </div>
                <Tabs defaultValue="all" className="flex w-full flex-1 flex-col">
                    <div className="flex items-center justify-between p-4">
                        <TabsList>
                            <TabsTrigger value="all">All Notes</TabsTrigger>
                            <TabsTrigger value="starred">Starred</TabsTrigger>
                            <TabsTrigger value="archived">Archived</TabsTrigger>
                            <TabsTrigger value="trash">Trash</TabsTrigger>
                        </TabsList>
                    </div>

                    <SearchAndFilter />

                    <div className="flex-1 bg-slate-100 p-4">
                        <TabsContent value="all" className="mt-0 border-0 p-0">
                            <p className="text-sm text-slate-500">All Notes</p>
                        </TabsContent>
                        <TabsContent value="starred" className="mt-0 border-0 p-0">
                            <p className="text-sm text-slate-500">Starred Notes</p>
                        </TabsContent>
                        <TabsContent value="archived" className="mt-0 border-0 p-0">
                            <p className="text-sm text-slate-500">Archived Notes</p>
                        </TabsContent>
                        <TabsContent value="trash" className="mt-0 border-0 p-0">
                            <p className="text-sm text-slate-500">Trash</p>
                        </TabsContent>
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
