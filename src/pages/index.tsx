import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from '../utils/api';
import { NextPageWithLayout } from './_app';
import AppLayout from '../components/AppLayout';

// #fff
// #f9f9f9
// #f3f3f3

const Home: NextPageWithLayout = () => {
    // const hello = api.example.hello.useQuery({ text: 'from tRPC' });
    const { data } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

    console.log({ notes: data });

    return (
        <>
            <Head>
                <title>QuickNote - Home</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">Notes Index Page</h1>
            </div>
        </>
    );
};

export default Home;

Home.getLayout = function getLayout(page) {
    return <AppLayout>{page}</AppLayout>;
};