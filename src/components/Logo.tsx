import * as React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => {
    return (
        <Link href="/" className="md:mx-auto md:block">
            <div className="mx-auto block w-1/2 py-4 text-center text-xl font-bold italic md:w-full">QuickNote</div>
        </Link>
    );
};

export default React.memo(Logo);
