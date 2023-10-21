import { useState } from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Box, Image } from "@chakra-ui/react";

const ObjectDetailSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperProps>();

  return (
    <Box maxW={"full"} w={"full"}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{
          borderRadius: "20px",
        }}
        onSlideChange={(slide) => {}}
      >
        <SwiperSlide
          style={{
            borderRadius: "20px",
          }}
        >
          <Image
            h={"96"}
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            rounded={"20px"}
            w="full"
            objectFit={"cover"}
          />
        </SwiperSlide>
      </Swiper>
      <Box mt={2}>
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
          }}
          spaceBetween={10}
          slidesPerView={"auto"}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          onSlideChange={() => {
            console.log("change");
          }}
        >
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
          <SwiperSlide
            style={{
              width: "auto",
            }}
          >
            <Image
              h={"60px"}
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              rounded={"2xl"}
              w={"100px"}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default ObjectDetailSlider;
