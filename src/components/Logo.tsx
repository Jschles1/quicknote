import * as React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <div className="block py-4 text-center text-xl font-bold italic">QuickNote</div>
        </Link>
    );
};

export default React.memo(Logo);
