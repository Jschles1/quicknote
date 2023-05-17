import * as React from 'react';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import { useToast } from './use-toast';

function useCreateNote() {
    const router = useRouter();
    const utils = api.useContext();
    const { toast } = useToast();
    // TODO: add optimistic update
    const { mutateAsync, isLoading } = api.notes.createOne.useMutation({
        onMutate: async (data) => {
            // Cancel outgoing fetches (so they don't overwrite our optimistic update)
            await utils.notes.getAll.cancel();
            console.log('Submitting form with values: ', data);
        },
        onSuccess: async (data) => {
            await utils.notes.getAll.invalidate('notes');
            console.log('Form submitted successfully with values: ', data);
            await router.push('/');
            toast({
                description: 'Successfully created note!',
                variant: 'success',
            });
        },
        onError: (error) => {
            console.log('Form submission failed with error: ', error);
            toast({
                description: 'Failed to create note! ' + error.message,
                variant: 'destructive',
            });
        },
    });

    const mutateCreateNote = React.useCallback(
        (variables: { name: string; content: string; category: string; starred: boolean }) => {
            mutateAsync(variables);
        },
        [mutateAsync]
    );

    return { mutateCreateNote, isCreateNoteLoading: isLoading };
}

export default useCreateNote;
