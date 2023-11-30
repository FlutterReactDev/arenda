import { CloseIcon } from "@chakra-ui/icons";
import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  IconButton,
  Center,
  Button,
} from "@chakra-ui/react";
import {
  RoomBedSchemaType,
  roomBedSchema,
} from "@entites/Object/model/schemas/roomBedSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface RoomBedFormProps {
  value: RoomBedSchemaType;
  onChange: (value: RoomBedSchemaType) => void;
  roomCount: number;
}

const RoomBedForm: FC<RoomBedFormProps & FormProps> = (props) => {
  const { onChange, roomCount, value } = props;
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(roomBedSchema),
    defaultValues: { ...value },
  });

  const availableOptions = useMemo(
    () => [
      "singleBed",
      "doubleBed",
      "doubleSofaBed",
      "doubleWideKingSize",
      "extraWideDoubleSuperKingSize",
      "bunkBed",
      "sofaBed",
    ],
    []
  );

  const [validOptions, setValidOptions] = useState<
    | "singleBed"
    | "doubleBed"
    | "doubleSofaBed"
    | "doubleWideKingSize"
    | "extraWideDoubleSuperKingSize"
    | "bunkBed"
    | "sofaBed"
  >();

  const { append, remove, fields } = useFieldArray({
    control,
    name: "typeAndCountBeds",
  });

  const typeAndCountBeds = watch("typeAndCountBeds");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setValidOptions(typeAndCountBeds.map((field) => field.bedType));
  }, [typeAndCountBeds]);

  const onSubmit = (data: RoomBedSchemaType) => {
    if (roomCount < data.numberOfIsolatedBedrooms) {
      setError("numberOfIsolatedBedrooms", {
        message: "Спален не может быть больше комнат",
      });
      return;
    }

    onChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="Вместимость и спальные места">
        <Heading size="sm" fontWeight={"normal"}>
          Укажите количество спален, каждая из которых имеет отдельный выход.
        </Heading>
        <Stack spacing={2} mt={4}>
          <FormControl isInvalid={!!errors.numberOfIsolatedBedrooms?.message}>
            <FormLabel>Количество изолированных спален</FormLabel>
            <Select
              {...register("numberOfIsolatedBedrooms")}
              placeholder="Выберите"
            >
              <option value="0">студия</option>
              <option value="1">1 спальня</option>
              <option value="2">2 спальни</option>
              <option value="3">3 спальни</option>
              <option value="4">4 спальни</option>
              <option value="5">5 спален</option>
              <option value="6">6 спален</option>
              <option value="7">7 спален</option>
              <option value="8">8 спален</option>
              <option value="9">9 спален</option>
              <option value="10">10 спален</option>
              <option value="11">11 спален</option>
              <option value="12">12 спален</option>
              <option value="13">13 спален</option>
              <option value="14">14 спален</option>
              <option value="15">15 спален</option>
              <option value="16">16 спален</option>
              <option value="17">17 спален</option>
              <option value="18">18 спален</option>
              <option value="19">19 спален</option>
              <option value="20">20 спален</option>
            </Select>
            <FormErrorMessage>
              {errors.numberOfIsolatedBedrooms?.message}
            </FormErrorMessage>
            <FormHelperText>
              Спальни с отдельным входом и дверью (проходные комнаты не
              учитываются)
            </FormHelperText>
          </FormControl>
          <Heading size="sm" fontWeight={"normal"}>
            Сколько гостей вмещает ваше жильё?
          </Heading>
          <FormControl isInvalid={!!errors.maxAdults?.message}>
            <FormLabel>Максимум гостей</FormLabel>
            <NumberInput size="lg" maxW={"48"} defaultValue={1} min={1}>
              <NumberInputField {...register("maxAdults")} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.maxAdults?.message}</FormErrorMessage>
            <FormHelperText>
              Для каждого гостя должно быть комфортное спальное место
            </FormHelperText>
          </FormControl>
          <Heading size="sm" fontWeight={"normal"}>
            Какие типы кроватей предлагаются гостям?
          </Heading>
          <FormControl>
            <FormLabel>Тип и количество кроватей</FormLabel>
            <Stack spacing={2}>
              {fields.map(({ id }, index) => {
                return (
                  <HStack justifyContent={"space-between"} key={id} spacing={2}>
                    <Select {...register(`typeAndCountBeds.${index}.bedType`)}>
                      <option
                        disabled={validOptions?.includes("singleBed")}
                        value="singleBed"
                      >
                        односпальная кровать
                      </option>
                      <option
                        disabled={validOptions?.includes("doubleBed")}
                        value="doubleBed"
                      >
                        двуспальная кровать
                      </option>
                      <option
                        disabled={validOptions?.includes("doubleSofaBed")}
                        value="doubleSofaBed"
                      >
                        двуспальный диван-кровать
                      </option>
                      <option
                        disabled={validOptions?.includes("doubleWideKingSize")}
                        value="doubleWideKingSize"
                      >
                        двуспальная широкая (king-size)
                      </option>
                      <option
                        disabled={validOptions?.includes(
                          "extraWideDoubleSuperKingSize"
                        )}
                        value="extraWideDoubleSuperKingSize"
                      >
                        особо широкая двуспальная (super-king-size)
                      </option>
                      <option
                        disabled={validOptions?.includes("bunkBed")}
                        value="bunkBed"
                      >
                        двухъярусная кровать
                      </option>
                      <option
                        disabled={validOptions?.includes("sofaBed")}
                        value="sofaBed"
                      >
                        диван-кровать
                      </option>
                    </Select>
                    <Select
                      {...register(`typeAndCountBeds.${index}.bedsCount`)}
                      maxWidth={"40"}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                    </Select>
                    {index != 0 && (
                      <IconButton
                        aria-label="close button"
                        colorScheme="gray"
                        rounded={"full"}
                        size="sm"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </HStack>
                );
              })}
              <Center>
                <Button
                  onClick={() => {
                    const selectedTypes = typeAndCountBeds.map(
                      (field) => field.bedType
                    );

                    const nextOption = availableOptions.filter((option) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      return !selectedTypes.includes(option);
                    });

                    append({
                      bedType: nextOption[0] as NonNullable<
                        | "singleBed"
                        | "doubleBed"
                        | "doubleSofaBed"
                        | "doubleWideKingSize"
                        | "extraWideDoubleSuperKingSize"
                        | "bunkBed"
                        | "sofaBed"
                        | undefined
                      >,
                      bedsCount: "1",
                    });
                  }}
                  colorScheme="red"
                  variant={"link"}
                  isDisabled={availableOptions.length == fields.length}
                >
                  + добавить ещё одну кровать
                </Button>
              </Center>
            </Stack>
          </FormControl>
        </Stack>
      </FormCard>
    </form>
  );
};

export default RoomBedForm;
