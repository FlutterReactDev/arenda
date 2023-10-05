import { QuestionOutlineIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Tooltip,
  FormHelperText,
  Heading,
  IconButton,
  Center,
  Button,
  Text,
} from "@chakra-ui/react";
import { generalInformationSchema } from "@entites/Object/model/schemas/generalInformationSchema";
import { FormProps } from "@entites/Object/model/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addObjectStepActions } from "@entites/Object";

import { getForm } from "@entites/Object/model/selectors";
import { FormCard } from "@shared/ui/FormCard";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { InferType } from "yup";
const GeneralInformationForm: FC<FormProps> = (props) => {
  const { navigation, onNext } = props;
  const dispatch = useAppDispatch();
  const generalInformationData = useAppSelector(getForm(2, 0)) as InferType<
    typeof generalInformationSchema
  >;

  const {
    control,
    handleSubmit,
    formState: { defaultValues, errors },
    register,
    trigger,
    setValue,
  } = useForm<InferType<typeof generalInformationSchema>>({
    resolver: yupResolver(generalInformationSchema),
    mode: "onChange",
    defaultValues: {
      ...generalInformationData,
      typeAndCountBeds: [
        {
          bedType: "singleBed",
          bedsCount: "1",
        },
      ],
    },
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

  const [bathroomAmenities, setBathroomAmenities] = useState<string[]>(
    generalInformationData.bathroomAmenities || []
  );

  const onCheckboxChange = (option: string) => {
    if (bathroomAmenities.includes(option)) {
      return setBathroomAmenities(
        bathroomAmenities.filter((item) => item != option)
      );
    }
    setBathroomAmenities([...bathroomAmenities, option]);
  };
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

  const typeAndCountBeds = useWatch({ control, name: "typeAndCountBeds" });
  const floors = useWatch({ control, name: "floor" });
  const floorInHouse = useWatch({ control, name: "floorsInHouse" });
  const roomsCount = useWatch({ control, name: "roomsCount" });
  const numberOfIsolatedBedrooms = useWatch({
    control,
    name: "numberOfIsolatedBedrooms",
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setValidOptions(typeAndCountBeds.map((field) => field.bedType));
  }, [typeAndCountBeds]);

  useEffect(() => {
    if (floors == "basement") {
      setValue("elevator", false);
      setValue("attic", false);
    }

    if (Number(floorInHouse) < 3) {
      setValue("elevator", false);
    }
    if (floors != "2" || floorInHouse != 2) {
      setValue("attic", false);
    }

    if (floors && floorInHouse) {
      trigger("floorsInHouse");
    }
  }, [floors, setValue, trigger, floorInHouse]);
  useEffect(() => {
    if (roomsCount && numberOfIsolatedBedrooms != undefined) {
      trigger("numberOfIsolatedBedrooms");
    }
  }, [roomsCount, trigger, numberOfIsolatedBedrooms]);

  const onSubmit = (data: InferType<typeof generalInformationSchema>) => {
    dispatch(
      addObjectStepActions.setForm({
        data: {
          ...data,
          bathroomAmenities,
        },
        screen: 2,
        step: 0,
      })
    );
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Общие сведения">
          <Stack spacing={2}>
            <FormControl maxW="220px" isInvalid={!!errors.square?.message}>
              <FormLabel>Площадь</FormLabel>
              <InputGroup>
                <Input
                  {...register("square")}
                  type="number"
                  placeholder="Площадь"
                />
                <InputRightElement>
                  <Text>
                    м<sup>2</sup>
                  </Text>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.square?.message}</FormErrorMessage>
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
                isInvalid={!!errors.floorsInHouse?.message}
              >
                <FormLabel>Этажей в доме</FormLabel>
                <Controller
                  control={control}
                  defaultValue={1}
                  name="floorsInHouse"
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
                  {errors.floorsInHouse?.message}
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
                            isDisabled={!(floorInHouse == 2 && floors == "2")}
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

            <FormControl isInvalid={!!errors.roomsCount?.message}>
              <FormLabel>Количество комнат</FormLabel>
              <Controller
                control={control}
                name="roomsCount"
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
              <FormErrorMessage>{errors.roomsCount?.message}</FormErrorMessage>
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
                    <HStack
                      justifyContent={"space-between"}
                      key={id}
                      spacing={2}
                    >
                      <Select
                        {...register(`typeAndCountBeds.${index}.bedType`)}
                      >
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
                          disabled={validOptions?.includes(
                            "doubleWideKingSize"
                          )}
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
                  {...register("numberOfBathroomsWithoutToilet")}
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
                <Checkbox
                  onChange={() => onCheckboxChange("bidet")}
                  isChecked={bathroomAmenities.includes("bidet")}
                  colorScheme="red"
                  minW="49%"
                >
                  биде
                </Checkbox>
                <Checkbox
                  onChange={() => onCheckboxChange("hygienicShower")}
                  isChecked={bathroomAmenities.includes("hygienicShower")}
                  colorScheme="red"
                  minW="49%"
                >
                  гигиенический душ
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("additionalToilet")}
                  isChecked={bathroomAmenities.includes("additionalToilet")}
                >
                  дополнительный туалет
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("sharedBathroom")}
                  isChecked={bathroomAmenities.includes("sharedBathroom")}
                >
                  общая ванная комната
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("towels")}
                  isChecked={bathroomAmenities.includes("towels")}
                >
                  полотенца
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("hairdryer")}
                  isChecked={bathroomAmenities.includes("hairdryer")}
                >
                  фен
                </Checkbox>
                <Checkbox
                  onChange={() => onCheckboxChange("showerRoom")}
                  isChecked={bathroomAmenities.includes("showerRoom")}
                  colorScheme="red"
                  minW="49%"
                >
                  общий душ/душевая
                </Checkbox>
                <Checkbox
                  onChange={() => onCheckboxChange("bath")}
                  isChecked={bathroomAmenities.includes("bath")}
                  colorScheme="red"
                  minW="49%"
                >
                  ванна
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("additionalBathroom")}
                  isChecked={bathroomAmenities.includes("additionalBathroom")}
                >
                  дополнительная ванная
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("shower")}
                  isChecked={bathroomAmenities.includes("shower")}
                >
                  душ
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("sharedToilet")}
                  isChecked={bathroomAmenities.includes("sharedToilet")}
                >
                  общий туалет
                </Checkbox>
                <Checkbox
                  onChange={() => onCheckboxChange("sauna")}
                  isChecked={bathroomAmenities.includes("sauna")}
                  colorScheme="red"
                  minW="49%"
                >
                  сауна
                </Checkbox>
                <Checkbox
                  colorScheme="red"
                  minW="49%"
                  onChange={() => onCheckboxChange("toiletries")}
                  isChecked={bathroomAmenities.includes("toiletries")}
                >
                  туалетные принадлежности
                </Checkbox>
                <Checkbox
                  onChange={() => onCheckboxChange("robe")}
                  isChecked={bathroomAmenities.includes("robe")}
                  colorScheme="red"
                  minW="49%"
                >
                  халат
                </Checkbox>
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
