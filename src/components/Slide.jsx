import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import bannerTwo from "../assets/newbanner.jpg";
import bannerThree from "../assets/bannerthree.png";
import one from "../assets/bannertw.jpg"
import two from "../assets/bannerone.png"

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
        style={{ zIndex: 0}}
      >
        <SwiperSlide>
          <img className="object-cover h-[530px] w-full" src={one} />
        </SwiperSlide>
        <SwiperSlide>
        <img className="w-full object-cover h-[530px]" src={bannerThree} />
          
        </SwiperSlide>
        <SwiperSlide>
        <img className="w-full object-cover h-[530px]" src={bannerTwo} />
        </SwiperSlide>
        <SwiperSlide>
        <img className="w-full object-cover h-[530px]" src={two} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
