import {
    Box,
    Center,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack
} from "@chakra-ui/react";
import { memo } from "react";

export const SimpleObjectCardSkeleton = memo(() => {
  return (
    <Stack
      role={"group"}
      p={4}
      maxW={"full"}
      w={"full"}
      bg={"white"}
      rounded={"lg"}
      pos={"relative"}
    >
      <Box position={"relative"} h={"48"} w={"full"}>
        <Skeleton w="full" h="full" rounded={"xl"} />

        <Box
          top={2}
          right={2}
          position={"absolute"}
          w={8}
          h={8}
          rounded={"full"}
          bgColor={"gray.100"}
          zIndex={8}
        >
          <Center h="full" w="full">
            <SkeletonCircle size="8" />
          </Center>
        </Box>
      </Box>
      <Box>
        <SkeletonText lineHeight={"1"} noOfLines={3} />
      </Box>

      <SkeletonText lineHeight={"1"} noOfLines={2} mt={4} />
    </Stack>
  );
});
