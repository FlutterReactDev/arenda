import { Navigation, Pagination, EffectCreative } from "swiper/modules";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Box, IconButton, Image } from "@chakra-ui/react";
import { FC, memo, useCallback, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Photo } from "../model/types/photos";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
interface SimpleObjectSliderProps {
  images: Photo[];
}
const SimpleObjectSlider: FC<SimpleObjectSliderProps> = memo((props) => {
  const { images } = props;
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <Box>
      <>
        <IconButton
          pos={"absolute"}
          colorScheme="blue"
          aria-label="arrow left"
          onClick={handlePrev}
          top={"50%"}
          transform={"translateY(-50%)"}
          left={"2"}
          zIndex={"popover"}
          size={"sm"}
          icon={<ChevronLeftIcon boxSize={"8"} />}
          isRound
        />

        <IconButton
          pos={"absolute"}
          colorScheme="blue"
          aria-label="arrow left"
          onClick={handleNext}
          top={"50%"}
          transform={"translateY(-50%)"}
          zIndex={"popover"}
          size={"sm"}
          right={"2"}
          icon={<ChevronRightIcon boxSize={"8"} />}
          isRound
        />
      </>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        ref={sliderRef}
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
    </Box>
  );
});
export default SimpleObjectSlider;
