import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
interface ObjectInfoProps {
  name: string;
  objectId: number;
  address: string;
}
export const ObjectInfo: FC<ObjectInfoProps> = memo((props) => {
  const { address, name, objectId } = props;
  const [hover, setHover] = useState(false);
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  return (
    <GridItem h="full" area={"info"} role="group" position={"relative"}>
      <HStack
        h="full"
        w="full"
        bgColor={"white"}
        {...(!isLessThan968 && {
          px: 3,
        })}
        rounded={"xl"}
      >
        <Box
          w={isLessThan968 ? "60px" : "60px"}
          h={isLessThan968 ? "60px" : "60px"}
          p={1}
          rounded={"lg"}
          py={2}
          pos={"relative"}
          as={Link}
          to={`${objectId}`}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          cursor={"pointer"}
        >
          <Image
            w="full"
            h="full"
            rounded={"lg"}
            objectFit={"cover"}
            src="https://i.sutochno.ru/punx_8k4IWvahS61jB4zYKxq8Q949HNdirT3YZH9SQo/fit/400/300/no/1/czM6Ly9zdGF0aWMuc3V0b2Nobm8ucnUvZG9jL2ZpbGVzL29iamVjdHMvMS82MzcvMjU0LzY1MmViYzM3ZDI3YTIuanBn.webp"
          />
          {hover && (
            <Flex
              pos="absolute"
              w="full"
              h="full"
              left={0}
              top={0}
              bgColor={"blackAlpha.200"}
              alignItems={"center"}
              justifyContent={"center"}
              rounded={"lg"}
              color={"white"}
            >
              <CalendarIcon />
            </Flex>
          )}
        </Box>
        {!isLessThan968 && (
          <Stack spacing={0} lineHeight={"18px"}>
            <Text fontSize={"sm"}>ID {objectId}</Text>
            <Text fontSize={"sm"}>{name}</Text>
            <Text
              fontSize={"sm"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              fontWeight={"medium"}
              color={"gray.500"}
            >
              {address}
            </Text>
          </Stack>
        )}
      </HStack>
      {/* <HStack pos={"absolute"} top={1} left={2}>
        <StatusChangePopover />
      </HStack> */}
    </GridItem>
  );
});
