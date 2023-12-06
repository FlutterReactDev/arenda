import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ObjectMarker } from "@entites/Map/ui/ObjectMarker";
import { Map2GIS, HtmlMarker2GIS } from "@shared/ui/2GIS";
import { FC } from "react";
interface DragObjectMapProps {
  onClose: () => void;
}
export const DragObjectMap: FC<DragObjectMapProps> = (props) => {
  const { onClose } = props;
  return (
    <Box pos={"relative"} w={"full"} h="full">
      <IconButton
        aria-label="close map"
        isRound
        bgColor={"white"}
        onClick={onClose}
        pos={"absolute"}
        top={2}
        left={2}
        zIndex={"popover"}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Map2GIS
        initialMapOptions={{
          center: [77.1757361557881, 42.64472838750217],
          zoom: 18,
          key: _2GIS_KEY_,

          scaleControl: true,
          minZoom: 5,
        }}
      >
        <HtmlMarker2GIS coordinates={[77.1757361559851, 42.64472838750217]}>
          <ObjectMarker
            coordinates={[77.1757361557851, 42.64472838750217]}
            text={1000}
          />
        </HtmlMarker2GIS>
      </Map2GIS>
      <Box
        left={2}
        bottom={2}
        bgColor={"white"}
        rounded={"lg"}
        p={2}
        position={"absolute"}
        zIndex={"popover"}
      >
        <Text fontWeight={"medium"}>Бостери, Совесткая, 216a</Text>
      </Box>
    </Box>
  );
};
