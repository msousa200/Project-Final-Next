"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Styles from './carrossel.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carrossel = () => {
  const images = [
    "/rolex.jpg",
    "/Rolex.jpg",
    "/relogio1.jpg",
    "/Gant.jpg",
  ];

  return (
    <div className={Styles.carrosselContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiperButtonNext',
          prevEl: '.swiperButtonPrev',
        }}
        pagination={{
          clickable: true,
          el: '.swiperPagination',
          bulletClass: Styles.swiperPaginationBullet,
          bulletActiveClass: Styles.swiperPaginationBulletActive,
        }}
        loop={true}
        className={Styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={Styles.swiperSlide}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {}
      <div className={`swiperButtonPrev ${Styles.swiperButtonPrev}`}>‹</div>
      <div className={`swiperButtonNext ${Styles.swiperButtonNext}`}>›</div>

      {}
      <div className={`swiperPagination ${Styles.swiperPagination}`}></div>
    </div>
  );
};

export default Carrossel;