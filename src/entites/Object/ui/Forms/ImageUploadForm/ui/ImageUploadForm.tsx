import {
  Box,
  Stack,
  FormControl,
  FormHelperText,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormCard } from "@shared/ui/FormCard";
import { ImageUploader } from "@shared/ui/ImageUploader";

import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { InferType } from "yup";
import { fileSchema } from "@entites/Object/model/schemas/fileSchema";
import { FormProps } from "@entites/Object";
interface ImageUploadFormProps {
  stateValue?: InferType<typeof fileSchema>;
  changeState?: (data: InferType<typeof fileSchema>) => void;
}
const ImageUploadForm: FC<FormProps & ImageUploadFormProps> = (props) => {
  const { navigation, onNext, changeState, stateValue } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InferType<typeof fileSchema>>({
    resolver: yupResolver(fileSchema),
    defaultValues: stateValue,
  });

  const onSubmit = (data: InferType<typeof fileSchema>) => {
    changeState && changeState(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Загрузите фотографии">
          <FormControl>
            <FormHelperText>
              Помните, что первое фото будут видеть ваши гости при поиске жилья.
              Перетаскивайте нужные фото для сортировки
            </FormHelperText>
            <Controller
              control={control}
              name="files"
              render={({ field: { value, onChange } }) => {
                return (
                  <ImageUploader
                    files={value as File[]}
                    onChangeFile={onChange}
                  />
                );
              }}
            />
            {errors.files?.message && (
              <Alert status="warning" mt={4}>
                <AlertIcon />
                {errors.files?.message}
              </Alert>
            )}
          </FormControl>
        </FormCard>
        {navigation}
      </Stack>
    </Box>
  );
};

export default ImageUploadForm;
