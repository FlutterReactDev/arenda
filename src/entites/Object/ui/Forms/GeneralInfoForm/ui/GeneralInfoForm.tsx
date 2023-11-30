import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
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
import {
  GeneralInfoFormType,
  generalInfoSchema,
} from "@entites/Object/model/schemas/generalInfoSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
interface GeneralInfoForm {
  value: GeneralInfoFormType;
  onChange: (value: GeneralInfoFormType) => void;
}
const GeneralInfoForm: FC<FormProps & GeneralInfoForm> = (props) => {
  const { navigation, onChange, value } = props;

  const {
    register,
    formState: { defaultValues, errors },
    watch,
    control,
    handleSubmit,
  } = useForm<GeneralInfoFormType>({
    resolver: yupResolver(generalInfoSchema),
    defaultValues: { ...value },
  });
  const floors = watch("floor");
  const floorInHouse = watch("floorsInHouse");

  const onSubmit = (data: GeneralInfoFormType) => {
    onChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <FormControl maxW="50%" isInvalid={!!errors.floorsInHouse?.message}>
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
          {navigation}
        </Stack>
      </FormCard>
    </form>
  );
};

export default GeneralInfoForm;
