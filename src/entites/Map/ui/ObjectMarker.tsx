import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Card, HStack, Text } from "@chakra-ui/react";

import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { MarkerItem } from "../model/types";

interface ObjectMarker extends MarkerItem {
  isHovered: boolean;
}
export const ObjectMarker: FC<ObjectMarker> = memo(
  (props) => {
    const { isHovered, id, context } = props;
    console.log('dsadsa');
    
    return (
      <Card
        as={Link}
        to={`/${id.split("_")[0]}/object-detail`}
        bgColor={"facebook.500"}
        color={"white"}
        userSelect={"none"}
        transform={"translate(-50%, -150%)"}
        position={"relative"}
        cursor={"pointer"}
        p={1}
        pos={"relative"}
        transformOrigin={"center"}
        {...(isHovered && {
          transform: "scale(1.1)  translate(-50%, -150%)",
          bgColor: "red.500",
        })}
        rounded={"lg"}
      >
        <HStack spacing={0} fontSize={"12px"}>
          <Text>
            {context.stop_factors &&
              context.stop_factors[0].name.match(/\d/g)?.join("")}{" "}
            сом
          </Text>
        </HStack>

        <Box
          as="span"
          color="facebook.500"
          {...(isHovered && {
            color: "red.500",
          })}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translateX(-50%)"}
        >
          <TriangleDownIcon />
        </Box>
      </Card>
    );
  },
  () => {
    return true;
  }
);
