import * as React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/Dialog';
import { Trash } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
    isDialogOpen: boolean;
    disabled: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeDialog: () => void;
    handleEmptyTrash: () => void;
}

const EmptyTrashDialog: React.FC<Props> = ({
    isDialogOpen,
    disabled,
    setIsDialogOpen,
    closeDialog,
    handleEmptyTrash,
}) => {
    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger
                onClick={() => setIsDialogOpen(true)}
                disabled={disabled}
                className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 py-2 px-4 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-red-600 active:scale-95 dark:focus:ring-slate-400 dark:hover:bg-red-600 dark:hover:text-slate-100"
            >
                <Trash className="mr-2 h-4 w-4" />
                Empty Trash
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your notes marked as trash from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-full" variant="destructive" onClick={handleEmptyTrash}>
                        Empty Trash
                    </Button>
                    <Button className="mb-2 w-full md:mb-0" variant="subtle" onClick={closeDialog}>
                        Cancel
                    </Button>
                </DialogFooter>
                <DialogClose onClick={closeDialog} />
            </DialogContent>
        </Dialog>
    );
};

export default EmptyTrashDialog;
