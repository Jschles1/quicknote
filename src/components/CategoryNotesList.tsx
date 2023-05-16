import * as React from 'react';
import NoteCard from './NoteCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Note } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';
import useMediaQuery from '@/lib/hooks/use-media-query';

interface Props {
    data: {
        category: string;
        notes: Note[];
    };
}

const CategoryNotesList: React.FC<Props> = ({ data }) => {
    const singleSlideBreakpoint = useMediaQuery('(max-width: 841px)');
    if (!data.notes) return null;
    const slidesPerView = singleSlideBreakpoint ? 1 : 3;
    return (
        <div>
            <h1 className="my-4 ml-4 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold italic">
                {data.category}
            </h1>
            <Swiper
                modules={[Navigation]}
                navigation={data.notes.length > 3}
                spaceBetween={20}
                slidesPerView={slidesPerView}
            >
                {data.notes.map((note) => (
                    <SwiperSlide key={note.id}>
                        <NoteCard note={note} isSwiperSlide />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default React.memo(CategoryNotesList);
