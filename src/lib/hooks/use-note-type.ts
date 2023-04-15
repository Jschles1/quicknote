import { api } from '@/utils/api';
import { useToast } from './use-toast';
import { Note } from '@prisma/client';

function useNoteType() {
    const utils = api.useContext();
    const { toast } = useToast();
    // TODO: add optimistic update
    const { mutateAsync } = api.notes.toggleNoteType.useMutation({
        onMutate: async (updated) => {
            console.log('Updating note type', updated);
            await utils.notes.getAll.cancel();

            // Get the data from the queryCache
            const prevData = utils.notes.getAll.getData() as Note[];

            // Optimistically update the data with our new post
            utils.notes.getAll.setData(undefined, (notes) =>
                notes?.map((note) => {
                    if (note.id === updated.noteId) {
                        return {
                            ...note,
                            starred: updated.type === 'starred' ? !note.starred : note.starred,
                            archived: updated.type === 'archived' ? !note.archived : note.archived,
                            trash: updated.type === 'trash' ? !note.trash : note.trash,
                        };
                    }
                    return note;
                })
            );

            // Return the previous data so we can revert if something goes wrong
            return { prevData: prevData };
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
        onError: (error, _, ctx) => {
            // If the mutation fails, use the context-value from onMutate
            if (ctx) {
                utils.notes.getAll.setData(undefined, ctx.prevData);
            }
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
