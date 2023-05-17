import * as React from 'react';
import { type NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const nunito = Nunito({
    weight: ['400', '700', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);
    const Page = getLayout(<Component {...pageProps} />);
    return (
        <SessionProvider session={session as Session}>
            <>
                <style jsx global>{`
                    body {
                        font-family: ${nunito.style.fontFamily};
                    }
                `}</style>
            </>
            {Page}
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
