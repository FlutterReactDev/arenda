import {
  Text,
  Stack,
  HStack,
  Tag,
  Box,
  Center,
  useDisclosure,
  useMergeRefs,
  Button,
} from "@chakra-ui/react";

import { DesktopSearchInput } from "./DesktopSearchInput";
import { DesktopGuests } from "./DesktopGuests";
import { DesktopDatepicker } from "./DesktopDatepicker";
import { RefObject, useRef, LegacyRef } from "react";
import { useInView } from "react-intersection-observer";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SearchSchema,
  SearchSchemaType,
} from "@features/SearchObjects/model/schema";
import {
  searchObjectAction,
  useSearchObjectData,
} from "@features/SearchObjects";
import { SearchIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const DesktopSearch = () => {
  const setSearchCookies = useCookies(["calendar_dates"])[1];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchData = useSearchObjectData();
  const methods = useForm<SearchSchemaType>({
    resolver: yupResolver(SearchSchema),
    defaultValues: { ...searchData },
  });

  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  const scrollRef = useRef() as RefObject<HTMLDivElement>;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const onSubmit = (data: SearchSchemaType) => {
    dispatch(searchObjectAction.setSearchData(data));
    setSearchCookies("calendar_dates", {
      ...data,
      dates: {
        checkIn: JSON.stringify(data.dates.checkIn),
        checkOut: JSON.stringify(data.dates.checkOut),
      },
    });

    navigate("/search-result");
  };

  const refs = useMergeRefs(scrollRef, ref);

  const onFocus = () => {
    onOpen();
    if (!inView) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Stack
          ref={containerRef}
          direction="row"
          gap={0}
          w={isOpen ? "870px" : "750px"}
          transition={"0.3s"}
          minH={14}
          mt={10}
          position={"relative"}
          rounded={"full"}
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          bgColor={"white"}
          alignItems={"center"}
        >
          <HStack
            onFocus={onFocus}
            onBlur={onClose}
            spacing={0}
            gap={0}
            w="full"
          >
            <Controller
              control={methods.control}
              name="term"
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <DesktopSearchInput
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    trigger={async () => {
                      const trigger = await methods.trigger("dates");
                      if (!trigger) {
                        methods.setFocus("dates");
                      }
                    }}
                  />
                );
              }}
            />
            <Controller
              control={methods.control}
              name="dates"
              render={({ field: { value, onChange, ref } }) => {
                return (
                  <DesktopDatepicker
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    containerRef={containerRef}
                  />
                );
              }}
            />
            <Controller
              control={methods.control}
              name="guests"
              render={({ field: { value, onChange, ref } }) => {
                return (
                  <DesktopGuests
                    control={methods.control}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                  />
                );
              }}
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
              mr={1}
            >
              <SearchIcon />
            </Button>
          </HStack>

          <Box
            position={"absolute"}
            top={"-100%"}
            left={0}
            w="full"
            h={"600px"}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            ref={refs}
            zIndex={"hide"}
          ></Box>
        </Stack>
      </FormProvider>

      <Center>
        <HStack gap={"2"} mt={10}>
          <Text>Например:</Text>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
        </HStack>
      </Center>
    </Box>
  );
};
