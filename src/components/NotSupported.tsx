import * as React from 'react';

const NotSupported = () => (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="flex w-1/3 flex-col items-center justify-center gap-12 rounded-md bg-[#f9f9f9] px-4 py-16">
            <div className="text-center">
                <p>QuickNote is currently not supported on mobile devices.</p>
                <br />
                <p>Please revisit QuickNote on a desktop or tablet device.</p>
            </div>
        </div>
    </main>
);

export default NotSupported;
