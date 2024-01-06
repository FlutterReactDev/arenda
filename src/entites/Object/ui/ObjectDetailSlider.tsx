import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Box, Image } from "@chakra-ui/react";
import { Swiper as SwiperType } from "swiper/types";
import { Item } from "../model/types/photo";
interface ObjectDetailSliderProps {
  images: Item[];
}
const ObjectDetailSlider: FC<ObjectDetailSliderProps> = (props) => {
  const { images } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

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
      >
        {images.map(({ id, url }) => (
          <SwiperSlide
            key={id}
            style={{
              borderRadius: "20px",
            }}
          >
            <Image
              h={"lg"}
              src={url}
              rounded={"20px"}
              w="full"
              objectFit={"cover"}
            />
          </SwiperSlide>
        ))}
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
          {images.map(({ id, url }) => (
            <SwiperSlide
              key={id}
              style={{
                width: "auto",
              }}
            >
              <Image
                h={"60px"}
                src={url}
                objectFit={"cover"}
                rounded={"2xl"}
                w={"100px"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ObjectDetailSlider;
