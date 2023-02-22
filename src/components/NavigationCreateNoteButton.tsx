import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const NavigationCreateNoteButton: React.FC = () => {
    return (
        <Link
            href="/create-folder"
            className="absolute bottom-0 flex w-full items-center border-t border-slate-700 p-4 decoration-0"
        >
            <Plus size={20} className="mr-2" />
            <div>Create Note</div>
        </Link>
    );
};

export default NavigationCreateNoteButton;
