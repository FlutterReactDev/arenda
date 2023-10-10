import { Box } from "@chakra-ui/react";
import { ObjectCard } from "@entites/Object";
import { useSpring, a, config } from "@react-spring/web";

import { findClosestNumber } from "@shared/utils/findClosestNumber";

import { useDrag } from "@use-gesture/react";
import { useEffect, useRef } from "react";

const height = window.innerHeight;
const CLOSE_DRAWER = height - 100;
const HALF_DRAWER = height * 0.5;
const FULL_DRAWER = height * 0.05;

const DRAWER_OPEN_STATES = [CLOSE_DRAWER, HALF_DRAWER, FULL_DRAWER];
export const DraggbleDrawer = () => {
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
  const currentHeight = useRef(CLOSE_DRAWER);
  const [{ y }, setY] = useSpring(() => ({ y: currentHeight.current }));

  const bind = useDrag(
    ({ last, swipe: [swipeY], movement: [, my] }) => {
      if (swipeY == 1) {
        const nextDrawerState = DRAWER_OPEN_STATES.findIndex(
          (state) => state == currentHeight.current
        );
        if (DRAWER_OPEN_STATES[nextDrawerState + swipeY] != undefined) {
          setY({
            y: DRAWER_OPEN_STATES[nextDrawerState + swipeY],
            immediate: false,
            config: config.wobbly,
          });
          currentHeight.current = DRAWER_OPEN_STATES[nextDrawerState + swipeY];
        }
        return;
      }
      if (last) {
        const currentValue = findClosestNumber(
          currentHeight.current + my,
          DRAWER_OPEN_STATES
        );

        setY({
          y: currentValue,
          immediate: false,
          config: config.wobbly,
        });

        currentHeight.current = currentValue;
      } else {
        setY({
          y: currentHeight.current + my,
          immediate: true,
        });
      }
    },
    {
      bounds: {
        top: (height - 100) * -1,
        bottom: 0,
      },
      filterTaps: true,
      rubberband: true,
    }
  );

  return (
    <a.div
      {...bind()}
      style={{
        y,
        width: "100%",
        height: "100%",
        position: "fixed",

        touchAction: "none",
      }}
    >
      <Box bgColor={"gray"} w="full" h={"full"} pt={5}>
        <ObjectCard />
        <ObjectCard />
        <ObjectCard />
        <ObjectCard />
        <ObjectCard />
        <ObjectCard />
        <ObjectCard />
      </Box>
    </a.div>
  );
};
