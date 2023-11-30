import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

import { CalendarIcon } from "@chakra-ui/icons";
import { SearchAvailibilityRoomsForm } from "./SearchAvailibilityRoomsForm";

export const SearchAvailibilityRoomsBtn = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} leftIcon={<CalendarIcon />}>
        Найти свободные на даты
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["full", "md", "md"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Найти свободные комнаты</ModalHeader>
          <ModalCloseButton />
          <SearchAvailibilityRoomsForm onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
