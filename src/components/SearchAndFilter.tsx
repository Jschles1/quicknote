import * as React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { Input } from './ui/Input';
import { Separator } from './ui/Separator';

interface Props {
    onSearchChange: (value: any) => void;
    onFilterChange: (value: any) => void;
    currentTab: string;
    currentFilter?: string;
}

const SearchAndFilter: React.FC<Props> = ({ onSearchChange, onFilterChange, currentTab, currentFilter = '' }) => {
    return (
        <>
            <Separator />
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
                <div>
                    {currentTab === 'category' ? (
                        <div className="max-[835px]:w-[320px] max-[460px]:w-auto md:w-[408px]"></div>
                    ) : (
                        <Input
                            className="max-[835px]:w-[320px] max-[460px]:w-auto md:w-[408px]"
                            placeholder="Search notes:"
                            onChange={onSearchChange}
                        />
                    )}
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="'active:scale-95 dark:data-[state=open]:bg-slate-300' text-md inline-flex w-full items-center justify-center rounded-md bg-slate-200 py-2 px-3 font-medium outline-none transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-300 hover:bg-slate-300">
                            <ArrowUpDown size="1rem" className="mr-2" /> {`Sort by: ${currentFilter}`}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem className="cursor-pointer" onClick={onFilterChange} data-value="newest">
                                Newest First
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={onFilterChange} data-value="oldest">
                                Oldest First
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={onFilterChange} data-value="">
                                Clear Filter
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
