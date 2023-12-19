import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Image as ChakraImage,
  Fade,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Loader } from "@shared/ui/Loader";
import { FC, memo, useEffect, useState } from "react";

interface UploadImageProps {
  onDelete: (value: number) => void;
  id: number;
  openFileLoader: () => void;
  isMain: boolean;
  file: File;
  cursor?: string;
}

const MemoImage: FC<{ file: File }> = memo((props) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const { file } = props;

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  });

  if (image == null) {
    return <Loader />;
  }
  return (
    <ChakraImage
      rounded={"lg"}
      src={image as string}
      objectFit={"cover"}
      h="full"
      w={"full"}
    />
  );
});

export const UploadImage: FC<UploadImageProps> = memo((props) => {
  const { onDelete, id, openFileLoader, isMain, file, cursor } = props;

  const [isLowResolution, setIsLowResolution] = useState(false);

  useEffect(() => {
    const fileReader = new FileReader();
    const img = new Image();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.result) {
        img.src = fileReader.result as string;
      }
    };

    img.onload = () => {
      if (img.naturalWidth < 600 && img.naturalHeight < 600) {
        setIsLowResolution(true);
      } else {
        setIsLowResolution(false);
      }
    };
  }, [file]);

  const onClick = () => {
    onDelete(id);
  };

  return (
    <Box
      cursor={cursor}
      position={"relative"}
      width={"full"}
      height={"40"}
      rounded={"lg"}
    >
      <MemoImage file={file} />
      <IconButton
        position={"absolute"}
        aria-label="delete image"
        size={"xs"}
        onClick={onClick}
        top={0}
        right={0}
        colorScheme="red"
        rounded={"full"}
        transform={"translate(50%,-50%)"}
        zIndex={"docked"}
      >
        <CloseIcon />
      </IconButton>
      <Fade in={isLowResolution}>
        <Box
          w={"full"}
          h="full"
          rounded={"lg"}
          position={"absolute"}
          bgColor={"blackAlpha.700"}
          top={0}
          left={0}
          transition={"all 0.3s"}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            w={"full"}
            height={"full"}
            p={1}
          >
            <Text color="red" textAlign={"center"} fontWeight={"medium"}>
              Плохое качество. Загрузите фото не менее 600x600px
            </Text>
            <Button
              colorScheme="gray"
              size={"sm"}
              onClick={() => {
                openFileLoader();
                onDelete(id);
              }}
            >
              Загрузить другую
            </Button>
          </Stack>
        </Box>
      </Fade>

      {isMain && (
        <Badge
          position={"absolute"}
          top={0}
          left={"2"}
          transform={"translateY(-50%)"}
          rounded={"full"}
          padding={"2"}
          colorScheme="red"
        >
          Главный
        </Badge>
      )}
    </Box>
  );
});
