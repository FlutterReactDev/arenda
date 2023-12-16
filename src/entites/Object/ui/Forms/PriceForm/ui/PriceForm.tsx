import { CheckIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import { Currency } from "@entites/CommonReference/model/types";
import {
  PriceFormType,
  priceSchema,
} from "@entites/Object/model/schemas/priceSchema";
import { FormCard } from "@shared/ui/FormCard";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormProps } from "@entites/Object/model/types/objectTypes";
interface PriceFormProps {
  value: PriceFormType;
  onChange: (value: PriceFormType) => void;
  currencies: Currency[];
}
const PriceForm: FC<FormProps & PriceFormProps> = (props) => {
  const { navigation, onNext, currencies, onChange, value } = props;

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<PriceFormType>({
    resolver: yupResolver(priceSchema),
    defaultValues: {
      ...value,

      ...(!value?.currencyId && {
        currencyId: currencies[0].id,
      }),
    },
  });

  const onSubmit = (data: PriceFormType) => {
    onNext && onNext();
    onChange(data);
  };

  const currency = watch("currencyId") || currencies[0].id;
  const pricePerDay = watch("pricePerDay");
  const minLengthOfStay = watch("minimumLengthOfStay");
  const currencySymbol = currencies.filter((c) => c.id == currency)[0].symbol;

  const currencyFormat = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencySymbol,
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Цены">
          <Alert status="info">
            <AlertIcon />
            <Text fontSize={"small"}>
              Внимание! В этом блоке вы указываете основную цену за сутки. Она
              применяется в расчёте при отсутствии сезонных цен. После
              публикации объявления вы сможете задать цены на конкретные даты,
              месяцы и дни недели, а также закрыть любые даты в календаре
              занятости. Подробнее
            </Text>
          </Alert>
          <Stack spacing={3} mt={4}>
            <FormControl>
              <FormLabel>Валюта для расчётов</FormLabel>
              <Select {...register("currencyId")}>
                {currencies.map((currency) => (
                  <option value={currency.id}>
                    {currency.symbol} - {currency.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Минимальный срок проживания</FormLabel>
              <Select {...register("minimumLengthOfStay")}>
                <option value="1">1 сутки (рекомендуется)</option>
                <option value="2">2 суток</option>
                <option value="3">3 суток</option>
                <option value="4">4 суток</option>
                <option value="5">5 суток</option>
                <option value="6">6 суток</option>
                <option value="7">7 суток</option>
                <option value="8">8 суток</option>
                <option value="9">9 суток</option>
                <option value="10">10 суток</option>
                <option value="11">11 суток</option>
                <option value="12">12 суток</option>
                <option value="13">13 суток</option>
                <option value="14">14 суток</option>
                <option value="15">15 суток</option>
                <option value="16">16 суток</option>
                <option value="17">17 суток</option>
                <option value="18">18 суток</option>
                <option value="19">19 суток</option>
                <option value="20">20 суток</option>
                <option value="21">21 сутки</option>
                <option value="22">22 суток</option>
                <option value="23">23 суток</option>
                <option value="24">24 суток</option>
                <option value="25">25 суток</option>
                <option value="26">26 суток</option>
                <option value="27">27 суток</option>
                <option value="28">28 суток</option>
                <option value="29">29 суток</option>
                <option value="30">30 суток</option>
              </Select>
              <FormHelperText>
                Это общее ограничение. В календаре занятости вы можете
                установить минимальный срок на конкретные даты
              </FormHelperText>
            </FormControl>

            <HStack alignItems={"flex-start"} flexWrap={["wrap", "nowrap"]}>
              <FormControl isInvalid={!!errors.pricePerDay?.message}>
                <FormLabel>Цена за сутки</FormLabel>
                <InputGroup>
                  <Input {...register("pricePerDay")} type="number" />
                  <InputRightElement>
                    {getCurrencySymbol("ru-RU", currencySymbol)}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.pricePerDay?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>За сколько гостей</FormLabel>
                <Select {...register("forHowManyGuests")}>
                  <option value={"1"}>1</option>
                </Select>
              </FormControl>
            </HStack>
          </Stack>
          {pricePerDay != undefined && Number(pricePerDay) != 0 && (
            <Box mt={4} p={4}>
              <Heading size={"md"} fontWeight={"medium"}>
                Пример расчёта стоимости проживания 1 чел. за {minLengthOfStay}{" "}
                суток
              </Heading>

              <Text mt={2}>
                Общая стоимость = ({currencyFormat.format(pricePerDay)}) ×{" "}
                {minLengthOfStay} суток ={" "}
                {currencyFormat.format(pricePerDay * Number(minLengthOfStay))}
              </Text>
              <Text mt={2}>
                Из них{" "}
                {currencyFormat.format(
                  (20 * (pricePerDay * Number(minLengthOfStay))) / 100
                )}{" "}
                (20 % стоимости) гость вносит в качестве предоплаты на сайте
                Turak.kg, а{" "}
                {currencyFormat.format(
                  (80 * (pricePerDay * Number(minLengthOfStay))) / 100
                )}{" "}
                вы получите от гостя при заселении.
              </Text>
              <Text mt={2}>
                Порядок расчетов, если вы работаете в качестве физ. лица:
              </Text>

              <List spacing={2} p={4}>
                <ListItem display={"flex"} alignItems={"baseline"}>
                  <ListIcon as={CheckIcon} color="red.600" />
                  <Text>
                    При бронировании гость вносит предоплату 20% от общей
                    стоимости на сайте Turak.kg. Эта сумма включает в себя
                    лицензионный платёж, который оплачивается гостем.
                  </Text>
                </ListItem>
                <ListItem display={"flex"} alignItems={"baseline"}>
                  <ListIcon as={CheckIcon} color="red.600" />
                  <Text>
                    В день заезда вы напрямую от гостя получаете оставшиеся 80%
                    от стоимости проживания.
                  </Text>
                </ListItem>
                <ListItem display={"flex"} alignItems={"baseline"}>
                  <ListIcon as={CheckIcon} color="red.600" />
                  <Text>
                    Turak.kg начисляет вам бонус, равный сумме лицензионного
                    платежа. Вы можете использовать этот бонус для поднятия
                    объявлений на сайте Turak.kg.
                  </Text>
                </ListItem>
              </List>
            </Box>
          )}
        </FormCard>

        {navigation}
      </FormContainer>
    </Box>
  );
};

export default PriceForm;
