import Head from 'next/head';
import GoogleButton from 'react-google-button';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';

const SignIn: NextPage = () => {
    const handleSignIn = async () => {
        await signIn('google');
    };

    return (
        <>
            <Head>
                <title>QuickNotes - Sign In</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="flex flex-col items-center justify-center gap-12 rounded-md bg-slate-200 px-4 py-16 md:w-1/3">
                    <h1 className="text-xl font-bold italic">QuickNote</h1>
                    <GoogleButton onClick={handleSignIn} />
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (session) {
        console.log('Already logged in');
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default SignIn;
