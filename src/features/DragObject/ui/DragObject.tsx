import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import {
  Box,
  Icon,
  IconButton,
  Slide,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { HiOutlineMap } from "react-icons/hi";

import { SelectionObjectSlider } from "@entites/Object";
import { AiOutlineHeart } from "react-icons/ai";
import { DragObjectMap } from "./DragObjectMap";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { dragObjectAction } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { DragObjectReviews } from "./DragObjectReviews";
import { useEffect } from "react";

export const DragObject = () => {
  const dispatch = useAppDispatch();
  const currentObjectIndex = useAppSelector(
    (state) => state.dragObject.currentObjectIndex
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCommentOpen = () => {
    dispatch(dragObjectAction.setCommentOpen());
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    function preventBehavior(e) {
      e.preventDefault();
    }

    document.addEventListener("touchmove", preventBehavior, {
      passive: false,
    });
  }, []);
  return (
    <>
      <Box
        w="full"
        h="100dvh"
        bgColor={"blackAlpha.50"}
        overflow={"hidden"}
        pos="relative"
      >
        <Swiper
          style={{
            width: "100%",
            height: "100%",
          }}
          direction="vertical"
          onSlideChange={({ activeIndex }) => {
            dispatch(dragObjectAction.setCurrentObjectIndex(activeIndex));
          }}
        >
          <SwiperSlide>
            <SelectionObjectSlider slideIndex={currentObjectIndex} />
          </SwiperSlide>
          <SwiperSlide>
            <SelectionObjectSlider slideIndex={currentObjectIndex} />
          </SwiperSlide>
        </Swiper>
        <Stack
          pos={"absolute"}
          right={4}
          top={"50%"}
          transform={"translateY(-50%)"}
          zIndex={"docked"}
        >
          <Stack spacing={0} alignItems={"center"}>
            <IconButton
              size={"lg"}
              aria-label="open comment button"
              isRound
              bgColor={"white"}
              onClick={onCommentOpen}
            >
              <Icon as={AiOutlineComment} />
            </IconButton>
            <Text fontWeight={"medium"} fontSize={"sm"} color="white">
              12
            </Text>
          </Stack>

          <Stack spacing={0} alignItems={"center"}>
            <IconButton
              isRound
              aria-label="like button"
              cursor={"pointer"}
              transition={"0.3s all"}
              _hover={{
                color: "red.600",
              }}
              size={"lg"}
            >
              <Icon as={AiOutlineHeart} />
            </IconButton>
            <Text fontWeight={"medium"} fontSize={"sm"} color="white">
              12
            </Text>
          </Stack>
          <IconButton
            size={"lg"}
            aria-label="open map button"
            isRound
            bgColor={"white"}
            onClick={onOpen}
          >
            <Icon as={HiOutlineMap} />
          </IconButton>
        </Stack>
      </Box>

      <Slide
        direction="right"
        in={isOpen}
        style={{
          zIndex: 200,
        }}
      >
        <DragObjectMap onClose={onClose} />
      </Slide>
      <DragObjectReviews />
    </>
  );
};
