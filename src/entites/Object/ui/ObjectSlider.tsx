import { Box, IconButton, Image } from "@chakra-ui/react";
import { FC, memo, useCallback, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Photo } from "../model/types/photos";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface ObjectSliderProps {
  images: Photo[];
}
const ObjectSlider: FC<ObjectSliderProps> = memo((props) => {
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
    <Box pos="relative" w="full" h="full">
      <>
        <IconButton
          pos={"absolute"}
          colorScheme="blue"
          aria-label="arrow left"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
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
        effect={"cards"}
        grabCursor={true}
        ref={sliderRef}
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
    </Box>
  );
});

export default ObjectSlider;
