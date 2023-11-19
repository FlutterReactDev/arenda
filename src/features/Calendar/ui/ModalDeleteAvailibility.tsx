import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDeleteModal } from "../model/useDeleteModal";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getObjectAvailibilityById } from "../model/selectors";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const ModalDeleteAvailibility = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onClose, availibilityId, objectId } = useDeleteModal();
  const availability = useAppSelector(
    getObjectAvailibilityById(objectId, availibilityId)
  );

  const onDelete = () => {
    if (availibilityId != undefined && objectId != undefined) {
      dispatch(
        calendarActions.deleteAvailability({
          id: availibilityId,
          objectId,
        })
      );

      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Удалить бронь</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Вы действительно хотите сделать даты с{" "}
          {availability &&
            format(availability.minDate, "d MMMM y", {
              locale: ru,
            })}{" "}
          по{" "}
          {availability &&
            format(availability.maxDate, "d MMMM y", {
              locale: ru,
            })}{" "}
          доступными для бронирования ?
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Нет
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Да
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
