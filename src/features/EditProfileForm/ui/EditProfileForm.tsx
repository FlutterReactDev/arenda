import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AddPhoneForm, PhonesList } from "@entites/Phone";
import { Gender, PhoneSchema, useUser } from "@entites/User";
import { useUpdateMutation } from "@entites/User/model/api/userApi";
import {
  EditProfileSchema,
  EditProfileType,
} from "@entites/User/model/schemas/EditProfileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { useFieldArray, useForm } from "react-hook-form";

import * as Yup from "yup";
export const EditProfileForm = () => {
  const { currentUser } = useUser();
  const toast = useToast();
  const [updateUser, { isLoading }] = useUpdateMutation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<EditProfileType>({
    resolver: yupResolver(EditProfileSchema),
    mode: "onChange",
    defaultValues: {
      countryId: currentUser?.countryID,
      dateOfBirth: currentUser?.dateOfBirth
        ? new Date(Date.parse(currentUser.dateOfBirth))
        : undefined,
      email: currentUser?.email,
      gender: currentUser?.gender,
      languageID: currentUser?.languageID,
      name: currentUser?.name,
      phoneNumbers: [...(currentUser?.phoneNumbers || [])],
      surname: currentUser?.surname,
    },
  });

  const { append, fields, update, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onPhoneChange = (nextValue: string) => {
    fields.map(({ phoneNumber }, index) => {
      update(index, {
        phoneNumber,
        isMain: false,
      });
    });
    fields.map(({ phoneNumber }, index) => {
      if (phoneNumber == nextValue) {
        update(index, {
          phoneNumber,
          isMain: true,
        });
      }
    });
  };

  const onSubmit = async (data: EditProfileType) => {
    if (currentUser) {
      await updateUser({
        ...currentUser,
        ...data,
        phoneNumbers: data.phoneNumbers?.map((phone) => ({
          ...phone,
          ...(phone.isMain && { isMain: true }),
          ...(!phone.isMain && { isMain: false }),
        })),
      })
        .unwrap()
        .then(() => {
          toast({
            isClosable: true,
            duration: 3000,
            position: "top-right",
            render({ onClose }) {
              return (
                <SucessAlert
                  title="Изменение профиля"
                  description={"Изменение сохранены"}
                  onClose={onClose}
                />
              );
            },
          });
        })
        .catch(() => {
          toast({
            isClosable: true,
            duration: 3000,
            position: "top-right",
            render({ onClose }) {
              return (
                <ErrorAlert
                  title="Ошибка"
                  description={"Возникла ошибка при сохранении"}
                  onClose={onClose}
                />
              );
            },
          });
        });
    }
  };

  const onPhoneAdd = ({ phone }: Yup.InferType<typeof PhoneSchema>) => {
    if (!fields.filter((field) => field.phoneNumber == phone).length) {
      if (fields.length == 0) {
        return append({ phoneNumber: phone, isMain: true });
      }
      append({ phoneNumber: phone, isMain: false });
    }
  };

  const onPhoneDelete = (phone: string) => {
    const phoneIndex = fields.findIndex((field) => field.phoneNumber == phone);
    remove(phoneIndex);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack direction={["column", "column", "row"]}>
          <Box w={"full"}>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel>Имя</FormLabel>
              <Input placeholder="Имя" {...register("name")} type="text" />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box w={"full"}>
            <FormControl isInvalid={!!errors.surname?.message}>
              <FormLabel>Фамилия</FormLabel>
              <Input
                placeholder="Фамилия"
                {...register("surname")}
                type="text"
              />
              <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        </Stack>
        <FormControl isInvalid={!!errors.gender?.message}>
          <FormLabel>Пол</FormLabel>
          <Select {...register("gender")}>
            <option value={Gender.MALE}>Мужской</option>
            <option value={Gender.FEMALE}>Женский</option>
          </Select>
          <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.dateOfBirth?.message}>
          <FormLabel>Дата рождения</FormLabel>
          <Input
            {...register("dateOfBirth")}
            type={"date"}
            placeholder="Дата рождения"
          />
        </FormControl>
        <FormControl isInvalid={!!errors.countryId?.message}>
          <FormLabel>Страна</FormLabel>
          <Select placeholder="Укажите страну" {...register("countryId")}>
            <option value={1}>Кыргызстан</option>
          </Select>
          <FormErrorMessage>{errors.countryId?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.languageID?.message}>
          <FormLabel>Язык</FormLabel>
          <Select {...register("languageID")}>
            <option value={1}>Кыргысзкий</option>
          </Select>
          <FormErrorMessage>{errors.languageID?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>E-mail</FormLabel>
          <Input
            placeholder="Укажите почту"
            {...register("email")}
            type={"email"}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phoneNumbers?.message}>
          <FormLabel>Номера телефонов</FormLabel>
          {fields.length != 0 && (
            <PhonesList
              fields={fields}
              onDelete={onPhoneDelete}
              onChange={onPhoneChange}
            />
          )}

          <FormErrorMessage>{errors.phoneNumbers?.message}</FormErrorMessage>
          <Box mt={4}>
            <AddPhoneForm onChange={onPhoneAdd} />
          </Box>
        </FormControl>
      </Stack>
      <Button
        type="submit"
        colorScheme="red"
        isLoading={isLoading}
        isDisabled={!isDirty}
        mt={4}
        maxW={"72"}
        w="full"
      >
        Сохранить
      </Button>
    </Box>
  );
};
