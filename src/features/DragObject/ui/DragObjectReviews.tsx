import { Box, HStack, IconButton, Stack } from "@chakra-ui/react";
import { CommentItem } from "@entites/Comments";
import { useSpring, a, config } from "@react-spring/web";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { useDrag } from "@use-gesture/react";
import { MutableRefObject, memo, useEffect, useRef, useState } from "react";
import { dragObjectAction } from "..";
import { CloseIcon } from "@chakra-ui/icons";
const initialHeight = window.innerHeight * 0.8;
const Puller = memo(() => {
  return (
    <Box id="puller" w="12" h={"2"} bgColor={"gray.400"} rounded={"full"}></Box>
  );
});
export const DragObjectReviews = () => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [isScrollOnTop, setIsScrollOnTop] = useState(true);
  const [direction, setDirection] = useState(0);
  const commentIsOpen = useAppSelector(
    (state) => state.dragObject.commentIsOpen
  );

  const [{ y }, api] = useSpring(() => ({ y: initialHeight }));

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], target }) => {
      setDirection(dy);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (target.id == "puller") {
        if (oy > 0) {
          if (
            (last && oy >= initialHeight * 0.3) ||
            (last && dy == 1 && vy >= 0.5)
          ) {
            close();
            scrollRef.current.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else if (last && oy <= initialHeight * 0.3) {
            open();
          } else {
            api.start({
              y: oy,
              immediate: true,
            });
          }
        }
        return;
      }

      if (oy > 0 && isScrollOnTop) {
        if (
          (last && oy >= initialHeight * 0.3) ||
          (last && dy == 1 && vy >= 0.5)
        ) {
          close();
        } else if (last && oy <= initialHeight * 0.3) {
          open();
        } else {
          api.start({
            y: oy,
            immediate: true,
          });
        }
      }
    },
    {
      axis: "y",
      filterTaps: true,
      from: () => [0, y.get()],
    }
  );
  const open = () => {
    api.start({
      y: 0,
      immediate: false,
      config: config.stiff,
    });
  };
  const close = () => {
    api.start({
      y: initialHeight,
      immediate: false,
      config: config.stiff,
    });
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(dragObjectAction.setCommentClose());
  };

  useEffect(() => {
    if (commentIsOpen) {
      open();
    }
  }, [commentIsOpen]);
  return (
    <>
      <a.div
        style={{
          height: "calc(100dvh)",
          y,
          borderRadius: "12px 12px 0",
          position: "fixed",
          backgroundColor: "white",
          zIndex: 20,
          left: 0,
          right: 0,
          bottom: `calc(-100dvh + ${initialHeight}px)`,
          touchAction: "auto",
        }}
        {...bind()}
      >
        <HStack
          id="puller"
          pos={"sticky"}
          alignItems={"center"}
          justifyContent={"center"}
          p={6}
          position={"relative"}
          borderBottom={"1px solid "}
          borderColor={"gray.300"}
          roundedTop={"lg"}
        >
          <Puller />
          <IconButton
            pos="absolute"
            right={2}
            onClick={close}
            isRound
            aria-label="close comment"
            size={"sm"}
          >
            <CloseIcon fontSize={"small"} />
          </IconButton>
        </HStack>
        <Stack
          h={initialHeight - 50}
          py={4}
          px={2}
          overflowY={"auto"}
          style={{
            touchAction: isScrollOnTop && direction == 1 ? "none" : "pan-y",
          }}
          ref={scrollRef}
          onScroll={(e) => {
            e.preventDefault();
            const top = e.currentTarget.scrollTop;

            if (top == 0) {
              return setIsScrollOnTop(true);
            }
            return setIsScrollOnTop(false);
          }}
          onTouchStart={(e) => {
            if (direction == 1 && isScrollOnTop) {
              return;
            }
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            if (direction == 1 && isScrollOnTop) {
              return e.persist();
            }
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            if (direction == 1 && isScrollOnTop) {
              return e.persist();
            }
            e.stopPropagation();
          }}
        >
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
          <CommentItem></CommentItem>
        </Stack>
      </a.div>
      {commentIsOpen && (
        <Box
          position={"fixed"}
          left={0}
          right={0}
          top={0}
          bottom={0}
          bgColor={"blackAlpha.500"}
          zIndex={10}
          onClick={close}
        ></Box>
      )}
    </>
  );
};
