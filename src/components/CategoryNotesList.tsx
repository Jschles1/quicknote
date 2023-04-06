import * as React from 'react';
import Link from 'next/link';
import NoteCard from './NoteCard';
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

const CategoryNotesList: React.FC<Props> = ({ data }) => {
    if (!data.notes) return null;
    return (
        <div>
            <h1 className="my-4 ml-4 text-xl font-bold italic">{data.category}</h1>
            <Swiper modules={[Navigation]} navigation={data.notes.length > 3} spaceBetween={20} slidesPerView={3}>
                {data.notes.map((note) => (
                    <SwiperSlide key={note.id}>
                        <NoteCard note={note} isSwiperSlide />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryNotesList;
