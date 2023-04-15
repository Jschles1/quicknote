import * as React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { Skeleton } from './ui/Skeleton';
import Image from 'next/image';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';

const UserImage: React.FC<{ name: string; src: string }> = ({ name, src }) => (
    <Image src={src} width={25} height={25} alt={name} className="rounded-full" />
);

const UserDropdown: React.FC = () => {
    const [isOpened, setIsOpened] = React.useState(false);
    const session = useSession();
    if (!session) return null;

    const src = session?.data?.user?.image || '';
    const name = session?.data?.user?.name || '';
    const isLoading = !src && !name;

    const handleOpenChange = (isOpen: boolean) => {
        setIsOpened(isOpen);
    };

    return (
        <div className="p-4">
            <DropdownMenu onOpenChange={(isOpen) => handleOpenChange(isOpen)}>
                <DropdownMenuTrigger className="'active:scale-95 dark:data-[state=open]:bg-slate-300' text-md inline-flex w-full items-center justify-center rounded-md p-2 font-medium outline-none transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-300 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:hover:bg-slate-300">
                    <div className="flex w-full items-center justify-start">
                        <Skeleton height={25} width={25} isLoading={isLoading} className="relative h-full">
                            {src && <UserImage name={name} src={src} />}
                        </Skeleton>
                        <Skeleton height={25} width={25} isLoading={isLoading} className="mx-3 flex-1">
                            {name}
                        </Skeleton>
                        <div>{isOpened ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[268px]">
                    <DropdownMenuItem className="cursor-pointer" onClick={async () => await signOut()}>
                        <LogOut className="mr-4" />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserDropdown;
