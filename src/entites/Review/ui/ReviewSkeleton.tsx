import { HStack, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";

export const ReviewSkeleton = () => {
  return (
    <HStack alignItems={"flex-start"} position={"relative"}>
      <SkeletonCircle size="10" />
      <Stack bg="white" w="full">
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <Stack spacing={2}>
            <SkeletonText w="20" noOfLines={1} spacing="4" skeletonHeight="2" />
            <SkeletonText w="10" noOfLines={1} spacing="4" skeletonHeight="2" />
          </Stack>
          <Stack spacing={0}>
            <HStack spacing={1} justifyContent={"flex-end"}>
              <SkeletonText
                w="10"
                noOfLines={1}
                spacing="4"
                skeletonHeight="2"
              />
            </HStack>
          </Stack>
        </HStack>
        <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
      </Stack>
    </HStack>
  );
};
