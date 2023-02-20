import * as React from 'react';
import Navigation from './Navigation';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <main className="min-w-screen relative flex min-h-screen">
            <Navigation />
            <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-4">
                {children}
            </div>
        </main>
    );
};

export default AppLayout;
