import { Navigation, Pagination, EffectCreative } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Image } from "@chakra-ui/react";
import { FC } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
interface SimpleObjectSliderProps {
  images: {
    src: string;
    id: number;
  }[];
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
      {images.map((image) => {
        return (
          <SwiperSlide
            style={{
              borderRadius: "15px",
              height: "100%",
              width: "100%",
            }}
          >
            <Image h={"full"} w={"full"} objectFit={"cover"} src={image.src} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default SimpleObjectSlider;
