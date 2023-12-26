import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper/modules";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import {
  Children,
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useRef,
} from "react";
import "swiper/css";
import "swiper/css/navigation";
import { SwiperOptions } from "swiper/types";
interface SliderProps {
  slidesPerView: "auto" | number;
  disableArrow?: boolean;
  breakpoint?:
    | {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
      }
    | undefined;
}
export const Slider: FC<PropsWithChildren<SliderProps>> = memo((props) => {
  const { children, slidesPerView, disableArrow = false, breakpoint } = props;
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
    <Box pos={"relative"}>
      <Swiper
        ref={sliderRef}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        modules={[Navigation]}
        breakpoints={breakpoint}
        style={{
          padding: 20,
        }}
      >
        {Children.map(children, (el, idx) => {
          return <SwiperSlide key={idx}>{el}</SwiperSlide>;
        })}
      </Swiper>

      {!disableArrow && (
        <>
          <IconButton
            pos={"absolute"}
            aria-label="arrow left"
            variant={"unstyle"}
            onClick={handlePrev}
            top={"50%"}
            transform={"translateY(-50%)"}
            zIndex={"docked"}
            left={"-90px"}
            icon={<ChevronLeftIcon boxSize={"10"} />}
          />

          <IconButton
            pos={"absolute"}
            aria-label="arrow left"
            variant={"ghost"}
            onClick={handleNext}
            top={"50%"}
            transform={"translateY(-50%)"}
            zIndex={"docked"}
            right={"-90px"}
            icon={<ChevronRightIcon boxSize={"10"} />}
          />
        </>
      )}
    </Box>
  );
});
