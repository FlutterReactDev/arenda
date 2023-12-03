import { SearchIcon } from "@chakra-ui/icons";
import { Button, Divider, HStack, StackProps } from "@chakra-ui/react";
import { useSearchObjects } from "@features/SearchObjects";
import {
  SearchSchema,
  SearchSchemaType,
} from "@features/SearchObjects/model/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, MutableRefObject, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ResultSearchDatepicker } from "./ResultSearchDatepicker";
import { ResultSearchGuest } from "./ResultSearchGuest";
import { ResultSearchInput } from "./ResultSearchInput";

interface ResultSearch extends StackProps {}
export const ResultSearch: FC<ResultSearch> = (props) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { dates, guests, term, setSearchData } = useSearchObjects();
  const methods = useForm<SearchSchemaType>({
    resolver: yupResolver(SearchSchema),
    defaultValues: {
      dates,
      guests,
      term,
    },
  });

  const onSubmit = (data: SearchSchemaType) => {
    setSearchData(data);
  };

  return (
    <FormProvider {...methods}>
      <HStack
        ref={containerRef}
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        {...props}
        bgColor="blackAlpha.100"
        rounded={"full"}
        py={2}
        position={"relative"}
        tabIndex={2}
      >
        <Controller
          control={methods.control}
          name="term"
          render={({ field: { onChange, value, ref } }) => {
            return (
              <ResultSearchInput
                trigger={() => {
                  methods.trigger("dates");
                  methods.setFocus("dates");
                }}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            );
          }}
        />

        <Divider orientation="vertical" borderColor={"gray.400"} h={"10"} />
        <Controller
          control={methods.control}
          name="dates"
          render={({ field: { onChange, value, ref } }) => {
            return (
              <ResultSearchDatepicker
                onChange={onChange}
                value={value}
                containerRef={containerRef}
                ref={ref}
              />
            );
          }}
        />

        <Divider orientation="vertical" borderColor={"gray.400"} h={"10"} />
        <Controller
          render={({ field: { onChange, ref, value } }) => {
            return (
              <ResultSearchGuest
                control={methods.control}
                value={value}
                onChange={onChange}
                ref={ref}
              />
            );
          }}
          control={methods.control}
          name="guests"
        />

        <Button
          colorScheme="red"
          minW={12}
          h={12}
          borderRadius={"full"}
          type="submit"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SearchIcon />
        </Button>
      </HStack>
    </FormProvider>
  );
};
