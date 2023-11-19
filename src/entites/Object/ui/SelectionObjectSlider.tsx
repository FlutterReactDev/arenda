import { StarIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface SelectionObjectSliderProps {
  slideIndex: number | null;
}
export const SelectionObjectSlider: FC<SelectionObjectSliderProps> = (
  props
) => {
  const { slideIndex } = props;

  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  useEffect(() => {
    if (swiperRef && slideIndex != null) {
      swiperRef.slideTo(0);
    }
  }, [slideIndex, swiperRef]);
  const IMAGE =
    "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

  const images = [
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 1,
    },
    {
      src: IMAGE,
      id: 2,
    },
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 3,
    },
    {
      src: IMAGE,
      id: 4,
    },
  ];
  return (
    <Swiper
      style={{
        width: "100%",
        height: "100%",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        // "--swiper-pagination-bullet-inactive-color": "white",
        "--swiper-pagination-bottom": "135px",
        "--swiper-pagination-bullet-inactive-opacity": "0.7",
        // "--swiper-pagination-color": "white",
        userSelect: "none",
      }}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      onSwiper={setSwiperRef}
    >
      {images.map(({ src, id }) => {
        return (
          <SwiperSlide
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              position: "relative",
              padding: "10px",
            }}
            key={id}
          >
            <Image
              rounded={"xl"}
              src={src}
              w={"full"}
              h="65%"
              mt={"10%"}
              objectFit={"cover"}
            />
          </SwiperSlide>
        );
      })}
      <Box pos={"absolute"} left={6} bottom={5}>
        <Heading size={"sm"} fontWeight={"medium"}>
          Уютный дом с площадкой для барбекю
        </Heading>
        <Box color="gray.500" fontWeight={"medium"} fontSize={"sm"} mt={1}>
          2 гостя &bull; 2 кровати &bull; 1 спальня &bull; 30 м<sup>2</sup>
        </Box>
        <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
          Бостери, Казак Тукуму, 75а/10
        </Text>
        <Box pos="relative" w="max-content" mt={2}>
          <Text fontSize={"xl"} fontWeight={"medium"} fontFamily={"sans-serif"}>
            Жаныбек
            <Box pos="absolute" top={"-5px"} right={"-25px"}>
              <Icon as={BsPatchCheck} color={"blue.600"} />
            </Box>
          </Text>
        </Box>
      </Box>

      <Box pos={"absolute"} top={2} right={3}>
        <HStack spacing={1} justifyContent={"flex-end"}>
          <StarIcon color={"red.500"} />
          <Text fontWeight={"medium"} fontSize={"lg"}>
            9,5(200)
          </Text>
        </HStack>
      </Box>
      <Box pos={"absolute"} top={2} left={3}>
        <HStack spacing={1}>
          <Text fontWeight={"medium"} fontSize={"lg"}>
            2000$
          </Text>
          <Text fontWeight={"medium"} color={"gray.500"}>
            за сутки
          </Text>
        </HStack>
      </Box>
    </Swiper>
  );
};
