import * as React from 'react';
import { api } from '@/utils/api';
import { useToast } from './use-toast';

function useNoteType() {
    const utils = api.useContext();
    const { toast } = useToast();
    // TODO: add optimistic update
    const { mutateAsync } = api.notes.toggleNoteType.useMutation({
        onMutate: async () => {
            console.log('Updating note type');
            await utils.notes.getAll.cancel();
        },
        onSuccess: async (data) => {
            if (data !== 'Unauthorized') {
                console.log('Note type successfully updated', data);
                const { name } = data.note;
                const updatedType = data.note[data.type];
                const description = !!updatedType
                    ? `Successfully set ${name} as ${data.type}!`
                    : `Successfully removed ${data.type} from ${name}!`;
                toast({
                    description,
                    variant: 'success',
                });
                await utils.notes.invalidate();
            }
        },
        onError: async (error) => {
            console.log('Form submission failed with error: ', error);
            toast({
                description: 'Failed to create note! ' + error.message,
                variant: 'destructive',
            });
        },
    });

    return { mutateNoteType: mutateAsync };
}

export default useNoteType;
