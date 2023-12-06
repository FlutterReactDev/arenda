import { CloseIcon } from "@chakra-ui/icons";
import {
  Center,
  CircularProgress,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useSelectMap } from "..";
import { useGetObjectByCoordinatesQuery } from "../model/api";
import { LatLong } from "../model/types";
import { getItemByCoords } from "../model/utils";

export const SelectMapToolbar = () => {
  const { markers, selectedObject, clearSelectedObject, showMarkers } =
    useSelectMap();

  const addressInfo =
    (selectedObject && getItemByCoords(selectedObject, markers)?.full_name) ||
    undefined;

  const { data, isFetching } = useGetObjectByCoordinatesQuery(
    selectedObject as LatLong,
    {
      refetchOnMountOrArgChange: true,
      skip: addressInfo !== undefined && !selectedObject,
    }
  );

  const onClose = () => {
    clearSelectedObject();
    showMarkers();
  };

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
      {isFetching && !addressInfo && (
        <Center>
          <CircularProgress isIndeterminate color="blue.600" />
        </Center>
      )}

      {addressInfo && (
        <>
          <Text>{addressInfo}</Text>
          <IconButton aria-label="Close Button" size={"xs"} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </>
      )}

      {!isFetching && !addressInfo && (
        <>
          <Text>{data?.result?.items[0].address_name}</Text>

          <IconButton aria-label="Close Button" size={"xs"} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </HStack>
  );
};
