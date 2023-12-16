import {
  Box,
  Input,
  FormHelperText,
  SimpleGrid,
  useDisclosure,
  Center,
  Icon,
} from "@chakra-ui/react";

import { UploadImage } from "./ui/UploadImage";
import {
  ChangeEvent,
  FC,
  MutableRefObject,
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { ImageReorder } from "./ui/ImageReorder";

interface ImageUploaderProps {
  files: File[];
  onChangeFile: (file: File[]) => void;
  errors?: ReactNode;
}

export const ImageUploader: FC<ImageUploaderProps> = memo((props) => {
  const { files: propsFile, onChangeFile } = props;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>(propsFile || []);

  const onImageDelete = useCallback(
    (id: number) => {
      const newFiles = files.filter((_, i) => {
        return i != id;
      });
      setFiles(newFiles);

      onChangeFile(newFiles);
    },
    [files, onChangeFile]
  );

  const openFileLoader = useCallback(() => {
    inputRef.current.click();
  }, []);

  const onDragEnd = useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;

      if (fileList) {
        const filesName = [...files, ...fileList].map(({ name }) => {
          return name;
        });

        const uniqueFiles = [...files, ...fileList].filter(
          ({ name }, index) => !filesName.includes(name, index + 1)
        );

        setFiles(uniqueFiles);
        onChangeFile(uniqueFiles);
      }
    },
    [files, onChangeFile]
  );

  return (
    <>
      <FormHelperText>
        Перетащите сюда файлы или выберите на устройстве{" "}
        <Button
          colorScheme="red"
          variant="link"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          выберите на устройстве
        </Button>
      </FormHelperText>
      <Box w="full" mt={2}>
        <Box
          borderColor="red.600"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          p={6}
          onDrop={(e) => {
            e.preventDefault();
            const fileList = e.dataTransfer.files;

            // let's convert `FileList` into a `File[]`
            if (fileList) {
              const filesName = [...files, ...fileList].map(({ name }) => {
                return name;
              });

              const uniqueFiles = [...files, ...fileList].filter(
                ({ name }, index) => !filesName.includes(name, index + 1)
              );

              setFiles(uniqueFiles);
              onChangeFile(uniqueFiles);
            }
          }}
          onDragStart={(e) => {
            e.preventDefault();
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <Box position="relative" width="100%">
            {files?.length != 0 && (
              <SimpleGrid columns={[1, 2, 3]} spacing={3}>
                {files &&
                  files.map((file, index) => {
                    return (
                      <UploadImage
                        file={file}
                        onDelete={onImageDelete}
                        id={index}
                        openFileLoader={openFileLoader}
                        isMain={index == 0}
                        key={file.name}
                      />
                    );
                  })}
              </SimpleGrid>
            )}
            {files?.length == 0 && (
              <Center
                onClick={() => {
                  inputRef.current.click();
                }}
                w={"full"}
                h="full"
                cursor={"pointer"}
              >
                <Icon as={BsFillImageFill} w={40} h={40} color={"red.600"} />
              </Center>
            )}
          </Box>
        </Box>
        {files?.length != 0 && (
          <Button colorScheme="red" mt={2} onClick={onOpen}>
            Изменить порядок
          </Button>
        )}
      </Box>

      <Input
        type="file"
        aria-hidden="true"
        multiple
        cursor={"pointer"}
        ref={inputRef}
        position={"absolute"}
        value={""}
        opacity={0}
        accept=".png, .jpg, .jpeg, .gif"
        onChange={onChange}
        zIndex={"hide"}
      />

      <ImageReorder
        files={files}
        isOpen={isOpen}
        onClose={onClose}
        onDragEnd={onDragEnd}
        onImageDelete={onImageDelete}
        openFileLoader={openFileLoader}
      />
    </>
  );
});
