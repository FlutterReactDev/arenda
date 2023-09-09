import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
export const LoginModal = () => {
  return (
    <Modal isOpen onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Вход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Suspense
            fallback={
              <Center p={6}>
                <Spinner size={"xl"} />
              </Center>
            }
          >
            <LoginForm />
          </Suspense>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
