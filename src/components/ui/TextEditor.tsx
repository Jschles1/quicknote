import * as React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import type { Note } from '@prisma/client';
import { Controller, type Control } from 'react-hook-form';
// import { Quill } from 'react-quill';
// import ImageUploader from 'quill-image-uploader';

// Quill.register('modules/imageUploader', ImageUploader);

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    // imageUploader: {
    //     upload: (file: any) => {
    //         return new Promise((resolve, reject) => {
    //             const formData = new FormData();
    //             formData.append('image', file);

    //             fetch('/api/upload', {
    //                 method: 'POST',
    //                 body: formData,
    //             })
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     console.log('result', result);
    //                     resolve(result.data.url);
    //                 })
    //                 .catch((error) => {
    //                     reject('Upload failed');
    //                     console.error('Error:', error);
    //                 });
    //         });
    //     },
    // },
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
    onEditorChange: (value: string) => void;
    error?: string | undefined;
    control?: Control<{
        name: string;
        content: string;
        category: string;
        starred: boolean;
    }>;
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const TextEditor: React.FC<Props> = ({ note, mode, height, onEditorChange, error = '', control }) => {
    const placeholder = mode === 'create' ? 'Write something here...' : '';

    const setHeight = (height: string, toolbar: Element) => {
        if (height) {
            toolbar.setAttribute('style', `height: ${height}; max-height: ${height};`);
        }
    };

    // Dynamically set height of editor
    React.useEffect(() => {
        const toolbar = document.querySelector('.quill');
        if (toolbar) {
            setHeight(height.toString(), toolbar);
        } else {
            // For first load
            const timer = setTimeout(() => {
                if (height) {
                    const toolbar = document.querySelector('.quill');
                    if (toolbar) {
                        setHeight(height.toString(), toolbar);
                    }
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [height]);

    // Add red border if error is present
    React.useEffect(() => {
        const container = document.querySelector('.ql-container');
        if (container) {
            const errorClass = 'ql-error';
            if (error) {
                container.classList.add(errorClass);
            } else if (container.classList.contains(errorClass)) {
                container.classList.remove(errorClass);
            }
        }
    }, [error]);

    if (!note && mode === 'edit') return null;

    return (
        <div data-height={height} className="editor">
            {control ? (
                <Controller
                    render={({ field: { onChange, value } }) => (
                        <QuillNoSSRWrapper
                            modules={modules}
                            formats={formats}
                            defaultValue={note?.content || ''}
                            placeholder={placeholder}
                            onChange={(content, _, source) => {
                                if (source === 'user') {
                                    onChange(content);
                                }
                            }}
                            value={value}
                        />
                    )}
                    name="content"
                    control={control}
                />
            ) : (
                <QuillNoSSRWrapper
                    modules={modules}
                    formats={formats}
                    defaultValue={note?.content || ''}
                    placeholder={placeholder}
                    onChange={(content, _, source) => {
                        if (source === 'user') {
                            onEditorChange(content);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default React.memo(TextEditor);
