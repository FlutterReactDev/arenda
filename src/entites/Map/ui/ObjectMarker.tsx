import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Card, HStack, Text } from "@chakra-ui/react";

import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { FC } from "react";
import { useSearchMap } from "..";

interface ObjectMarker {
  text: number;
  coordinates: number[];
}
export const ObjectMarker: FC<ObjectMarker> = (props) => {
  const { text, coordinates } = props;
  const { onHover, clearHover } = useSearchMap();

  const onHoverMarker = () => {
    onHover({
      latitude: coordinates[1],
      longitude: coordinates[0],
    });
  };

  return (
    <Card
      bgColor={"red.400"}
      color={"white"}
      userSelect={"none"}
      transform={"translate(-50%, -150%)"}
      position={"relative"}
      cursor={"pointer"}
      p={1}
      onMouseEnter={onHoverMarker}
      onMouseLeave={clearHover}
      pos={"relative"}
      transformOrigin={"center"}
      _hover={{
        transform: "scale(1.1)  translate(-50%, -150%)",
      }}
      rounded={"lg"}
    >
      <HStack spacing={0} fontSize={"12px"}>
        <Text>
          {text.toLocaleString().replace(/,/g, " ")}{" "}
          {getCurrencySymbol("RU-ru", "KGS")}
        </Text>
      </HStack>

      <Box
        as="span"
        color="red.400"
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translateX(-50%)"}
      >
        <TriangleDownIcon />
      </Box>
    </Card>
  );
};
