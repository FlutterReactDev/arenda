import { Image } from "@chakra-ui/react";
import { FC } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Photo } from "../model/types/photos";

interface ObjectSliderProps {
  images: Photo[];
}
const ObjectSlider: FC<ObjectSliderProps> = (props) => {
  const { images } = props;
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[EffectCards, Pagination, Navigation]}
      className="mySwiper"
      style={{
        width: "100%",
        height: "100%",
      }}
      navigation={true}
    >
      {images?.map(({ id, preview_urls }) => {
        return (
          <SwiperSlide
            style={{
              borderRadius: "15px",
              width: "100%",
              height: "100%",
            }}
            key={id}
          >
            <Image
              h="full"
              w="full"
              objectFit={"cover"}
              src={preview_urls["656x340"]}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ObjectSlider;
