import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
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
    </Box>
  );
};
