import { api } from '@/utils/api';
import { useToast } from './use-toast';

function useUpdateNote() {
    const utils = api.useContext();
    const { toast } = useToast();
    // TODO: add optimistic update
    const { mutateAsync, isLoading } = api.notes.updateOne.useMutation({
        onMutate: async (data) => {
            // Cancel outgoing fetches (so they don't overwrite our optimistic update)
            await utils.notes.getAll.cancel();
            console.log('Submitting updated form with values: ', data);
        },
        onSuccess: async (data) => {
            await utils.notes.getAll.invalidate('notes');
            console.log('Updated form submitted successfully with values: ', data);
            toast({
                description: 'Successfully updated note!',
                variant: 'success',
            });
        },
        onError: (error) => {
            console.log('Form submission failed with error: ', error);
            toast({
                description: 'Failed to update note! ' + error.message,
                variant: 'destructive',
            });
        },
    });

    return { mutateUpdateNote: mutateAsync, isUpdateNoteLoading: isLoading };
}

export default useUpdateNote;
