"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Carrossel = () => {
  const images = [
    "/Gant.jpg",
    "/hugo_boss_banner_1200x1200.jpg",
    "/tommyss25-23132-11-x.jpg",
  ];

  return (
    <div className="w-full mt-[100px] mb-[50px] flex justify-center items-center relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full max-w-[1171px] h-[441px] rounded-lg overflow-hidden shadow-lg"
      >
        <div className="swiper-button-prev absolute top-1/2 left-5 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center cursor-pointer z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white"></div>
        <div className="swiper-button-next absolute top-1/2 right-5 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center cursor-pointer z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white"></div>
        
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center bg-gray-100 w-full h-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover object-center" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrossel;