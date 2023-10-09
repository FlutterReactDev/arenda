import { Box } from "@chakra-ui/react";
import { ObjectCard } from "@entites/Object";
import { useSpring, a } from "@react-spring/web";
import { clamp } from "@shared/utils/clamp";
import { useGestureResponder } from "@shared/utils/hooks/useGeasture";
import { useState } from "react";

const OPEN_DRAWER = window.innerHeight - 200;
const HALF_DRAWER = window.innerHeight * 0.5;
const FULL_DRAWER = window.innerHeight * 0.1;
export const DraggbleDrawer = () => {
  console.log(OPEN_DRAWER, HALF_DRAWER, FULL_DRAWER);

  const [{ y }, setY] = useSpring(() => ({ y: OPEN_DRAWER }));
  const [currentHeight, setCurrentHeight] = useState(OPEN_DRAWER);

  const { bind } = useGestureResponder({
    onStartShouldSet: () => {
      return true;
    },
    onMove: (state) => {
      setY({
        y: currentHeight + state.delta[1],
        immediate: true,
      });
    },
    onMoveShouldSet: () => {
      return true;
    },
    onRelease: () => {
      if (y.get() <= HALF_DRAWER && y.get() >= FULL_DRAWER) {
        setY({
          y: HALF_DRAWER,
          immediate: false,
        });
        setCurrentHeight(HALF_DRAWER);
        return;
      }

      if (y.get() <= FULL_DRAWER && y.get() < HALF_DRAWER) {
        setY({
          y: FULL_DRAWER,
          immediate: false,
        });
        setCurrentHeight(FULL_DRAWER);
        return;
      }
      setY({
        y: OPEN_DRAWER,
        immediate: false,
      });
      setCurrentHeight(OPEN_DRAWER);
    },
  });

  return (
    <Box w={"full"} h="full">
      <a.div
        {...bind}
        style={{
          transform: y.to(
            (y) => `translateY(${clamp(y, 100, window.innerHeight)}px)`
          ),
          width: "100%",
          height: "100%",
        }}
      >
        <Box bgColor={"gray"} w="full" h={"full"} pt={5}>
          <Box
            padding={6}
            pointerEvents={"none"}
            {...(FULL_DRAWER == currentHeight && {
              overflowY: "auto",
              pointerEvents: "auto",
            })}
            w="full"
            h={"full"}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
          </Box>
        </Box>
      </a.div>
    </Box>
  );
};
