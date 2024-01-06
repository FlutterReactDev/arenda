import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CircularProgress,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { FC, Suspense, lazy, memo } from "react";
import { FaHeart } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Item3 } from "../model/types/objectDetail";
import { Photo } from "../model/types/photos";
const Slider = lazy(() => import("./SimpleObjectSlider"));
interface SimpleObjectCardProps extends Item3 {
  images: Photo[];
}
export const SimpleObjectCard: FC<SimpleObjectCardProps> = memo((props) => {
  const { reviews, images, id, name, address_name, purpose_name, context } =
    props;

  return (
    <Stack
      role={"group"}
      p={4}
      maxW={"full"}
      w={"full"}
      bg={"white"}
      rounded={"lg"}
      pos={"relative"}
      as={Link}
      to={`/${id.split("_")[0]}/object-detail`}
      transition={"0.3s all"}
      _hover={{
        boxShadow: "xl",
      }}
    >
      <Box position={"relative"} h={"48"} w={"full"}>
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
        >
          <Center h="full" w="full">
            <FaHeart />
          </Center>
        </Box>
      </Box>
      <Box>
        <Box fontWeight={"medium"} fontSize={"sm"}>
          <Box as="span" color={"gray.500"}>
            {purpose_name}
          </Box>
        </Box>
        <Heading size={"sm"} fontWeight={"medium"}>
          {name}
        </Heading>
        <Box>
          <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
            {address_name}
          </Text>
        </Box>
        <Box color="gray.500" fontWeight={"medium"} fontSize={"sm"} mt={1}>
          {context?.stop_factors?.map(({ name }, idx, arr) => {
            if (arr.length - 1 != idx) {
              return <>{name} &bull; </>;
            }
            return <>{name}</>;
          })}
        </Box>
      </Box>
      <HStack justifyContent={"space-between"}>
        <Box>
          <HStack spacing={1} justifyContent={"flex-end"}>
            <Icon as={HiLightningBolt} color={"red.500"} />
            <Text fontWeight={"bold"}>1000 $</Text>
            <Text>за сутки</Text>
          </HStack>
          <Text color={"gray.500"} fontWeight={"medium"}>
            Всего 8000$
          </Text>
        </Box>
        <HStack spacing={1}>
          <StarIcon color={"red.500"} />
          <Text fontWeight={"medium"}>
            {reviews.general_rating}{" "}
            <Box as="span" color={"gray.500"} fontWeight={"normal"}>
              {reviews.general_review_count}{" "}
              {getWordByNum(reviews.general_review_count, [
                "отзыв",
                "отзыва",
                "отзывов",
              ])}
            </Box>
          </Text>
        </HStack>
      </HStack>
    </Stack>
  );
});
