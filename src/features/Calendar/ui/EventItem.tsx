import { Box, Button, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { format } from "date-fns";
import { FC } from "react";
import {
  getObject,
  getObjectAvailibilityById,
  getObjectPageByOrder,
} from "../model/selectors";
import { EventClickProps } from "../model/types";

interface EventItemProps {
  id: number;
  objectId: number;
  onEventClick: ({
    id,
    objectId,
    availibilityInfo,
    page,
  }: EventClickProps) => void;
}

export const EventItem: FC<EventItemProps> = (props) => {
  const { id, objectId, onEventClick } = props;

  const page = useAppSelector(getObjectPageByOrder(objectId));
  const availibilityInfo = useAppSelector(
    getObjectAvailibilityById(objectId, id)
  );

  const { name } = useAppSelector(getObject(objectId));

  const onClick = () => {
    onEventClick({
      objectId,
      id,
      page,
      availibilityInfo,
    });
  };
  return (
    <Stack
      spacing={0}
      border={"1px solid"}
      borderColor={availibilityInfo.color}
      rounded={"lg"}
      p={2}
      cursor={"pointer"}
      _hover={{
        boxShadow: "lg",
      }}
      transition={"0.3s all"}
      onClick={onClick}
    >
      <HStack alignItems={"center"}>
        <Text
          fontSize={"md"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          fontWeight={"medium"}
          color={"gray.500"}
        >
          {availibilityInfo.clientFullname || "Нет ФИО"}
        </Text>
        <Box
          h={2}
          w="60px"
          bgColor={availibilityInfo.color}
          rounded={"full"}
        ></Box>
      </HStack>
      <Text
        fontSize={"sm"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        fontWeight={"medium"}
        color={"gray.500"}
      >
        Дата заезда: {format(availibilityInfo.minDate, "y-M-d")}
      </Text>
      <Text
        fontSize={"sm"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        fontWeight={"medium"}
        color={"gray.500"}
      >
        Дата выезда: {format(availibilityInfo.maxDate, "y-M-d")}
      </Text>
      <Text
        fontSize={"sm"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        fontWeight={"medium"}
        color={"gray.500"}
      >
        Номер: {name}
      </Text>
      <Text
        fontSize={"sm"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        fontWeight={"medium"}
        color={"gray.500"}
      >
        Номер телефона:{" "}
        <Button
          as="a"
          variant={"link"}
          href={`tel:${availibilityInfo.phoneNumber}`}
        >
          {availibilityInfo.phoneNumber}
        </Button>
      </Text>
      <Textarea value={availibilityInfo.comment} />
    </Stack>
  );
};
