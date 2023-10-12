import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Spinner,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { Suspense, lazy, memo } from "react";

import { FaHeart } from "react-icons/fa";
const Slider = lazy(() => import("./ObjectSlider"));
export const ObjectCard = memo(() => {
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
    <Center>
      <Box
        role={"group"}
        p={6}
        maxW={"360px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
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
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"190px"}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
          w={"96%"}
          margin={"0 auto"}
        >
          <Suspense
            fallback={
              <Center>
                <Spinner color="red.600" size={"xl"} />
              </Center>
            }
          >
            <Slider images={images} />
          </Suspense>
        </Box>
        <Stack mt={4} spacing={0} justifyContent={"center"}>
          <Heading size={"md"}>
            Turak Hotel innovation Turak Hotel innovation Turak Hotel innovation
          </Heading>

          <HStack>
            <Text color={"red.600"} fontWeight={"medium"} pt={"5px"}>
              4.4
            </Text>
            <Box>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon key={i} color={i < 4 ? "red.500" : "gray.300"} />
                ))}
            </Box>
            <Box as="span" color="gray.600" fontSize="sm">
              <HStack alignItems={"center"}>
                <Text>6</Text> <ViewIcon />
              </HStack>
            </Box>
          </HStack>
          <HStack spacing={1}>
            <Text color={"red.600"} fontWeight={"medium"}>
              $57
            </Text>

            <Box as="span" color="gray.600" fontSize="sm">
              за сутки
            </Box>
          </HStack>

          <Box as="span" color="gray.600" fontSize="sm">
            Всего $171
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            fontSize="xs"
            textTransform="uppercase"
            mt={1}
          >
            2 кровати &bull; 1 спальня
          </Box>
        </Stack>
      </Box>
    </Center>
  );
});
