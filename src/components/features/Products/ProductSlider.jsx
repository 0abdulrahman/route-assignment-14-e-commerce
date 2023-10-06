// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Products.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ProductSlider({ images, title }) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className={styles.productSlider}
    >
      {images.map((image, i) => (
        <SwiperSlide key={i} className="d-flex justify-content-center align-items-center">
          <img src={image} alt={title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
