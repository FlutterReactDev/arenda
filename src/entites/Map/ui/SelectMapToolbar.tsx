import { CloseIcon } from "@chakra-ui/icons";
import { CircularProgress, HStack, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
interface SelectMapToolbarProps {
  address: string;
  onBack: () => void;
  isLoading: boolean;
}
export const SelectMapToolbar: FC<SelectMapToolbarProps> = (props) => {
  const { address, onBack, isLoading } = props;

  return (
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
      {address && !isLoading && (
        <>
          <Text>{address}</Text>
          <IconButton aria-label="Close Button" size={"xs"} onClick={onBack}>
            <CloseIcon />
          </IconButton>
        </>
      )}

      {isLoading && <CircularProgress isIndeterminate color="red.600" />}
    </HStack>
  );
};
