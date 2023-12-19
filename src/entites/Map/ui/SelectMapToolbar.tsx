import { CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { MapLoader } from "..";
interface SelectMapToolbarProps {
  address: string;
  onBack: () => void;
  isLoading: boolean;
  canBack: boolean;
}
export const SelectMapToolbar: FC<SelectMapToolbarProps> = (props) => {
  const { address, onBack, isLoading, canBack } = props;

  return (
    <>
      {isLoading && (
        <Box position={"absolute"} top={"2"} left={"2"}>
          <MapLoader />
        </Box>
      )}
      {!isLoading && (
        <HStack
          spacing={2}
          bgColor={"white"}
          boxShadow={"2xl"}
          padding={2}
          rounded={"lg"}
          position={"absolute"}
          top={"2"}
          left={"2"}
        >
          {address && (
            <>
              <Text>{address}</Text>
              {canBack && (
                <IconButton
                  aria-label="Close Button"
                  size={"xs"}
                  onClick={onBack}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </>
          )}
        </HStack>
      )}
    </>
  );
};
