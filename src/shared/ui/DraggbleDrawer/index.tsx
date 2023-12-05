import { Portal, Stack } from "@chakra-ui/react";

import { useSpring, a, config } from "@react-spring/web";

import { findClosestNumber } from "@shared/utils/findClosestNumber";

import { useDrag } from "@use-gesture/react";
import {
  LegacyRef,
  MutableRefObject,
  UIEvent,
  useEffect,
  useRef,
  useState,
  ReactNode,
  PropsWithChildren,
  FC,
} from "react";
import { DraggbleDrawerHeader } from "./ui/DraggbleDrawerHeader";

export const height = window.innerHeight;
export const CLOSE_DRAWER = height - 90;
export const HALF_DRAWER = height * 0.5;
export const FULL_DRAWER = height * 0.05;
export interface DraggbleDrawerProps {
  header: ReactNode;
}
export const DRAWER_OPEN_STATES = [CLOSE_DRAWER, HALF_DRAWER, FULL_DRAWER];
export const DraggbleDrawer: FC<PropsWithChildren<DraggbleDrawerProps>> = (
  props
) => {
  const { header, children } = props;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    function preventBehavior(e) {
      if (e.cancelable) e.preventDefault();
    }

    document.addEventListener("touchmove", preventBehavior, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventBehavior);
    };
  }, []);

  const [currentHeight, setCurrentHeight] = useState(CLOSE_DRAWER);
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);

  const [direction, setDirection] = useState(0);
  const [{ y }, setY] = useSpring(() => ({ y: currentHeight }));

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my] }) => {
      setDirection(dy);

      if (last) {
        if (vy > 0.3 && dy == 1 && isScrollOnTop) {
          const nextDrawerState = DRAWER_OPEN_STATES.findIndex(
            (state) => state == currentHeight
          );
          if (DRAWER_OPEN_STATES[nextDrawerState - 1] != undefined) {
            setY.start({
              y: DRAWER_OPEN_STATES[nextDrawerState - 1],
              config: config.stiff,
              immediate: false,
            });
            setCurrentHeight(DRAWER_OPEN_STATES[nextDrawerState - 1]);
            return;
          }
        }

        if (vy > 0.3 && dy == -1 && y.get() >= FULL_DRAWER) {
          const nextDrawerState = DRAWER_OPEN_STATES.findIndex(
            (state) => state == currentHeight
          );
          if (DRAWER_OPEN_STATES[nextDrawerState + 1] != undefined) {
            setY.start({
              y: DRAWER_OPEN_STATES[nextDrawerState + 1],
              config: config.stiff,
              immediate: false,
            });
            setCurrentHeight(DRAWER_OPEN_STATES[nextDrawerState + 1]);
            return;
          }
        }

        const currentValue = findClosestNumber(
          currentHeight + my,
          DRAWER_OPEN_STATES
        );
        if (isScrollOnTop) {
          setY.start({
            y: currentValue,
            immediate: false,
            config: config.stiff,
          });

          setCurrentHeight(currentValue);
        }
      } else {
        if (currentHeight + my <= FULL_DRAWER) {
          setY.start({
            y: FULL_DRAWER,
            immediate: true,
          });
          setCurrentHeight(FULL_DRAWER);
          return;
        }

        if (currentHeight + my >= CLOSE_DRAWER) {
          setY.start({
            y: CLOSE_DRAWER,
            immediate: true,
          });
          setCurrentHeight(CLOSE_DRAWER);
          return;
        }

        if (!isScrollOnTop) {
          return;
        }

        setY.start({
          y: currentHeight + my,
          immediate: true,
        });
      }
    },
    {
      filterTaps: true,
      rubberband: true,
      axis: "y",
    }
  );

  return (
    <Portal>
      <a.div
        style={{
          y,
          width: "100%",
          height: `calc(100dvh - ${height * 0.05}px)`,
          position: "fixed",
          overflow: "hidden",
          top: 0,
          zIndex: "100",
        }}
      >
        <Stack
          spacing={2}
          bgColor={"gray.100"}
          w="full"
          h={"full"}
          roundedTop={"2xl"}
          style={{
            touchAction: "auto",
          }}
        >
          <DraggbleDrawerHeader
            currentHeight={currentHeight}
            setCurrentHeight={setCurrentHeight}
            setDirection={setDirection}
            setY={setY}
            y={y}
          >
            {header}
          </DraggbleDrawerHeader>

          <Stack
            {...bind()}
            roundedTop={"lg"}
            w="full"
            h={"full"}
            spacing={6}
            px={4}
            scrollBehavior={"smooth"}
            {...(DRAWER_OPEN_STATES[DRAWER_OPEN_STATES.length - 1] ==
              currentHeight && {
              overflowY: "scroll",
            })}
            ref={scrollRef as LegacyRef<HTMLDivElement>}
            onScroll={(e: UIEvent<HTMLDivElement>) => {
              e.preventDefault();
              const top = e.currentTarget.scrollTop;

              if (top == 0) {
                return setIsScrollOnTop(true);
              }
              return setIsScrollOnTop(false);
            }}
            onTouchStart={(e) => {
              if (
                DRAWER_OPEN_STATES[DRAWER_OPEN_STATES.length - 1] ==
                  currentHeight &&
                direction != 0
              ) {
                if (direction == 1 && isScrollOnTop) {
                  return;
                }
                e.stopPropagation();
              }
            }}
            onTouchEnd={(e) => {
              if (
                DRAWER_OPEN_STATES[DRAWER_OPEN_STATES.length - 1] ==
                  currentHeight &&
                direction != 0
              ) {
                if (direction == 1 && isScrollOnTop) {
                  return;
                }
                e.stopPropagation();
              }
            }}
            onTouchMove={(e) => {
              if (
                DRAWER_OPEN_STATES[DRAWER_OPEN_STATES.length - 1] ==
                  currentHeight &&
                direction != 0
              ) {
                if (direction == 1 && isScrollOnTop) {
                  return;
                }

                e.stopPropagation();
              }
            }}
          >
            {children}
          </Stack>
        </Stack>
      </a.div>
    </Portal>
  );
};
