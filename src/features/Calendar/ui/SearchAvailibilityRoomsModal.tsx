import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  HStack,
  Text,
  Button,
  Hide,
  Show,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { useSearchAvailibilityRoomsModal } from "../model/useSearchAvailibilityRoomsModal";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  getAvailibilityRooms,
  getSearchAvailibilityRoomsModal,
} from "../model/selectors";
import { ObjectInfo } from "./ObjectInfo";
import { format, setHours } from "date-fns";
import { convertToHour } from "../utils/convertToHour";
import { useSidebar } from "../model/useSidebar";
import { SidebarType } from "../model/types";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

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
                    <Hide below="sm">
                      <Stack spacing={0} fontWeight={"medium"}>
                        <HStack spacing={1}>
                          <Text>заезд:</Text>
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
                          <Text>выезд:</Text>
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
                    </Hide>
                    <Show below="sm">
                      <Tag colorScheme="green">
                        <TagLabel>Свободно</TagLabel>
                      </Tag>
                    </Show>
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
