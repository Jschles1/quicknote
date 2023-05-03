import * as React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/util';
import { HIDDEN_MOBILE_CLASS } from '@/lib/constants';

interface Props {
    isDesktop?: boolean;
}

const NavigationCreateNoteButton: React.FC<Props> = ({ isDesktop }) => {
    const hiddenClass = isDesktop ? HIDDEN_MOBILE_CLASS : '';
    return (
        <div className={cn('bottom-0 z-10 w-full border-t border-slate-400 p-4 decoration-0', hiddenClass)}>
            <Link href="/create-note" className="flex w-full items-center rounded-md p-2 hover:bg-slate-300">
                <Plus size={20} className="mr-2" />
                <div>Create Note</div>
            </Link>
        </div>
    );
};

export default React.memo(NavigationCreateNoteButton);
