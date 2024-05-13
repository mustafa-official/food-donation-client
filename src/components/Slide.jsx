import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import bannerOne from "../assets/bannerfour.jpg";
import bannerTwo from "../assets/bannerone.jpg";
import bannerThree from "../assets/bannertwo.jpg";

const Slide = () => {
  return (
    <>
      <Swiper
      id="swiper-color"
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
        style={{ zIndex: 0 }}
      >
        <SwiperSlide>
          <img className="w-full h-auto" src={bannerTwo} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full bg-center h-auto" src={bannerOne} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-auto" src={bannerThree} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
