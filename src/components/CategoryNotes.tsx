import * as React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { decodeHtml } from '@/lib/util';
import { Note } from '@prisma/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
            <Slider {...settings}>
                {data.notes.map((note) => (
                    <Link
                        key={note.id}
                        href={`/${note.id}`}
                        className="block h-[300px] rounded-md border border-slate-200 bg-white p-4  hover:border-slate-400"
                    >
                        <div>
                            <div className="mb-2 text-xl font-bold">{note.name}</div>
                        </div>

                        <div>{decodeHtml(note.content)}</div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryNotes;
