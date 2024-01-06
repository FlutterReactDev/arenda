import { Navigation, Pagination, EffectCreative } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Image } from "@chakra-ui/react";
import { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Photo } from "../model/types/photos";
interface SimpleObjectSliderProps {
  images: Photo[];
}
const SimpleObjectSlider: FC<SimpleObjectSliderProps> = (props) => {
  const { images } = props;
  return (
    <Swiper
      effect={"creative"}
      grabCursor={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[Pagination, Navigation, EffectCreative]}
      style={{
        width: "100%",
        height: "100%",
      }}
      navigation={true}
    >
      {images?.map(({ preview_urls, id }) => {
        return (
          <SwiperSlide
            style={{
              borderRadius: "15px",
              height: "100%",
              width: "100%",
            }}
            key={id}
          >
            <Image
              h={"full"}
              w={"full"}
              objectFit={"cover"}
              src={preview_urls["328x170"]}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default SimpleObjectSlider;
