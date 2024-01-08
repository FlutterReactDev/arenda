import {
  Box,
  Divider,
  Grid,
  GridItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export const ObjectCardSkeleton = () => {
  return (
    <Grid
      role={"group"}
      p={6}
      maxW={"full"}
      w={"full"}
      bg={"white"}
      rounded={"lg"}
      pos={"relative"}
      gridTemplateRows={"180px"}
      gridTemplateColumns={"260px 1fr 2.5px 149px"}
      gap={2}
    >
      <GridItem mr={"40px"} pos={"relative"}>
        <Skeleton h={"full"} w="full" rounded={"xl"} />
        <Box
          top={2}
          right={2}
          position={"absolute"}
          w={10}
          h={10}
          rounded={"full"}
          bgColor={"gray.100"}
          zIndex={8}
          color={"blackAlpha.500"}
          cursor={"pointer"}
        >
          <SkeletonCircle size="10" />
        </Box>
      </GridItem>
      <GridItem>
        <Stack justifyContent={"space-between"} h={"full"}>
          <Stack>
            <SkeletonText skeletonHeight="1" noOfLines={2} />

            <SkeletonText skeletonHeight="1" noOfLines={2} />
          </Stack>
          <Box>
            <SkeletonText skeletonHeight="1" noOfLines={3} />
          </Box>
        </Stack>
      </GridItem>
      <GridItem>
        <Divider orientation="vertical" h={"full"} borderColor={"gray.500"} />
      </GridItem>
      <GridItem>
        <Stack justifyContent={"space-between"} textAlign={"right"} h="full">
          <SkeletonText
            marginLeft={"auto"}
            skeletonHeight="1"
            w={"20"}
            noOfLines={1}
          />

          <SkeletonText skeletonHeight="1" noOfLines={3}></SkeletonText>
        </Stack>
      </GridItem>
    </Grid>
  );
};
