import * as React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Note } from '@prisma/client';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

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
    height: number | string;
}

const TextEditor: React.FC<Props> = ({ note, mode, height }) => {
    if (!note && mode === 'edit') return null;

    const placeholder = mode === 'create' ? 'Write something here...' : '';

    React.useEffect(() => {
        let timer = setTimeout(() => {
            if (height) {
                const toolbar = document.querySelector('.quill');
                if (toolbar) {
                    console.log('found');
                    toolbar.setAttribute('style', `height: ${height}; max-height: ${height};`);
                }
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [height]);

    return (
        <div data-height={height} className="editor">
            <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                defaultValue={note?.content || ''}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextEditor;
