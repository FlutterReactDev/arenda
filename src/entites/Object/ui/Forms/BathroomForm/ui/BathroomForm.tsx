import {
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import {
  BathroomSchemaType,
  bathroomSchema,
} from "@entites/Object/model/schemas/bathroomSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
interface BathroomFormProps {
  value: BathroomSchemaType;
  onChange: (value: BathroomSchemaType) => void;
}
export const BathroomForm: FC<BathroomFormProps & FormProps> = (props) => {
  const { value, onChange, navigation } = props;
  const { register, control, handleSubmit } = useForm<BathroomSchemaType>({
    resolver: yupResolver(bathroomSchema),
    defaultValues: { ...value },
  });

  const onSubmit = (data: BathroomSchemaType) => {
    onChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="Ванная комната">
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>количество ванных комнат с туалетом</FormLabel>
            <NumberInput size="lg" maxW={"48"} defaultValue={0} min={0}>
              <NumberInputField {...register("numberOfBathroomsWithToilet")} />
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
          {navigation}
        </Stack>
      </FormCard>
    </form>
  );
};
