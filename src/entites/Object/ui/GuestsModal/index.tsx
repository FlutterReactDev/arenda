import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { guestsSchema } from "@entites/Object";
import { yupResolver } from "@hookform/resolvers/yup";
import { CollapseSelect } from "@shared/ui/CollapseSelect";
import { FC, useMemo } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { InferType } from "yup";
interface GuestsModalProps {
  onClose: () => void;
  isOpen: boolean;
  value: InferType<typeof guestsSchema>;
  onGuestsChange: (value: InferType<typeof guestsSchema>) => void;
}

export const GuestsModal: FC<GuestsModalProps> = (props) => {
  const { isOpen, onClose, onGuestsChange, value } = props;
  const ageOptions = useMemo(
    () => [
      {
        label: "до года",
        value: "0",
      },
      {
        label: "1 год",
        value: "1",
      },
      {
        label: "2 года",
        value: "2",
      },
      {
        label: "3 года",
        value: "3",
      },
      {
        label: "4 года",
        value: "4",
      },
      {
        label: "5 лет",
        value: "5",
      },
      {
        label: "6 лет",
        value: "6",
      },
      {
        label: "7 лет",
        value: "7",
      },
      {
        label: "8 лет",
        value: "8",
      },
      {
        label: "9 лет",
        value: "9",
      },
      {
        label: "10 лет",
        value: "10",
      },
      {
        label: "11 лет",
        value: "11",
      },
      {
        label: "12 лет",
        value: "12",
      },
      {
        label: "13 лет",
        value: "13",
      },
      {
        label: "14 лет",
        value: "14",
      },
      {
        label: "15 лет",
        value: "15",
      },
      {
        label: "16 лет",
        value: "16",
      },
      {
        label: "17 лет",
        value: "17",
      },
    ],
    []
  );

  const { control, handleSubmit, watch, getValues } = useForm<
    InferType<typeof guestsSchema>
  >({
    resolver: yupResolver(guestsSchema),
    defaultValues: {
      ...value,
    },
  });
  const adultsCount = watch("adultsCount");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "childrenAges",
  });

  const onSubmit = (data: InferType<typeof guestsSchema>) => {
    onGuestsChange(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleSubmit(onSubmit)}
      size={{ base: "full", sm: "full", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>Выбор гостей</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            <Divider />
            <Box>
              <HStack justifyContent={"space-between"}>
                <Stack spacing={0}>
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Взрослые
                  </Text>

                  <Text>от 18 лет</Text>
                </Stack>
                <HStack spacing={3}>
                  <Controller
                    control={control}
                    name="adultsCount"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <IconButton
                          onClick={() => {
                            console.log("dsadsa");

                            onChange(value - 1);
                          }}
                          aria-label="decrease"
                          isRound
                          isDisabled={value == 1}
                        >
                          <MinusIcon />
                        </IconButton>
                      );
                    }}
                  />

                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    {adultsCount || getValues("adultsCount")}
                  </Text>
                  <Controller
                    control={control}
                    name="adultsCount"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <IconButton
                          onClick={() => {
                            onChange(value + 1);
                          }}
                          aria-label="increase"
                          isRound
                          isDisabled={value == 100}
                        >
                          <AddIcon />
                        </IconButton>
                      );
                    }}
                  />
                </HStack>
              </HStack>
            </Box>
            <Divider />
            <Box>
              <HStack justifyContent={"space-between"}>
                <Stack spacing={0}>
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Дети
                  </Text>

                  <Text>от 0 до 17 лет</Text>
                </Stack>
                <HStack spacing={3}>
                  <IconButton
                    onClick={() => {
                      remove(fields.length - 1);
                    }}
                    aria-label="decrease"
                    isRound
                    isDisabled={fields.length == 0}
                  >
                    <MinusIcon />
                  </IconButton>

                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    {fields.length}
                  </Text>

                  <IconButton
                    onClick={() => {
                      append({
                        age: "",
                      });
                    }}
                    aria-label="increase"
                    isRound
                    isDisabled={fields.length == 10}
                  >
                    <AddIcon />
                  </IconButton>
                </HStack>
              </HStack>
              <Divider mt={4} mb={4} />
              <Stack mt={2}>
                {fields.map((item, index) => {
                  return (
                    <Controller
                      control={control}
                      name={`childrenAges.${index}.age`}
                      key={item.id}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => {
                        return (
                          <CollapseSelect
                            options={ageOptions}
                            value={value}
                            onChange={onChange}
                            onDelete={() => remove(index)}
                            errors={error?.message}
                          />
                        );
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button w="full" onClick={handleSubmit(onSubmit)} type="submit">
            Применить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
