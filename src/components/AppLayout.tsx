import * as React from 'react';
import Navigation from './Navigation';
import { api } from '@/utils/api';

interface AppLayoutProps {
    children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { data } = api.notes.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

    return (
        <main className="min-w-screen relative flex min-h-screen">
            <Navigation notes={data || []} />
            <div className="container mx-auto flex max-w-7xl flex-col items-center gap-12 p-4">
                {React.cloneElement(children, { notes: !!data ? data : [] })}
            </div>
        </main>
    );
};

export default AppLayout;
