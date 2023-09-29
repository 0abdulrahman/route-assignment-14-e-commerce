import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import img_1 from "../../../assets/images/slider-image-1.jpeg";
import img_2 from "../../../assets/images/slider-image-2.jpeg";
import img_3 from "../../../assets/images/slider-image-3.jpeg";

function MainSlider() {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={img_1} alt="Slider 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img_2} alt="Slider 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img_3} alt="Slider 3" />
      </SwiperSlide>
    </Swiper>
  );
}

export default MainSlider;
