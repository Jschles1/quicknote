import { api } from '@/utils/api';
import { useToast } from './use-toast';

function useEmptyTrash() {
    const utils = api.useContext();
    const { toast } = useToast();
    // TODO: add optimistic update
    const { mutateAsync, isLoading } = api.notes.emptyTrash.useMutation({
        onMutate: async () => {
            // Cancel outgoing fetches (so they don't overwrite our optimistic update)
            await utils.notes.getAll.cancel();
            console.log('Emptying Trash');
        },
        onSuccess: async () => {
            await utils.notes.getAll.invalidate('notes');
            console.log('Emptied Trash');
            toast({
                description: 'Successfully emptied trash!',
                variant: 'success',
            });
        },
        onError: (error) => {
            console.log('Form submission failed with error: ', error);
            toast({
                description: 'Failed to empty trash! ' + error.message,
                variant: 'destructive',
            });
        },
    });

    return { mutateEmptyTrash: mutateAsync, isEmptyTrashLoading: isLoading };
}

export default useEmptyTrash;
