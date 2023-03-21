import * as React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { decodeHtml } from '@/lib/util';
import { Note } from '@prisma/client';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
        slidesToSlide: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 600 },
        items: 3,
        slidesToSlide: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

interface Props {
    data: {
        category: string;
        notes: Note[];
    };
}

const CategoryNotes: React.FC<Props> = ({ data }) => {
    if (!data.notes) return null;
    return (
        <div>
            <h1 className="mb-2 text-xl font-bold">{data.category}</h1>
            <Carousel ssr responsive={responsive} centerMode={false} itemClass={''}>
                {data.notes.map((note) => (
                    <Link
                        href={`/${note.id}`}
                        className="block h-[300px] rounded-md border border-slate-200 bg-white p-4  hover:border-slate-400"
                    >
                        <div>
                            <div className="mb-2 text-xl font-bold">{note.name}</div>
                        </div>

                        <div>{decodeHtml(note.content)}</div>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default CategoryNotes;
