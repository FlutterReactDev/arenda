import { CloseIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
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
  Tooltip,
} from "@chakra-ui/react";
import { BedType } from "@entites/CommonReference/model/types";
import {
  GeneralInformationSchemaType,
  generalInformationSchema,
} from "@entites/Object/model/schemas/generalInformationSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormCard } from "@shared/ui/FormCard";
import { FC, useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { InferType } from "yup";
interface GeneralInformationFormProps {
  value: GeneralInformationSchemaType;
  onChange: (value: GeneralInformationSchemaType) => void;
  bedTypes: BedType[];
}
const GeneralInformationForm: FC<FormProps & GeneralInformationFormProps> = (
  props
) => {
  const { navigation, onNext, onChange, value, bedTypes } = props;

  const {
    control,
    handleSubmit,
    formState: { defaultValues, errors },
    register,
    trigger,
    setValue,
  } = useForm<GeneralInformationSchemaType>({
    resolver: yupResolver(generalInformationSchema),
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
  const floors = useWatch({ control, name: "floor" });
  const floorInHouse = useWatch({ control, name: "floorsInTheBuilding" });
  const roomsCount = useWatch({ control, name: "count" });
  const numberOfIsolatedBedrooms = useWatch({
    control,
    name: "numberOfIsolatedBedrooms",
  });

  useEffect(() => {
    console.log(typeAndCountBeds.map((field) => Number(field.type)));

    setValidOptions([
      ...new Set(typeAndCountBeds.map((field) => Number(field.type))),
    ]);
  }, [typeAndCountBeds]);

  useEffect(() => {
    if (floors == "basement") {
      setValue("elevator", false);
      setValue("attic", false);
    }

    if (Number(floorInHouse) < 3) {
      setValue("elevator", false);
    }
    if (Number(floors) != floorInHouse) {
      setValue("attic", false);
    }

    if (floors && floorInHouse) {
      trigger("floorsInTheBuilding");
    }
  }, [floors, setValue, trigger, floorInHouse]);
  useEffect(() => {
    if (roomsCount && numberOfIsolatedBedrooms != undefined) {
      trigger("numberOfIsolatedBedrooms");
    }
  }, [roomsCount, trigger, numberOfIsolatedBedrooms]);

  const onSubmit = (data: InferType<typeof generalInformationSchema>) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Общие сведения">
          <Stack spacing={2}>
            <FormControl maxW="220px" isInvalid={!!errors.area?.message}>
              <FormLabel>Площадь</FormLabel>
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
              <FormControl maxW="50%" isInvalid={!!errors.floor?.message}>
                <FormLabel>Этаж</FormLabel>
                <Select {...register("floor")} placeholder="Выберите этаж">
                  <option value="basement">цокольный</option>
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
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                  <option value="91">91</option>
                  <option value="92">92</option>
                  <option value="93">93</option>
                  <option value="94">94</option>
                  <option value="95">95</option>
                  <option value="96">96</option>
                  <option value="97">97</option>
                  <option value="98">98</option>
                  <option value="99">99</option>
                  <option value="100">100</option>
                </Select>
                <FormErrorMessage>{errors.floor?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                maxW="50%"
                isInvalid={!!errors.floorsInTheBuilding?.message}
              >
                <FormLabel>Этажей в доме</FormLabel>
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
            {floors != "basement" && (
              <HStack>
                <FormControl maxW="50%">
                  <HStack alignItems={"center"} spacing={2}>
                    <Controller
                      control={control}
                      defaultValue={
                        defaultValues?.attic ? defaultValues?.attic : false
                      }
                      name="attic"
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <Checkbox
                            onChange={onChange}
                            colorScheme="red"
                            ref={ref}
                            isChecked={value}
                            isDisabled={!(floorInHouse == Number(floors))}
                          >
                            мансарда
                          </Checkbox>
                        );
                      }}
                    />

                    <Tooltip
                      hasArrow
                      label="Последний этаж в доме, совмещенный с крышей"
                      fontSize="md"
                    >
                      <QuestionOutlineIcon />
                    </Tooltip>
                  </HStack>
                </FormControl>
                <FormControl maxW="50%">
                  <Controller
                    control={control}
                    defaultValue={
                      defaultValues?.elevator ? defaultValues?.elevator : false
                    }
                    name="elevator"
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <Checkbox
                          onChange={onChange}
                          isChecked={value}
                          ref={ref}
                          colorScheme={"red"}
                          isDisabled={
                            floorInHouse ? Number(floorInHouse) < 3 : true
                          }
                        >
                          лифт
                        </Checkbox>
                      );
                    }}
                  />
                </FormControl>
              </HStack>
            )}

            <FormControl isInvalid={!!errors.count?.message}>
              <FormLabel>Количество комнат</FormLabel>
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
            <FormControl isInvalid={!!errors.kitchen?.message}>
              <FormLabel>Кухня</FormLabel>
              <Select {...register("kitchen")} placeholder="Выберите">
                <option value="noKitchen">без кухни</option>
                <option value="separateKitchen">отдельная кухня</option>
                <option value="kitchenLivingRoom">кухня-гостиная</option>
                <option value="kitchenZone">кухонная зона</option>
              </Select>
              <FormErrorMessage>{errors.kitchen?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.repair?.message}>
              <FormLabel>Ремонт</FormLabel>
              <Select {...register("repair")} placeholder="Выберите">
                <option value="withoutRepair">без ремонта</option>
                <option value="redecorating">косметический ремонт</option>
                <option value="europeanQualityRenovation">евроремонт</option>
                <option value="designerRenovation">дизайнерский ремонт</option>
              </Select>
              <FormErrorMessage>{errors.repair?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </FormCard>
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
                      <Select {...register(`beds.${index}.type`)}>
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
                        Number(field.type)
                      );

                      const nextOption = availableOptions.filter((option) => {
                        return !selectedTypes.includes(option);
                      });

                      append({
                        type: Number(nextOption[0]),
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

export default GeneralInformationForm;
