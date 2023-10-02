import { TriangleDownIcon } from "@chakra-ui/icons";
import { Card, Box, Text } from "@chakra-ui/react";

import { FC } from "react";

interface ObjectMarker {
  text: string;
  coordinates: number[];
}
export const ObjectMarker: FC<ObjectMarker> = (props) => {
  const { text } = props;

  return (
    <Card
      boxShadow={"lg"}
      bgColor={"red.400"}
      color={"white"}
      userSelect={"none"}
      transform={" translate(-50%, -200%)"}
      position={"relative"}
      cursor={"pointer"}
      p={1}
    >
      <Text fontSize={"12px"}>{text}</Text>
      <Box
        as="span"
        color="red.400"
        position={"absolute"}
        top={"100%"}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <TriangleDownIcon />
      </Box>
    </Card>
  );
};
