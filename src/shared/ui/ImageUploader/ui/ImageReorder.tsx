import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { FC, lazy, memo, Suspense } from "react";

interface ImageReorderProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  onDragEnd: (value: File[]) => void;
  onImageDelete: (id: number) => void;
  openFileLoader: () => void;
}
const DragComponent = lazy(() => import("./DragComponentChunk"));
export const ImageReorder: FC<ImageReorderProps> = memo((props) => {
  const { files, isOpen, onClose, onDragEnd, onImageDelete, openFileLoader } =
    props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Изменить порядок изображений</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Suspense
            fallback={
              <Center>
                <Spinner size="xl" color="red" />
              </Center>
            }
          >
            <DragComponent
              files={files}
              onDragEnd={onDragEnd}
              onImageDelete={onImageDelete}
              openFileLoader={openFileLoader}
            />
          </Suspense>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Зыкрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
