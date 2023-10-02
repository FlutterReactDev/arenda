import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { FC, FormEvent, useEffect, useState } from "react";
import { FormCard } from "./FormCard";
import { ImageUploader } from "@shared/ui/ImageUploader";
import { loadImage } from "@shared/ui/ImageUploader/utils";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";

interface ImageUploadProps {
  onChangeScreen(index: number): void;
}

enum ImageErrors {
  MIN_ERROR = "MIN_ERROR",
  LOW_RESOLUTION_ERROR = "LOW_RESOLUTION_ERROR",
}

export const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { onChangeScreen } = props;
  const { files: stateFiles } = useAppSelector(getForm(5, 0)) as {
    files: File[];
  };

  const [files, setFile] = useState<File[]>(stateFiles || []);
  const [imageErrors, setImageErros] = useState<ImageErrors[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isTouched) {
      const validation = async () => {
        const errors: ImageErrors[] = [];
        if (files.length < 3) {
          errors.push(ImageErrors.MIN_ERROR);
        }
        await Promise.all(
          files.map(async (file) => {
            const img = await loadImage(URL.createObjectURL(file));
            if (img.naturalHeight < 600 && img.naturalWidth < 600) {
              errors.push(ImageErrors.LOW_RESOLUTION_ERROR);
            }
          })
        );
        if (errors.length) {
          setImageErros(errors);
        }
      };
      validation();
    }
  }, [files, isTouched]);

  const onSubmit = (data: { files: File[] }) => {
    dispatch(
      addObjectAction.setForm({
        step: 0,
        screen: 5,
        data,
      })
    );
    onChangeScreen(6);
  };

  const onPrev = () => {
    onChangeScreen(4);
  };

  return (
    <Box
      as="form"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsTouched(true);
        const errors: ImageErrors[] = [];
        if (files.length < 3) {
          errors.push(ImageErrors.MIN_ERROR);
        }

        await Promise.all(
          files.map(async (file) => {
            const img = await loadImage(URL.createObjectURL(file));
            if (img.naturalHeight < 600 && img.naturalWidth < 600) {
              errors.push(ImageErrors.LOW_RESOLUTION_ERROR);
              return;
            }
          })
        );

        if (errors.length) {
          setImageErros(errors);
          return;
        }

        onSubmit({
          files,
        });
      }}
    >
      <Stack spacing={2}>
        <FormCard title="Загрузите фотографии">
          <FormControl>
            <FormHelperText>
              Помните, что первое фото будут видеть ваши гости при поиске жилья.
              Перетаскивайте нужные фото для сортировки
            </FormHelperText>
            <ImageUploader
              errors={
                <>
                  {imageErrors.includes(ImageErrors.MIN_ERROR) && (
                    <Alert status="warning">
                      <AlertIcon />
                      Загрузите минимум 3 разных фотографии вашего объекта
                    </Alert>
                  )}
                  {imageErrors.includes(ImageErrors.LOW_RESOLUTION_ERROR) && (
                    <Alert status="warning">
                      <AlertIcon />
                      Одна или несколько картинок имеют плохое качество
                    </Alert>
                  )}
                </>
              }
              files={files}
              onChangeFile={setFile}
            />
          </FormControl>
        </FormCard>
        <FormCard>
          <Center w="full">
            <HStack w="full" justifyContent={"space-between"} px={2}>
              <Button onClick={onPrev} colorScheme="gray" variant="outline">
                Назад
              </Button>
              <Button colorScheme="red" type="submit">
                Продолжить
              </Button>
            </HStack>
          </Center>
        </FormCard>
      </Stack>
    </Box>
  );
};
