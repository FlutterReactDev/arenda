import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Skeleton,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  useGetInternetAccessQuery,
  useGetParkingQuery,
  useGetPaymentTypeQuery,
  useGetSmokingOnSiteQuery,
  useGetAdditionalServiceQuery,
  useGetFoodTypeQuery,
  useGetReportingDocumentTypeQuery,
  useGetObjectStarRatingQuery,
  useGetMealServiceTypesQuery,
} from "@entites/CommonReference";

import {
  HotelGeneralInformationType,
  hotelGeneralInformationSchema,
} from "@entites/Object/model/schemas/hotelGeneralInformationSchema";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { generateYearsBetween } from "@shared/utils/generateYearsBetween";
import { getYear, subYears } from "date-fns";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { InferType } from "yup";
import { getDeclension } from "@shared/utils/getDeclension";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import {
  AdditionalServices,
  FoodType,
  InternetAccess,
  Parking,
} from "@entites/Object/model/types/createObjectTypes";

interface HotelGeneralInformationFormProps {
  stateValue: HotelGeneralInformationType;
  changeState?: (data: HotelGeneralInformationType) => void;
  objectTypeName: string;
}
const HotelGeneralInformationForm: FC<
  FormProps & HotelGeneralInformationFormProps
> = (props) => {
  const { navigation, onNext, changeState, stateValue, objectTypeName } = props;

  const {
    data: parking,
    isFetching: parkingIsLoading,
    isSuccess: parkingIsSuccess,
  } = useGetParkingQuery("");
  const {
    data: internetAccess,
    isFetching: internetAccessIsLoading,
    isSuccess: internetAccessIsSuccess,
  } = useGetInternetAccessQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: smokingOnSite,
    isFetching: smokingOnSiteIsLoading,
    isSuccess: smokingOnSiteIsSuccess,
  } = useGetSmokingOnSiteQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: paymentType,
    isFetching: paymentTypeIsLoading,
    isSuccess: paymentTypeIsSuccess,
  } = useGetPaymentTypeQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: foodType,
    isFetching: foodTypeIsLoading,
    isSuccess: foodTypeIsSuccess,
  } = useGetFoodTypeQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: additionalService,
    isFetching: additionalServiceIsLoading,
    isSuccess: additionalServiceIsSuccess,
  } = useGetAdditionalServiceQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: reportingDocumentTypes,
    isFetching: reportingDocumentTypesIsLoading,
    isSuccess: reportingDocumentTypesIsSuccess,
  } = useGetReportingDocumentTypeQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: objectStarRating,
    isFetching: objectStarRatingIsLoading,
    isSuccess: objectStarRatingIsSuccess,
  } = useGetObjectStarRatingQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: mealServiceTypes,
    isFetching: mealServiceTypesIsLoading,
    isSuccess: mealServiceTypesIsSuccesss,
  } = useGetMealServiceTypesQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HotelGeneralInformationType>({
    resolver: yupResolver(hotelGeneralInformationSchema),
    defaultValues: {
      ...stateValue,
      internetAccess: stateValue.internetAccess || undefined,
      parking: stateValue.parking || undefined,
      anObjectDetail: {
        ...stateValue.anObjectDetail,
        yearOfConstruntion:
          stateValue.anObjectDetail.yearOfConstruntion || undefined,
        smokingOnSite: stateValue.anObjectDetail.smokingOnSite || undefined,
        paymentType: stateValue.anObjectDetail.paymentType || undefined,
      },
      anObjectMeal: {
        ...stateValue.anObjectMeal,
        breakfast: stateValue.anObjectMeal.breakfast || undefined,
        lunch: stateValue.anObjectMeal.lunch || undefined,
        dinner: stateValue.anObjectMeal.dinner || undefined,
      },
      anObjectFeeAdditionalService: {
        ...stateValue.anObjectFeeAdditionalService,
        cleaning: stateValue.anObjectFeeAdditionalService.cleaning || undefined,
        bedLinen: stateValue.anObjectFeeAdditionalService.bedLinen || undefined,
        reportingDocuments:
          stateValue.anObjectFeeAdditionalService.reportingDocuments ||
          undefined,
      },
    },
  });

  const hasTransfer = watch("anObjectFeeAdditionalService.hasTransfer");
  const allInclusive = watch("anObjectMeal.allInclusive");
  const cleaning = watch("anObjectFeeAdditionalService.cleaning");
  const bedLinen = watch("anObjectFeeAdditionalService.bedLinen");
  const internetAccessForm = watch("internetAccess");
  const parkingForm = watch("parking");

  const breakfast = watch("anObjectMeal.breakfast");
  const dinner = watch("anObjectMeal.dinner");
  const lunch = watch("anObjectMeal.lunch");
  const onSubmit = (data: InferType<typeof hotelGeneralInformationSchema>) => {
    changeState && changeState(data);
    onNext && onNext();
  };

  console.log(errors);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title={`Название ${getDeclension(objectTypeName, "р")}`}>
          <FormControl isInvalid={!!errors.name?.message}>
            <Input
              {...register("name")}
              placeholder={`Укажите название ${getDeclension(
                objectTypeName,
                "р"
              )}`}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            <FormHelperText>
              это название будут видеть гости при поиске (если у вас нет
              названия, можете указать название улицы, номер дома)
            </FormHelperText>
          </FormControl>
        </FormCard>
        <FormCard title="Категория">
          <FormControl isInvalid={!!errors.rating?.message}>
            <FormHelperText>
              Укажите количество звёзд, присвоенных вашему объекту по Системе
              классификации гостиниц и иных средств размещения. звёздность
            </FormHelperText>

            <FormLabel mt={2}>Звёздность</FormLabel>
            <Skeleton
              isLoaded={!objectStarRatingIsLoading && objectStarRatingIsSuccess}
            >
              <Select {...register("rating")} placeholder="Выберите">
                {objectStarRating &&
                  objectStarRating.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
              </Select>
            </Skeleton>

            <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
          </FormControl>
        </FormCard>
        <FormCard title="Интернет">
          <FormControl isInvalid={!!errors.internetAccess?.message}>
            <FormHelperText>
              Услуга, на которую чаще всего обращают внимание гости при поиске
              жилья
            </FormHelperText>
            <FormLabel mt={2}>Доступ к интернету</FormLabel>
            <Skeleton
              isLoaded={!internetAccessIsLoading && internetAccessIsSuccess}
            >
              <Select placeholder="выберите" {...register("internetAccess")}>
                {internetAccess &&
                  internetAccess.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
              </Select>
            </Skeleton>
            {internetAccessForm == InternetAccess.PAID && (
              <FormControl
                isInvalid={!!errors.internetAccessSumm?.message}
                mt={2}
              >
                <FormLabel>сколько стоит интернет</FormLabel>
                <InputGroup>
                  <Input
                    {...register("internetAccessSumm")}
                    placeholder="сколько стоит интернет"
                    type="number"
                  />
                  <InputRightElement>
                    {getCurrencySymbol("ru-RU", "KGS")}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {!!errors.internetAccessSumm?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <FormErrorMessage>
              {errors.internetAccess?.message}
            </FormErrorMessage>
          </FormControl>
        </FormCard>
        <FormCard title="Парковка">
          <FormControl isInvalid={!!errors.parking?.message}>
            <FormLabel>парковка для гостей</FormLabel>
            <Skeleton
              height="35px"
              isLoaded={!parkingIsLoading && parkingIsSuccess}
            >
              <Select placeholder="выберите" {...register("parking")}>
                {parking &&
                  parking.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
              </Select>
            </Skeleton>
            {parkingForm == Parking.PAID && (
              <FormControl isInvalid={!!errors.parkingSumm?.message} mt={2}>
                <FormLabel>сколько стоит парковка</FormLabel>
                <InputGroup>
                  <Input
                    {...register("parkingSumm")}
                    placeholder="сколько стоит паковка"
                    type="number"
                  />
                  <InputRightElement>
                    {getCurrencySymbol("ru-RU", "KGS")}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {!!errors.parkingSumm?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <FormErrorMessage>{errors.parking?.message}</FormErrorMessage>
          </FormControl>
        </FormCard>
        <FormCard title="Сведения">
          <Stack spacing={3}>
            <FormControl
              isInvalid={!!errors.anObjectDetail?.yearOfConstruntion?.message}
            >
              <FormLabel>Год постройки</FormLabel>
              <Select
                placeholder="Выберите год постройки"
                {...register("anObjectDetail.yearOfConstruntion")}
              >
                {generateYearsBetween(getYear(subYears(new Date(), 100)))
                  .reverse()
                  .map((year) => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
              </Select>
              <FormErrorMessage>
                {errors.anObjectDetail?.yearOfConstruntion?.message}
              </FormErrorMessage>
            </FormControl>
            <HStack alignItems={"flex-start"}>
              <FormControl
                isInvalid={!!errors.anObjectDetail?.numberOfRooms?.message}
              >
                <FormLabel>Количество номеров</FormLabel>
                <Input
                  type="number"
                  placeholder="Количество номеров"
                  {...register("anObjectDetail.numberOfRooms")}
                />
                <FormErrorMessage>
                  {errors.anObjectDetail?.numberOfRooms?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.anObjectDetail?.areaOfTheLand?.message}
              >
                <FormLabel>Площадь территории</FormLabel>
                <InputGroup>
                  <Input
                    {...register("anObjectDetail.areaOfTheLand")}
                    type="number"
                    placeholder="Площадь"
                  />
                  <InputRightElement>
                    <Text>
                      м<sup>2</sup>
                    </Text>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.anObjectDetail?.areaOfTheLand?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl
                isInvalid={!!errors.anObjectDetail?.checkInAfter?.message}
              >
                <FormLabel>заезд после</FormLabel>
                <Select
                  {...register("anObjectDetail.checkInAfter")}
                  defaultValue={"14:00"}
                >
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </Select>
                <FormErrorMessage>
                  {errors.anObjectDetail?.checkInAfter?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.anObjectDetail?.checkOutAfter?.message}
              >
                <FormLabel>отъезд до</FormLabel>
                <Select
                  {...register("anObjectDetail.checkOutAfter")}
                  defaultValue={"12:00"}
                >
                  <option value="00:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </Select>
                <FormErrorMessage>
                  {errors.anObjectDetail?.checkOutAfter?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl
              isInvalid={!!errors.anObjectDetail?.smokingOnSite?.message}
            >
              <FormLabel>Курение на территории</FormLabel>

              <Skeleton
                height="35px"
                isLoaded={!smokingOnSiteIsLoading && smokingOnSiteIsSuccess}
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectDetail.smokingOnSite")}
                >
                  {smokingOnSite &&
                    smokingOnSite.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
              <FormErrorMessage>
                {errors.anObjectDetail?.smokingOnSite?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.anObjectDetail?.paymentType?.message}
            >
              <FormLabel>Принимаемая оплата</FormLabel>

              <Skeleton
                height="35px"
                isLoaded={!paymentTypeIsLoading && paymentTypeIsSuccess}
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectDetail.paymentType")}
                >
                  {paymentType &&
                    paymentType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
              <FormErrorMessage>
                {errors.anObjectDetail?.paymentType?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard title="Удобства и услуги">
          <HStack flexWrap={"wrap"} mt={4}>
            <Controller
              control={control}
              name="anObjectAdditionalComfort.restaurant"
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
                    ресторан
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.barCounter"
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
                    барная стойка
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.sauna"
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
              name="anObjectAdditionalComfort.garden"
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
                    сад
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.spaCenter"
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
                    спа-центр
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.tennisCourt"
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
                    теннисный корт
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.aquapark"
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
                    аквапарк
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.indoorPool"
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
                    крытый бассейн
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.privateBeach"
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
                    собственный пляж
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.elevator"
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
                    лифт
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.childrenSwimmingPool"
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
                    детский бассейн
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.roomDelivery"
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
                    доставка в номер
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.twentyFourhourFrontDesk"
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
                    круглосуточная стойка регистрации
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.gym"
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
                    фитнес-зал
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.terrace"
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
                    терраса
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.footballField"
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
                    футбольное поле
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.golf"
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
                    гольф
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.openPool"
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
                    открытый бассейн
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.jacuzzi"
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
                    джакузи
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.playground"
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
                    игровая площадка
                  </Checkbox>
                );
              }}
            />
            <Controller
              control={control}
              name="anObjectAdditionalComfort.ramp"
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
                    пандус
                  </Checkbox>
                );
              }}
            />
          </HStack>
        </FormCard>
        <FormCard title="Питание">
          <Text color={"gray.600"} fontSize={"sm"}>
            Информация о питании появится во всех категориях номеров
          </Text>
          <Stack spacing={2} mt={2}>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>всё включено</FormLabel>
                <Switch
                  {...register("anObjectMeal.allInclusive")}
                  colorScheme="red"
                />
              </HStack>
            </FormControl>
            {!allInclusive && (
              <>
                <FormControl
                  isInvalid={!!errors.anObjectMeal?.breakfast?.message}
                >
                  <FormLabel>завтрак</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeal.breakfast")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>

                  {breakfast && breakfast != FoodType.NOT_PROVIDING && (
                    <FormControl
                      isInvalid={
                        !!errors.anObjectMeal?.breakfastService?.message
                      }
                      mt={4}
                    >
                      <Skeleton
                        height="35px"
                        isLoaded={
                          !mealServiceTypesIsLoading &&
                          mealServiceTypesIsSuccesss
                        }
                      >
                        <Select
                          placeholder="выберите"
                          {...register("anObjectMeal.breakfastService")}
                        >
                          {mealServiceTypes &&
                            mealServiceTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                        </Select>
                      </Skeleton>

                      <FormErrorMessage>
                        {errors.anObjectMeal?.breakfastService?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}

                  <FormErrorMessage>
                    {errors.anObjectMeal?.breakfast?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.anObjectMeal?.lunch?.message}>
                  <FormLabel>обед</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeal.lunch")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>
                  {lunch && lunch != FoodType.NOT_PROVIDING && (
                    <FormControl
                      isInvalid={!!errors.anObjectMeal?.lunchService?.message}
                      mt={4}
                    >
                      <Skeleton
                        height="35px"
                        isLoaded={
                          !mealServiceTypesIsLoading &&
                          mealServiceTypesIsSuccesss
                        }
                      >
                        <Select
                          placeholder="выберите"
                          {...register("anObjectMeal.lunchService")}
                        >
                          {mealServiceTypes &&
                            mealServiceTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                        </Select>
                      </Skeleton>

                      <FormErrorMessage>
                        {errors.anObjectMeal?.lunchService?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                  <FormErrorMessage>
                    {errors.anObjectMeal?.lunch?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.anObjectMeal?.dinner?.message}>
                  <FormLabel>ужин</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeal.dinner")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>
                  {dinner && dinner != FoodType.NOT_PROVIDING && (
                    <FormControl
                      isInvalid={!!errors.anObjectMeal?.dinnerService?.message}
                      mt={4}
                    >
                      <Skeleton
                        height="35px"
                        isLoaded={
                          !mealServiceTypesIsLoading &&
                          mealServiceTypesIsSuccesss
                        }
                      >
                        <Select
                          placeholder="выберите"
                          {...register("anObjectMeal.dinnerService")}
                        >
                          {mealServiceTypes &&
                            mealServiceTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                        </Select>
                      </Skeleton>

                      <FormErrorMessage>
                        {errors.anObjectMeal?.dinnerService?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                  <FormErrorMessage>
                    {errors.anObjectMeal?.dinner?.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            )}
          </Stack>
        </FormCard>
        <FormCard title="Плата за дополнительные услуги">
          <Alert status="info">
            <AlertIcon />
            <Text fontSize={"small"}>
              Это дополнительные услуги, их можно предоставить только по запросу
              гостя или с его согласия. Стоимость этих услуг не включается в
              расчёт общей цены при бронировании. Если у вас есть обязательная
              платная уборка, укажите её стоимость при редактировании категории
              номера.
            </Text>
          </Alert>

          <Stack spacing={3} mt={2}>
            <FormControl
              isInvalid={
                !!errors.anObjectFeeAdditionalService?.cleaning?.message
              }
            >
              <FormLabel>Уборка</FormLabel>
              <Skeleton
                height="35px"
                isLoaded={
                  !additionalServiceIsLoading && additionalServiceIsSuccess
                }
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectFeeAdditionalService.cleaning")}
                >
                  {additionalService &&
                    additionalService.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
              {cleaning == AdditionalServices.PAID && (
                <FormControl
                  isInvalid={
                    !!errors.anObjectFeeAdditionalService?.cleaningSum?.message
                  }
                  mt={2}
                >
                  <FormLabel>сколько стоит уборка</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("anObjectFeeAdditionalService.cleaningSum")}
                      placeholder="сколько стоит уборка"
                      type="number"
                    />
                    <InputRightElement>
                      {getCurrencySymbol("ru-RU", "KGS")}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.anObjectFeeAdditionalService?.cleaningSum?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              <FormErrorMessage>
                {errors.anObjectFeeAdditionalService?.cleaning?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                !!errors.anObjectFeeAdditionalService?.bedLinen?.message
              }
            >
              <FormLabel>Постельное бельё</FormLabel>
              <Skeleton
                height="35px"
                isLoaded={
                  !additionalServiceIsLoading && additionalServiceIsSuccess
                }
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectFeeAdditionalService.bedLinen")}
                >
                  {additionalService &&
                    additionalService.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
              {bedLinen == AdditionalServices.PAID && (
                <FormControl
                  isInvalid={
                    !!errors.anObjectFeeAdditionalService?.bedLinenSum?.message
                  }
                  mt={2}
                >
                  <FormLabel>стоимость комплекта белья</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("anObjectFeeAdditionalService.bedLinenSum")}
                      placeholder="стоимость комплекта белья"
                      type="number"
                    />
                    <InputRightElement>
                      {getCurrencySymbol("ru-RU", "KGS")}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.anObjectFeeAdditionalService?.bedLinenSum?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              <FormErrorMessage>
                {errors.anObjectFeeAdditionalService?.bedLinen?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.anObjectFeeAdditionalService?.reportingDocuments
                  ?.message
              }
            >
              <FormLabel>Отчётные документы</FormLabel>
              <Skeleton
                height="35px"
                isLoaded={
                  !reportingDocumentTypesIsLoading &&
                  reportingDocumentTypesIsSuccess
                }
              >
                <Select
                  placeholder="выберите"
                  {...register(
                    "anObjectFeeAdditionalService.reportingDocuments"
                  )}
                >
                  {reportingDocumentTypes &&
                    reportingDocumentTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
              <FormErrorMessage>
                {
                  errors.anObjectFeeAdditionalService?.reportingDocuments
                    ?.message
                }
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard title="Трансфер">
          <Alert status="info">
            <AlertIcon />
            <Text fontSize={"small"}>
              Отметьте этот пункт, если вы предоставляете гостям трансфер к
              месту проживания (например, от вокзала или аэропорта)
            </Text>
          </Alert>
          <Stack mt={2} spacing={2}>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>Предоставляется трансфер</FormLabel>
                <Switch
                  {...register("anObjectFeeAdditionalService.hasTransfer")}
                  colorScheme="red"
                />
              </HStack>
            </FormControl>
            {hasTransfer && (
              <FormControl
                isInvalid={
                  !!errors?.anObjectFeeAdditionalService?.transferDetails
                    ?.message
                }
              >
                <Textarea
                  {...register("anObjectFeeAdditionalService.transferDetails")}
                  placeholder="Опишите условия предоставления трансфера"
                />
                <FormErrorMessage>
                  {
                    errors?.anObjectFeeAdditionalService?.transferDetails
                      ?.message
                  }
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        </FormCard>
        <FormCard title="Подробное описание">
          <Textarea
            {...register("anObjectFeeAdditionalService.detailComment")}
            placeholder="Здесь можно рассказать об объекте подробнее (кроме той информации, которую вы указали выше)"
          />
        </FormCard>
        <FormCard title="Ваш объект на других ресурсах">
          <Text color={"gray.600"} fontSize={"sm"}>
            Укажите ссылки на ваш объект на других ресурсах, мы можем
            использовать некоторую информацию оттуда о вашем объекте
          </Text>
          <Textarea
            placeholder="укажите ссылки на ваш объект размещения, каждую на новой строке"
            mt={2}
            {...register(
              "anObjectFeeAdditionalService.objectInAnotherResources"
            )}
          />
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default HotelGeneralInformationForm;
