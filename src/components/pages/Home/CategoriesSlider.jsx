import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

function CategoriesSlider({ categories }) {
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
      <h2 className="fs-3 fw-normal border-bottom pb-2 mb-2">Shop popular categories</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        slidesPerView={slides}
      >
        {categories.map((category) =>
          category.name !== "Music" ? (
            <SwiperSlide key={category._id}>
              <div>
                <img src={category.image} alt={category.name} />
              </div>
              <h4>{category.name}</h4>
            </SwiperSlide>
          ) : (
            ""
          )
        )}
      </Swiper>
    </>
  );
}

export default CategoriesSlider;
