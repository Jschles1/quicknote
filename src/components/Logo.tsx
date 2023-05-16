import * as React from 'react';
import Link from 'next/link';
import { ReactFCWithWDYR } from '@/lib/interfaces';

const Logo: ReactFCWithWDYR = () => {
    return (
        <Link href="/" className="md:mx-auto md:block">
            <div className="mx-auto block w-1/2 py-4 text-center text-xl font-bold italic md:w-full">QuickNote</div>
        </Link>
    );
};

Logo.whyDidYouRender = true;

export default React.memo(Logo);
