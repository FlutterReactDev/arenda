import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Image as ChakraImage,
  Text,
  Stack,
  SlideFade,
  Center,
} from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";

interface UploadImageProps {
  onDelete: (value: number) => void;
  id: number;
  openFileLoader: () => void;
  isMain: boolean;
  file: File;
}

const MemoImage: FC<{ file: File }> = memo((props) => {
  const { file } = props;
  return (
    <ChakraImage
      rounded={"lg"}
      src={URL.createObjectURL(file)}
      objectFit={"cover"}
      h="full"
      w={"full"}
    />
  );
});

export const UploadImage: FC<UploadImageProps> = memo((props) => {
  const { onDelete, id, openFileLoader, isMain, file } = props;

  const [hover, setHover] = useState(false);
  const [isLowResolution, setIsLowResolution] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.naturalWidth < 600 && img.naturalHeight < 600) {
        setIsLowResolution(true);
      } else {
        setIsLowResolution(false);
      }
    };
  }, [file]);
  const onHover = () => {
    setHover(true);
  };
  const onHoverOut = () => {
    setHover(false);
  };

  const onClick = () => {
    onDelete(id);
  };

  return (
    <Box
      position={"relative"}
      width={"full"}
      height={"40"}
      rounded={"lg"}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      cursor={"pointer"}
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
      <Box
        position={"absolute"}
        left={0}
        bottom={0}
        width={"full"}
        roundedBottom={"lg"}
        overflow={"hidden"}
        zIndex={!isLowResolution && hover ? "base" : "hide"}
      >
        <SlideFade
          transition={{
            exit: { delay: 0, duration: 0.1, ease: "linear" },
            enter: { delay: 0, duration: 0.1, ease: "linear" },
          }}
          in={!isLowResolution && hover}
        >
          <Box bgColor={"blackAlpha.600"} roundedBottom={"lg"} w={"full"}>
            <Center w={"full"} p={2}>
              <IconButton
                aria-label="edit image"
                colorScheme="red"
                size={"sm"}
                rounded={"full"}
              >
                <EditIcon />
              </IconButton>
            </Center>
          </Box>
        </SlideFade>
      </Box>

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
