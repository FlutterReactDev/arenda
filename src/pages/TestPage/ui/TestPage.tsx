import { Box } from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export const TestPage = () => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }));
  // Bind it to a component
  return (
    <animated.div {...bind()} style={{ x, y }}>
      <Box w="100px" h="100px" bgColor="blue.300" rounded="2xl"></Box>
    </animated.div>
  );
};
