import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CircularProgress,
  HStack,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Suspense, lazy, memo } from "react";
import { FaHeart } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";

export const SimpleObjectCard = memo(() => {
  const Slider = lazy(() => import("./SimpleObjectSlider"));
  const IMAGE =
    "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

  const images = [
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 1,
    },
    {
      src: IMAGE,
      id: 2,
    },
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 3,
    },
    {
      src: IMAGE,
      id: 4,
    },
  ];
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
      <HStack
        position={"absolute"}
        top={0}
        left={"10px"}
        transform={"translateY(-50%)"}
        spacing={2}
      >
        <Tag bgColor={"red.600"} color="white" rounded="full">
          ТОП-10
        </Tag>
      </HStack>
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
          <Box as="span" color={"gray.500"} mr={2}>
            3{" "}
            <sup>
              <StarIcon />
            </sup>
          </Box>
          <Box as="span" color={"gray.500"}>
            Апарт-отель {`"`}Заебись отель{`"`}
          </Box>
        </Box>
        <Heading size={"sm"} fontWeight={"medium"}>
          Уютный дом с площадкой для барбекю
        </Heading>
        <Box>
          <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
            Бостери, Казак Тукуму, 75а/10
          </Text>
        </Box>
        <Box color="gray.500" fontWeight={"medium"} fontSize={"sm"} mt={1}>
          2 гостя &bull; 2 кровати &bull; 1 спальня &bull; 30 м<sup>2</sup>
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
            9,5{" "}
            <Box as="span" color={"gray.500"} fontWeight={"normal"}>
              (267)
            </Box>
          </Text>
        </HStack>
      </HStack>
    </Stack>
  );
});
