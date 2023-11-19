import { Button, VStack } from "@chakra-ui/react";

import { MobileSearchInput } from "./MobileSearchInput";
import { MobileSearchGuests } from "./MobileSearchGuests";
import { MobileSearchDatePicker } from "./MobileSearchDatePicker";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SearchSchema,
  SearchSchemaType,
} from "@features/SearchObjects/model/schema";
import {
  searchObjectAction,
  useSearchObjectData,
} from "@features/SearchObjects";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export const MobileSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchData = useSearchObjectData();
  const [hasError, setHasError] = useState<string>();
  const methods = useForm<SearchSchemaType>({
    resolver: yupResolver(SearchSchema),
    defaultValues: { ...searchData },
  });

  const onSubmit = (data: SearchSchemaType) => {
    dispatch(searchObjectAction.setSearchData(data));
    navigate("/search-result");
  };

  useEffect(() => {
    if (Object.keys(methods.formState.errors).length != 0) {
      setHasError(Object.keys(methods.formState.errors)[0]);
    }
  }, [methods.formState.errors]);

  return (
    <FormProvider {...methods}>
      <VStack
        w={"full"}
        gap={"2"}
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Controller
          control={methods.control}
          name="term"
          render={({ field: { value, onChange, ref } }) => {
            return (
              <MobileSearchInput
                hasError={hasError == "term"}
                value={value}
                onChange={onChange}
                ref={ref}
              />
            );
          }}
        />
        <Controller
          control={methods.control}
          name="dates"
          render={({ field: { onChange, ref, value } }) => {
            return (
              <MobileSearchDatePicker
                hasError={hasError == "dates"}
                value={value}
                ref={ref}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          control={methods.control}
          name="guests"
          render={({ field: { onChange, value, ref } }) => {
            return (
              <MobileSearchGuests
                control={methods.control}
                onChange={onChange}
                value={value}
                ref={ref}
                hasError={hasError == "guests"}
              />
            );
          }}
        />
        <Button
          rounded={"full"}
          colorScheme="red"
          w="full"
          leftIcon={<Search2Icon />}
          type="submit"
        >
          Поиск
        </Button>
      </VStack>
    </FormProvider>
  );
};
