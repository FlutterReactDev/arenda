import { TriangleDownIcon } from "@chakra-ui/icons";
import { Card, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
interface ObjectMarker {
  text: string;
}
export const ObjectMarker: FC<ObjectMarker> = (props) => {
  const { text } = props;
  return (
    <Card
      boxShadow={"lg"}
      bgColor={"red.400"}
      color={"white"}
      p={1}
      onClick={() => {
        console.log("click");
      }}
      userSelect={'none'}
      transform={" translate(-50%, -200%)"}
      position={"relative"}
    >
      <Text fontSize={"small"}>{text}</Text>
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
