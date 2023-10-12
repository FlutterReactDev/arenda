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
} from "@entites/CommonReference";
import {
  useGetAdditionalServiceQuery,
  useGetFoodTypeQuery,
  useGetReportingDocumentTypeQuery,
} from "@entites/CommonReference/model/api/commonReferenceApi";
import { hotelGeneralInformationSchema } from "@entites/Object/model/schemas/hotelGeneralInformationSchema";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { generateYearsBetween } from "@shared/utils/generateYearsBetween";
import { getYear, subYears } from "date-fns";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { InferType } from "yup";
import { getDeclension } from "@shared/utils/getDeclension";
const HotelGeneralInformationForm: FC<FormProps> = (props) => {
  const { navigation, onNext } = props;

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
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(hotelGeneralInformationSchema),
  });

  const hasTransfer = watch("anObjectFeeAdditionalServices.hasTransfer");
  const allInclusive = watch("anObjectMeals.allInclusive");
  const onSubmit = (data: InferType<typeof hotelGeneralInformationSchema>) => {
    console.log(data);
    onNext && onNext();
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title={`Название ${getDeclension("Мини-отель", "р")}`}>
          <FormControl>
            <Input
              {...register("heading")}
              placeholder={`Укажите название ${getDeclension(
                "мини-отель",
                "р"
              )}`}
            />
            <FormHelperText>
              это название будут видеть гости при поиске (если у вас нет
              названия, можете указать название улицы, номер дома)
            </FormHelperText>
          </FormControl>
        </FormCard>
        <FormCard title="Категория">
          <FormControl>
            <FormHelperText>
              Укажите количество звёзд, присвоенных вашему объекту по Системе
              классификации гостиниц и иных средств размещения. звёздность
            </FormHelperText>

            <FormLabel mt={2}>Звёздность</FormLabel>
            <Select {...register("category")} placeholder="Выберите">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          </FormControl>
        </FormCard>
        <FormCard title="Интернет">
          <FormControl>
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
          </FormControl>
        </FormCard>
        <FormCard title="Парковка">
          <FormControl>
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
          </FormControl>
        </FormCard>
        <FormCard title="Сведения">
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Год постройки</FormLabel>
              <Select
                placeholder="Выберите год постройки"
                {...register("anObjectDetails.yearOfConstruntion")}
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
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel>Количество номеров</FormLabel>
                <Input
                  type="number"
                  placeholder="Количество номеров"
                  {...register("anObjectDetails.numberOfRooms")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Площадь территории</FormLabel>
                <InputGroup>
                  <Input
                    {...register("anObjectDetails.areaOfTheLand")}
                    type="number"
                    placeholder="Площадь"
                  />
                  <InputRightElement>
                    <Text>
                      м<sup>2</sup>
                    </Text>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel>заезд после</FormLabel>
                <Select
                  {...register("anObjectDetails.checkInAfter")}
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
              </FormControl>
              <FormControl>
                <FormLabel>отъезд до</FormLabel>
                <Select
                  {...register("anObjectDetails.checkOutAfter")}
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
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Курение на территории</FormLabel>

              <Skeleton
                height="35px"
                isLoaded={!smokingOnSiteIsLoading && smokingOnSiteIsSuccess}
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectDetails.smokingOnSite")}
                >
                  {smokingOnSite &&
                    smokingOnSite.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
            </FormControl>
            <FormControl>
              <FormLabel>Принимаемая оплата</FormLabel>

              <Skeleton
                height="35px"
                isLoaded={!paymentTypeIsLoading && paymentTypeIsSuccess}
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectDetails.paymentType")}
                >
                  {paymentType &&
                    paymentType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard title="Удобства и услуги">
          <HStack flexWrap={"wrap"} mt={4}>
            <Controller
              control={control}
              name="anObjectAdditionalComforts.restaurant"
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
              name="anObjectAdditionalComforts.barCounter"
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
              name="anObjectAdditionalComforts.sauna"
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
              name="anObjectAdditionalComforts.garden"
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
              name="anObjectAdditionalComforts.spaCenter"
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
              name="anObjectAdditionalComforts.tennisCourt"
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
              name="anObjectAdditionalComforts.aquapark"
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
              name="anObjectAdditionalComforts.indoorPool"
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
              name="anObjectAdditionalComforts.privateBeach"
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
              name="anObjectAdditionalComforts.elevator"
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
              name="anObjectAdditionalComforts.childrenSwimmingPool"
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
              name="anObjectAdditionalComforts.roomDelivery"
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
              name="anObjectAdditionalComforts.twentyFourhourFrontDesk"
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
              name="anObjectAdditionalComforts.gym"
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
              name="anObjectAdditionalComforts.terrace"
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
              name="anObjectAdditionalComforts.footballField"
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
              name="anObjectAdditionalComforts.golf"
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
              name="anObjectAdditionalComforts.openPool"
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
              name="anObjectAdditionalComforts.jacuzzi"
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
              name="anObjectAdditionalComforts.playground"
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
              name="anObjectAdditionalComforts.ramp"
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
                  {...register("anObjectMeals.allInclusive")}
                  colorScheme="red"
                />
              </HStack>
            </FormControl>
            {allInclusive && (
              <>
                <FormControl>
                  <FormLabel>завтрак</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeals.breakfast")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>
                </FormControl>
                <FormControl>
                  <FormLabel>обед</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeals.lunch")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>
                </FormControl>
                <FormControl>
                  <FormLabel>ужин</FormLabel>
                  <Skeleton
                    height="35px"
                    isLoaded={!foodTypeIsLoading && foodTypeIsSuccess}
                  >
                    <Select
                      placeholder="выберите"
                      {...register("anObjectMeals.dinner")}
                    >
                      {foodType &&
                        foodType.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                    </Select>
                  </Skeleton>
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
            <FormControl>
              <FormLabel>Уборка</FormLabel>
              <Skeleton
                height="35px"
                isLoaded={
                  !additionalServiceIsLoading && additionalServiceIsSuccess
                }
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectFeeAdditionalServices.cleaning")}
                >
                  {additionalService &&
                    additionalService.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
            </FormControl>

            <FormControl>
              <FormLabel>Постельное бельё</FormLabel>
              <Skeleton
                height="35px"
                isLoaded={
                  !additionalServiceIsLoading && additionalServiceIsSuccess
                }
              >
                <Select
                  placeholder="выберите"
                  {...register("anObjectFeeAdditionalServices.bedLinen")}
                >
                  {additionalService &&
                    additionalService.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                </Select>
              </Skeleton>
            </FormControl>
            <FormControl>
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
                    "anObjectFeeAdditionalServices.reportingDocuments"
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
                  {...register("anObjectFeeAdditionalServices.hasTransfer")}
                  colorScheme="red"
                />
              </HStack>
            </FormControl>
            {hasTransfer && (
              <FormControl
                isInvalid={
                  !!errors?.anObjectFeeAdditionalServices?.transferDescription
                    ?.message
                }
              >
                <Textarea
                  {...register(
                    "anObjectFeeAdditionalServices.transferDescription"
                  )}
                  placeholder="Опишите условия предоставления трансфера"
                />
                <FormErrorMessage>
                  {
                    errors?.anObjectFeeAdditionalServices?.transferDescription
                      ?.message
                  }
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        </FormCard>
        <FormCard title="Подробное описание">
          <Textarea
            {...register("anObjectFeeAdditionalServices.detailComment")}
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
              "anObjectFeeAdditionalServices.objectInAnotherResources"
            )}
          />
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default HotelGeneralInformationForm;
