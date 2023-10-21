import { Box, BoxProps, Stack } from "@chakra-ui/react";

import { useDrag } from "@use-gesture/react";
import { FC, PropsWithChildren, memo } from "react";
import { CLOSE_DRAWER, DRAWER_OPEN_STATES, FULL_DRAWER } from "..";
import { SpringRef, SpringValue, config } from "@react-spring/web";
import { findClosestNumber } from "@shared/utils/findClosestNumber";

export interface DraggbleDrawerHeader extends BoxProps {
  setDirection: (dy: number) => void;
  currentHeight: number;
  setY: SpringRef<{
    y: number;
  }>;
  y: SpringValue<number>;
  setCurrentHeight: (value: number) => void;
}

const Puller = memo(() => {
  return (
    <Box as="span" w="12" h={"2"} bgColor={"gray.400"} rounded={"full"}></Box>
  );
});
export const DraggbleDrawerHeader: FC<PropsWithChildren<DraggbleDrawerHeader>> =
  memo(
    ({
      currentHeight,
      setDirection,
      setY,
      setCurrentHeight,
      y,
      children,
      ...props
    }) => {
      const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my] }) => {
          setDirection(dy);

          if (last) {
            if (vy > 0.3 && dy == 1) {
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

            setY.start({
              y: currentValue,
              immediate: false,
              config: config.stiff,
            });

            setCurrentHeight(currentValue);
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
        <Box
          {...props}
          position={"sticky"}
          zIndex={"popover"}
          top={0}
          w="full"
          px={4}
          py={2}
          {...bind()}
          bgColor={"gray.200"}
          roundedTop={"2xl"}
        >
          <Stack w={"full"} h="full" spacing={3} alignItems={"center"}>
            <Puller />
            {children}
          </Stack>
        </Box>
      );
    }
  );
