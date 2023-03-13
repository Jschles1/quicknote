import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const NavigationCreateNoteButton: React.FC = () => {
    return (
        <div className="absolute bottom-0 w-full border-t border-slate-700 p-4 decoration-0">
            <Link href="/create-folder" className="flex w-full items-center rounded-md p-2 hover:bg-slate-200">
                <Plus size={20} className="mr-2" />
                <div>Create Note</div>
            </Link>
        </div>
    );
};

export default NavigationCreateNoteButton;
