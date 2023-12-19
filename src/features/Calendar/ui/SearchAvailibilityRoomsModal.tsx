import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { format, setHours } from "date-fns";
import { calendarActions } from "..";
import {
  getAvailibilityRooms,
  getSearchAvailibilityRoomsModal,
} from "../model/selectors";
import { SidebarType } from "../model/types";
import { useSearchAvailibilityRoomsModal } from "../model/useSearchAvailibilityRoomsModal";
import { useSidebar } from "../model/useSidebar";
import { convertToHour } from "../utils/convertToHour";
import { ObjectInfo } from "./ObjectInfo";

export const SearchAvailibilityRoomsModal = () => {
  const { isOpen, onClose } = useSearchAvailibilityRoomsModal();
  const objects = useAppSelector(getAvailibilityRooms);
  const { minDate, maxDate, checkIn, checkOut } = useAppSelector(
    getSearchAvailibilityRoomsModal
  );
  const { onOpen } = useSidebar();
  const dispatch = useAppDispatch();
  const onBook = (objectId: number) => {
    if (checkIn && checkOut && minDate && maxDate) {
      dispatch(calendarActions.setRangeIn(minDate));
      dispatch(calendarActions.setRangeOut(maxDate));
      onOpen({
        type: SidebarType.BOOK,
        objectId,
        checkIn,
        checkOut,
      });
    }

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["full", "lg", "2xl"]}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Свободные номера</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={0} fontWeight={"medium"}>
            <HStack spacing={1}>
              <Text>Дата Заезд:</Text>
              <Text>
                {minDate &&
                  checkIn &&
                  format(
                    setHours(minDate, convertToHour(checkIn) || 0),
                    "dd.MM.Y H:mm"
                  )}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text>Дата выезда:</Text>
              <Text>
                {maxDate &&
                  checkOut &&
                  format(
                    setHours(maxDate, convertToHour(checkOut) || 0),
                    "dd.MM.Y H:mm"
                  )}
              </Text>
            </HStack>
          </Stack>
          <Stack w="full">
            {objects.length != 0 &&
              objects.map(({ address, id, name }) => {
                return (
                  <HStack>
                    <ObjectInfo address={address} objectId={id} name={name} />

                    <Tag colorScheme="green">
                      <TagLabel>Свободно</TagLabel>
                    </Tag>

                    <Button
                      onClick={() => onBook(id)}
                      rounded={"full"}
                      colorScheme="blue"
                    >
                      Забронировать
                    </Button>
                  </HStack>
                );
              })}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
