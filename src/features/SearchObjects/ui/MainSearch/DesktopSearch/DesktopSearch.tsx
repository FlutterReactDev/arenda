import {
  Box,
  Button,
  HStack,
  Stack,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";

import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchObjects } from "@features/SearchObjects";
import {
  SearchSchema,
  SearchSchemaType,
} from "@features/SearchObjects/model/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LegacyRef, RefObject, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { DesktopDatepicker } from "./DesktopDatepicker";
import { DesktopGuests } from "./DesktopGuests";
import { DesktopSearchInput } from "./DesktopSearchInput";

export const DesktopSearch = () => {
  const navigate = useNavigate();
  const { dates, guests, term, setSearchData } = useSearchObjects();

  const methods = useForm<SearchSchemaType>({
    resolver: yupResolver(SearchSchema),
    defaultValues: { dates, guests, term },
  });

  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  const scrollRef = useRef() as RefObject<HTMLDivElement>;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const onSubmit = (data: SearchSchemaType) => {
    setSearchData(data);
    navigate(RouteName.SEARCH_PAGE);
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
    </Box>
  );
};
