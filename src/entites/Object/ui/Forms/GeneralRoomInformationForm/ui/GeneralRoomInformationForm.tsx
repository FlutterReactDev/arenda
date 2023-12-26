import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  BedType,
  FloorType,
  RoomNameTypes,
} from "@entites/CommonReference/model/types";

import {
  GeneralRoomInformationType,
  generalRoomInformationSchema,
} from "@entites/Object/model/schemas/generalRoomInformatiomSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormCard } from "@shared/ui/FormCard";
import { FC, useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
interface GeneralRoomInformationFormProps {
  value: GeneralRoomInformationType;
  onChange: (value: GeneralRoomInformationType) => void;
  bedTypes: BedType[];
  roomNameTypes: RoomNameTypes[];
  floorTypes: FloorType[];
}
const GeneralRoomInformationForm: FC<
  FormProps & GeneralRoomInformationFormProps
> = (props) => {
  const {
    navigation,
    onNext,
    onChange,
    value,
    bedTypes,
    roomNameTypes,
    floorTypes,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<GeneralRoomInformationType>({
    resolver: yupResolver(generalRoomInformationSchema),
    mode: "onChange",
    defaultValues: {
      ...value,
    },
  });

  const availableOptions = useMemo(
    () => bedTypes.map((type) => type.value),
    [bedTypes]
  );

  const [validOptions, setValidOptions] = useState<number[]>([]);

  const { append, remove, fields } = useFieldArray({
    control,
    name: "beds",
  });

  const typeAndCountBeds = useWatch({ control, name: "beds" });

  useEffect(() => {
    setValidOptions([
      ...new Set(typeAndCountBeds?.map((field) => Number(field.bedType))),
    ]);
  }, [typeAndCountBeds]);

  const onSubmit = (data: GeneralRoomInformationType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Описание номера">
          <Stack spacing={2}>
            <FormControl isInvalid={!!errors.roomNameTypeId?.message}>
              <FormLabel>Название номера</FormLabel>
              <Select {...register("roomNameTypeId")}>
                {roomNameTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.roomNameTypeId?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.uniqueName?.message}>
              <FormLabel>Уникальное название</FormLabel>
              <InputGroup>
                <Input
                  {...register("uniqueName")}
                  placeholder="Уникальное название"
                />
              </InputGroup>
              <FormErrorMessage>{errors.uniqueName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.ownName?.message}>
              <FormLabel>Своё название (необязательно)</FormLabel>
              <InputGroup>
                <Input
                  {...register("ownName")}
                  placeholder="Своё название (необязательно)"
                />
              </InputGroup>

              <FormErrorMessage>{errors.ownName?.message}</FormErrorMessage>
              <FormHelperText>
                Можете ввести ваше собственное название этой категории (будет
                видно только вам)
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={!!errors.count?.message}>
              <FormLabel>Количество комнат в номере</FormLabel>
              <Controller
                control={control}
                name="count"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <NumberInput {...field} size="lg" maxW={32} min={1}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  );
                }}
              />
              <FormErrorMessage>{errors.count?.message}</FormErrorMessage>
              <FormHelperText>
                Только жилые комнаты — без учёта кухни, кухни-гостиной и других
                вспомогательных помещений
              </FormHelperText>
            </FormControl>
            <FormControl maxW="220px" isInvalid={!!errors.area?.message}>
              <FormLabel>Площадь номера</FormLabel>
              <InputGroup>
                <Input
                  {...register("area")}
                  type="number"
                  placeholder="Площадь"
                />
                <InputRightElement>
                  <Text>
                    м<sup>2</sup>
                  </Text>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.area?.message}</FormErrorMessage>
            </FormControl>
            <HStack alignItems={"flex-start"}>
              <FormControl maxW="50%" isInvalid={!!errors.floorType?.message}>
                <FormLabel>Этаж номера</FormLabel>
                <Select {...register("floorType")} placeholder="Выберите этаж">
                  {floorTypes.map(({ name, value }) => {
                    return <option value={value}>{name}</option>;
                  })}
                </Select>
                <FormErrorMessage>{errors.floorType?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                maxW="50%"
                isInvalid={!!errors.floorsInTheBuilding?.message}
              >
                <FormLabel>Этажей в здании</FormLabel>
                <Controller
                  control={control}
                  defaultValue={1}
                  name="floorsInTheBuilding"
                  render={({ field }) => {
                    return (
                      <NumberInput {...field} w="wull" min={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    );
                  }}
                />
                <FormErrorMessage>
                  {errors.floorsInTheBuilding?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
          </Stack>
        </FormCard>
        <FormCard title="Вместимость и спальные места">
          <Stack spacing={2}>
            <FormControl isInvalid={!!errors.maximumGuests?.message}>
              <FormLabel>Максимум гостей</FormLabel>
              <NumberInput size="lg" maxW={"48"} defaultValue={1} min={1}>
                <NumberInputField {...register("maximumGuests")} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.maximumGuests?.message}
              </FormErrorMessage>
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
                    <HStack
                      justifyContent={"space-between"}
                      key={id}
                      spacing={2}
                    >
                      <Select {...register(`beds.${index}.bedType`)}>
                        {bedTypes.map((bedType) => (
                          <option
                            disabled={validOptions.includes(
                              Number(bedType.value)
                            )}
                            value={Number(bedType.value)}
                          >
                            {bedType.name}
                          </option>
                        ))}
                      </Select>
                      <Select
                        {...register(`beds.${index}.count`)}
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
                      const selectedTypes = typeAndCountBeds.map((field) =>
                        Number(field.bedType)
                      );

                      const nextOption = availableOptions.filter((option) => {
                        return !selectedTypes.includes(option);
                      });

                      append({
                        bedType: Number(nextOption[0]),
                        count: 1,
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
        <FormCard title="Ванная комната">
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>количество ванных комнат с туалетом</FormLabel>
              <NumberInput size="lg" maxW={"48"} defaultValue={0} min={0}>
                <NumberInputField
                  {...register("numberOfBathroomsWithToilet")}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                Ванная комната с душем / ванной, совмещенная с туалетом
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>количество ванных комнат без туалета</FormLabel>
              <NumberInput size="lg" maxW={"48"} defaultValue={0} min={0}>
                <NumberInputField
                  {...register("numberOfBathroomsWithOutToilet")}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                Ванная комната с душем / ванной без туалета
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>количество отдельных туалетов</FormLabel>
              <NumberInput size="lg" maxW={"48"} defaultValue={0} min={0}>
                <NumberInputField {...register("numberOfSeparateToilets")} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>Туалет с раковиной или без</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Удобства ванных комнат</FormLabel>
              <HStack flexWrap={"wrap"}>
                <Controller
                  control={control}
                  name="bidet"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        биде
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="bath"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        ванна
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="hygienicShower"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        гигиенический душ
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="additionalBathroom"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        дополнительная ванная
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="additionalToilet"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        дополнительный туалет
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="shower"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        душ
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="sharedBathroom"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        общая ванная комната
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="sharedToilet"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        общий туалет
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="towels"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        полотенца
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="sauna"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        сауна
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="slippers"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        тапочки
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="toiletries"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        туалетные принадлежности
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="hairDryer"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        фен
                      </Checkbox>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="robe"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        халат
                      </Checkbox>
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="sharedShowerRoom"
                  render={({
                    field: { name, onBlur, onChange, ref, value, disabled },
                  }) => {
                    return (
                      <Checkbox
                        onChange={onChange}
                        isChecked={!!value}
                        name={name}
                        onBlur={onBlur}
                        ref={ref}
                        disabled={disabled}
                        colorScheme="red"
                        minW="49%"
                      >
                        общий душ/душевая
                      </Checkbox>
                    );
                  }}
                />
              </HStack>
            </FormControl>
          </Stack>
        </FormCard>

        {navigation}
      </Stack>
    </Box>
  );
};

export default GeneralRoomInformationForm;
