import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box,
  Text,
  DrawerBody,
  HStack,
  Divider,
  IconButton,
  Stack,
  Button,
} from "@chakra-ui/react";
import { GuestsType } from "@entites/Object";
import { SearchSchemaType } from "@features/SearchObjects/model/schema";

import { CollapseSelect } from "@shared/ui/CollapseSelect";
import { getWordByNum } from "@shared/utils/getWordByNum";
import {
  LegacyRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
interface MobileSearchGuestsProps {
  value: GuestsType;
  onChange: (value: GuestsType) => void;
  control: Control<SearchSchemaType, unknown>;
  hasError: boolean;
}
export const MobileSearchGuests = forwardRef<
  MutableRefObject<HTMLDivElement>,
  MobileSearchGuestsProps
>((props, ref) => {
  const { hasError } = props;

  const ageOptions = useMemo(
    () => [
      {
        label: "до года",
        value: "0",
      },
      {
        label: "1 год",
        value: "1",
      },
      {
        label: "2 года",
        value: "2",
      },
      {
        label: "3 года",
        value: "3",
      },
      {
        label: "4 года",
        value: "4",
      },
      {
        label: "5 лет",
        value: "5",
      },
      {
        label: "6 лет",
        value: "6",
      },
      {
        label: "7 лет",
        value: "7",
      },
      {
        label: "8 лет",
        value: "8",
      },
      {
        label: "9 лет",
        value: "9",
      },
      {
        label: "10 лет",
        value: "10",
      },
      {
        label: "11 лет",
        value: "11",
      },
      {
        label: "12 лет",
        value: "12",
      },
      {
        label: "13 лет",
        value: "13",
      },
      {
        label: "14 лет",
        value: "14",
      },
      {
        label: "15 лет",
        value: "15",
      },
      {
        label: "16 лет",
        value: "16",
      },
      {
        label: "17 лет",
        value: "17",
      },
    ],
    []
  );
  const { control, watch, getValues } = useFormContext<SearchSchemaType>();
  const { onClose, onOpen, isOpen } = useDisclosure({
    defaultIsOpen: hasError,
  });
  useEffect(() => {
    if (hasError) {
      onOpen();
    }
  }, [hasError, onOpen]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests.childrenAges",
  });
  const adultsCount = watch("guests.adultsCount");
  const childrenCount = watch("guests.childrenAges");
  return (
    <Box w={"full"} h="full">
      <Box
        rounded={"full"}
        h={"50px"}
        px={"4"}
        onClick={onOpen}
        onFocus={() => {
          if (!isOpen) {
            onOpen();
          }
        }}
        border={"1px solid"}
        borderColor={"gray.200"}
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        cursor="pointer"
        ref={ref as LegacyRef<HTMLDivElement>}
        bgColor={"white"}
      >
        <Text
          fontWeight="medium"
          fontSize="12px"
          lineHeight="20px"
          color={"gray.300"}
        >
          Гости
        </Text>
        <Text
          fontWeight="medium"
          fontSize={{
            "2xl": "16px",
            md: "16px",
            base: "16px",
          }}
        >
          {`${adultsCount || getValues("guests.adultsCount")} ${getWordByNum(
            adultsCount || getValues("guests.adultsCount"),
            ["Взрослый", "Взрослых", "Взрослых"]
          )}`}
          ,{" "}
          <Text color={"gray.500"} display={"inline-block"}>
            {childrenCount?.length != undefined &&
              childrenCount?.length != 0 &&
              `${childrenCount?.length} ${getWordByNum(childrenCount?.length, [
                "ребёнок",
                "ребёнка",
                "детей",
              ])}`}
          </Text>
          {childrenCount?.length == 0 && (
            <Text color={"gray.500"} display={"inline-block"}>
              без детей
            </Text>
          )}
        </Text>
      </Box>
      <Drawer placement="bottom" size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h={"90dvh"} roundedTop={"2xl"}>
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerHeader top={0}>Выбор гостей</DrawerHeader>

            <Stack spacing={4}>
              <Divider />
              <Box>
                <HStack justifyContent={"space-between"}>
                  <Stack spacing={0}>
                    <Text fontSize={"lg"} fontWeight={"medium"}>
                      Взрослые
                    </Text>

                    <Text>от 18 лет</Text>
                  </Stack>
                  <HStack spacing={3}>
                    <Controller
                      control={control}
                      name="guests.adultsCount"
                      render={({ field: { onChange, value } }) => {
                        return (
                          <IconButton
                            onClick={() => {
                              onChange(value - 1);
                            }}
                            aria-label="decrease"
                            isRound
                            isDisabled={value == 1}
                          >
                            <MinusIcon />
                          </IconButton>
                        );
                      }}
                    />

                    <Text fontSize={"lg"} fontWeight={"medium"}>
                      {adultsCount || getValues("guests.adultsCount")}
                    </Text>
                    <Controller
                      control={control}
                      name="guests.adultsCount"
                      render={({ field: { onChange, value } }) => {
                        return (
                          <IconButton
                            onClick={() => {
                              onChange(value + 1);
                            }}
                            aria-label="increase"
                            isRound
                            isDisabled={value == 100}
                          >
                            <AddIcon />
                          </IconButton>
                        );
                      }}
                    />
                  </HStack>
                </HStack>
              </Box>
              <Divider />
              <Box>
                <HStack justifyContent={"space-between"}>
                  <Stack spacing={0}>
                    <Text fontSize={"lg"} fontWeight={"medium"}>
                      Дети
                    </Text>

                    <Text>от 0 до 17 лет</Text>
                  </Stack>
                  <HStack spacing={3}>
                    <IconButton
                      onClick={() => {
                        remove(fields.length - 1);
                      }}
                      aria-label="decrease"
                      isRound
                      isDisabled={fields.length == 0}
                    >
                      <MinusIcon />
                    </IconButton>

                    <Text fontSize={"lg"} fontWeight={"medium"}>
                      {fields.length}
                    </Text>

                    <IconButton
                      onClick={() => {
                        append({
                          age: "",
                        });
                      }}
                      aria-label="increase"
                      isRound
                      isDisabled={fields.length == 10}
                    >
                      <AddIcon />
                    </IconButton>
                  </HStack>
                </HStack>
                <Divider mt={4} mb={4} />
                <Stack mt={2}>
                  {fields.map((item, index) => {
                    return (
                      <Controller
                        control={control}
                        name={`guests.childrenAges.${index}.age`}
                        key={item.id}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <CollapseSelect
                              options={ageOptions}
                              value={value}
                              onChange={onChange}
                              onDelete={() => remove(index)}
                              errors={error?.message}
                            />
                          );
                        }}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </DrawerBody>
          <HStack p={4}>
            <Button w="40%" onClick={onClose} variant={"outline"}>
              Закрыть
            </Button>
            <Button colorScheme="red" w="60%" onClick={onClose}>
              Применить
            </Button>
          </HStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
});
