import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

const Slide = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
        style={{ zIndex: 0 }}
      >
        <SwiperSlide>
          <img
            className="w-full rounded-md h-[600px]"
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full rounded-md h-[600px]"
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full rounded-md h-[600px]"
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full rounded-md h-[600px]"
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
