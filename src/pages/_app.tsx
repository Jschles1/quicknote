import * as React from 'react';
import { NextPage } from 'next';
import { type AppType, AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const nunito = Nunito({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
    const { data } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);
    const Page = getLayout(<Component {...pageProps} />);
    return (
        <SessionProvider session={session}>
            <>
                <style jsx global>{`
                    html {
                        font-family: ${nunito.style.fontFamily};
                    }
                `}</style>
            </>
            {Page}
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
