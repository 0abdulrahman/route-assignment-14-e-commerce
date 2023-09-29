import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import electronice from "../../../assets/images/categories_images/electronics.webp";
import mobile from "../../../assets/images/categories_images/mobile.jpg";
import men from "../../../assets/images/categories_images/men.webp";
import women from "../../../assets/images/categories_images/women.webp";
import beauty from "../../../assets/images/categories_images/beauty.jpg";
import baby from "../../../assets/images/categories_images/child.png";
import { useEffect, useState } from "react";

function CategoriesSlider() {
  const [slides, setSlides] = useState(4);

  useEffect(() => {
    if (window.innerWidth > 992) {
      setSlides(4);
    } else if (window.innerWidth > 768 && window.innerWidth < 992) {
      setSlides(3);
    } else if (window.innerWidth < 768 && window.innerWidth > 425) {
      setSlides(2);
    } else {
      setSlides(1);
    }
  }, []);

  return (
    <>
      <h2 className="fs-3 fw-normal">Shop Popular Categories</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={slides}
      >
        <SwiperSlide>
          <div>
            <img src={electronice} alt="Slider 1" />
          </div>
          <h4>Electronics</h4>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={mobile} alt="Slider 2" />
          </div>
          <h4>Mobile</h4>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={men} alt="Slider 3" />
          </div>
          <h4>Men</h4>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={women} alt="Slider 3" />
          </div>
          <h4>Women</h4>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={beauty} alt="Slider 3" />
          </div>
          <h4>Beauty & Health</h4>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={baby} alt="Slider 3" />
          </div>
          <h4>Baby & Toys</h4>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default CategoriesSlider;
