import * as React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { decodeHtml } from '@/lib/util';
import { Note } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';

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
            <h1 className="my-4 ml-4 text-xl font-bold italic">{data.category}</h1>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {data.notes.map((note) => (
                    <SwiperSlide key={note.id}>
                        {/* TODO: CategoryNote component? */}
                        <Link
                            href={`/${note.id}`}
                            className="block h-[300px] rounded-md border border-slate-200 bg-white p-4  hover:border-slate-400"
                        >
                            <div>
                                <div className="mb-2 text-xl font-bold">{note.name}</div>
                            </div>

                            <div>{decodeHtml(note.content)}</div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryNotes;
