import * as React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { Input } from './ui/Input';
import { Separator } from './ui/Separator';

interface Props {
    onSearchChange: (value: any) => void;
    onFilterChange: (value: any) => void;
}

const SearchAndFilter: React.FC<Props> = ({ onSearchChange, onFilterChange }) => {
    return (
        <>
            <Separator />
            <div className="container mx-auto flex items-center justify-between p-4">
                <div>
                    <Input className="w-[408px]" placeholder="Search notes:" onChange={onSearchChange} />
                </div>
                <div>
                    <DropdownMenu onOpenChange={() => {}}>
                        <DropdownMenuTrigger className="'active:scale-95 dark:data-[state=open]:bg-slate-300' text-md inline-flex w-full items-center justify-center rounded-md bg-slate-200 py-2 px-3 font-medium outline-none transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-300">
                            <ArrowUpDown size="1rem" className="mr-2" /> Sort
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem className="cursor-pointer" onClick={onFilterChange}>
                                Newest First
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={onFilterChange}>
                                Oldest First
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
        </>
    );
};

export default SearchAndFilter;
