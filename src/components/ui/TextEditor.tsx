import * as React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Note } from '@prisma/client';

const QuillNoSSRWrapper = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        // eslint-disable-next-line react/display-name
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    }
);

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

interface Props {
    note?: Note | undefined;
    mode: 'edit' | 'create';
}

const TextEditor: React.FC<Props> = ({ note, mode }) => {
    const ref = React.useRef<any>(null);
    if (!note && mode === 'edit') return null;

    const placeholder = mode === 'create' ? 'Write something here...' : '';

    React.useEffect(() => {
        if (ref.current) {
            console.log('focusing');
            ref.current.focus();
        }
    }, [ref]);

    return (
        <>
            <QuillNoSSRWrapper
                ref={ref}
                modules={modules}
                formats={formats}
                defaultValue={note?.content || ''}
                placeholder={placeholder}
            />
        </>
    );
};

export default TextEditor;
