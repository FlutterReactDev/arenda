import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CircularProgress,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC, Suspense, lazy, memo } from "react";

import { FaHeart } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Item3 } from "../model/types/objectDetail";
import { Photo } from "../model/types/photos";
import { getWordByNum } from "@shared/utils/getWordByNum";

interface ObjectCardProps extends Item3 {
  images: Photo[];
  onHover?: (id: string) => void;
  onHoverOut?: () => void;
}
const Slider = lazy(() => import("./ObjectSlider"));
export const ObjectCard: FC<ObjectCardProps> = memo((props) => {
  const {
    reviews,
    images,
    id,
    name,
    address_name,
    purpose_name,
    context,
    onHover,
    onHoverOut,
  } = props;

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
      transition={"0.3s all"}
      _hover={{
        boxShadow: "xl",
      }}
      onMouseEnter={() => onHover && onHover(id)}
      onMouseLeave={onHoverOut}
    >
      {/* <HStack
        position={"absolute"}
        top={0}
        left={"10px"}
        transform={"translateY(-50%)"}
        spacing={2}
      >
        <Tag bgColor={"red.600"} color="white" rounded="full">
          ТОП-10
        </Tag>
      </HStack> */}

      <GridItem mr={"40px"} pos={"relative"}>
        <Suspense
          fallback={
            <Center>
              <CircularProgress isIndeterminate color="red.600" />
            </Center>
          }
        >
          <Slider images={images} />
        </Suspense>
        <Box
          top={2}
          right={2}
          position={"absolute"}
          w={8}
          h={8}
          rounded={"full"}
          bgColor={"gray.100"}
          zIndex={8}
          color={"blackAlpha.500"}
          cursor={"pointer"}
          transition={"0.3s all"}
          _hover={{
            color: "red.600",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Center h="full" w="full">
            <FaHeart />
          </Center>
        </Box>
      </GridItem>
      <GridItem as={Link} to={`/${id.split("_")[0]}/object-detail`}>
        <Stack justifyContent={"space-between"} h={"full"}>
          <Box>
            <Box fontWeight={"medium"} fontSize={"sm"}>
              <Box as="span" color={"gray.500"}>
                {purpose_name}
              </Box>
            </Box>
            <Heading size={"sm"} fontWeight={"medium"}>
              {name}
            </Heading>

            <Box
              color="gray.500"
              fontWeight={"medium"}
              fontSize={"smaller"}
              mt={1}
            >
              {context?.stop_factors?.map(({ name }, idx, arr) => {
                if (arr.length - 1 != idx) {
                  return <>{name} &bull; </>;
                }
                return <>{name}</>;
              })}
            </Box>
          </Box>
          <Box>
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
              {address_name}
            </Text>
          </Box>
        </Stack>
      </GridItem>
      <GridItem>
        <Divider orientation="vertical" h={"full"} borderColor={"gray.500"} />
      </GridItem>
      <GridItem as={Link} to={`/${id.split("_")[0]}/object-detail`}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          textAlign={"right"}
          h={"full"}
        >
          <HStack fontSize={"sm"} cursor={"pointer"}>
            <Text color={"gray.500"} fontWeight={"medium"}>
              {reviews.general_review_count}{" "}
              {getWordByNum(reviews.general_review_count, [
                "отзыв",
                "отзыва",
                "отзывов",
              ])}
            </Text>
            <HStack spacing={1}>
              <StarIcon color={"red.500"} />
              <Text fontWeight={"medium"}>{reviews.general_rating}</Text>
            </HStack>
          </HStack>

          <Box>
            <HStack spacing={1} justifyContent={"center"} alignItems={"center"}>
              <Icon as={HiLightningBolt} color={"red.500"} />
              <Text color={"gray.500"} fontSize={"x-small"}>
                Быстрое бронирование
              </Text>
            </HStack>
            <HStack spacing={1} justifyContent={"flex-end"}>
              <Text fontWeight={"bold"}>1000 $</Text>
              <Text>за сутки</Text>
            </HStack>
            <Text color={"gray.500"} fontWeight={"medium"}>
              Всего 8000$
            </Text>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
});
