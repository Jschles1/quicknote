import * as React from 'react';
import { api } from '@/utils/api';

function useNoteType() {
    const utils = api.useContext();
    // TODO: add optimistic update
    const { mutateAsync } = api.notes.toggleNoteType.useMutation({
        onMutate: async () => {
            console.log('Updating note type');
            await utils.notes.getAll.cancel();
        },
        onSuccess: async () => {
            console.log('Note type successfully updated');
            await utils.notes.invalidate();
        },
    });

    return { mutateNoteType: mutateAsync };
}

export default useNoteType;
