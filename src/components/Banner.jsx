import React from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';

const Banner = () => {
    return (
<div>
<Swiper
 rewind={true}
 navigation={true}
 modules={[Navigation]}
 className="mySwiper"
>
 <SwiperSlide>
     <SlideOne></SlideOne>
 </SwiperSlide>
 <SwiperSlide>
     <SlideTwo></SlideTwo>
 </SwiperSlide>
 <SwiperSlide>
     <SlideThree></SlideThree>
 </SwiperSlide>
</Swiper>
</div>
    );
};

export default Banner;