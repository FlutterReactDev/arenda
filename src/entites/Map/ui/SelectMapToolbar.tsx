import { CloseIcon } from "@chakra-ui/icons";
import { Center, HStack, IconButton, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { getItemByCoords } from "../model/utils";
import { Item } from "../model/types";
import { useGetObjectByCoordinatesQuery } from "../model/api";

interface SelectMapToolbarProps {
  coordinates: number[];
  setClearMarker: (value: boolean) => void;
  onChange: (value: number[]) => void;
  items: Item[];
}

export const SelectMapToolbar: FC<SelectMapToolbarProps> = (props) => {
  const { coordinates, onChange, setClearMarker, items } = props;

  const addressInfo =
    getItemByCoords(coordinates, items)?.full_name || undefined;

  const { data, isFetching } = useGetObjectByCoordinatesQuery(coordinates, {
    refetchOnMountOrArgChange: true,
    skip: addressInfo !== undefined,
  });

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
          <Spinner size={"lg"} />
        </Center>
      )}

      {addressInfo && (
        <>
          <Text>{addressInfo || data?.result?.items[0].full_name}</Text>
          <IconButton
            aria-label="Close Button"
            size={"xs"}
            onClick={() => {
              if (items?.length == 1) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange(undefined);
                setClearMarker(true);
                return;
              }
              setClearMarker(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange(undefined);
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}

      {!addressInfo && !isFetching && (
        <>
          <Text>{data?.result?.items[0]?.full_name}</Text>
          <IconButton
            aria-label="Close Button"
            size={"xs"}
            onClick={() => {
              if (items?.length == 1) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange(undefined);
                setClearMarker(true);
                return;
              }
              setClearMarker(false);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onChange(undefined);
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </HStack>
  );
};
