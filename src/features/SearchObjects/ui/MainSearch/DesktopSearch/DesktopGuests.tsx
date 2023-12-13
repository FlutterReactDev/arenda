import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  HStack,
  Button,
  Divider,
  Text,
  useDisclosure,
  Box,
  ScaleFade,
  IconButton,
  Stack,
  useOutsideClick,
  useMergeRefs,
} from "@chakra-ui/react";
import type { GuestsType } from "@entites/Object";
import { SearchSchemaType } from "@features/SearchObjects/model/schema";

import { CollapseSelect } from "@shared/ui/CollapseSelect";
import { getWordByNum } from "@shared/utils/getWordByNum";
import {
  LegacyRef,
  MutableRefObject,
  RefObject,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
interface DesktopGuestsProps {
  value: GuestsType;
  onChange: (value: GuestsType) => void;
  control: Control<SearchSchemaType, unknown>;
}
export const DesktopGuests = forwardRef<
  MutableRefObject<HTMLDivElement>,
  DesktopGuestsProps
>((_, ref) => {
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
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests.childrenAges",
  });
  const adultsCount = watch("guests.adultsCount");
  const childrenCount = watch("guests.childrenAges");
  const containerRef = useRef();
  const refs = useMergeRefs(ref, containerRef);
  useOutsideClick({
    ref: containerRef as unknown as RefObject<HTMLElement>,
    handler: onClose,
    enabled: isOpen,
  });

  return (
    <Box
      position="relative"
      minW="235px"
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={3}
      borderLeft={"1px solid"}
      borderColor="gray.200"
      ref={refs as LegacyRef<HTMLDivElement>}
    >
      <HStack
        gap={0}
        cursor={"pointer"}
        borderRightRadius={"full"}
        justifyContent={"space-between"}
        pr={"1"}
      >
        <Box p={"2"} h={"full"}>
          <Text
            fontWeight="medium"
            fontSize="14px"
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
                `${childrenCount?.length} ${getWordByNum(
                  childrenCount?.length,
                  ["ребёнок", "ребёнка", "детей"]
                )}`}
            </Text>
            {childrenCount?.length == 0 && (
              <Text color={"gray.500"} display={"inline-block"}>
                без детей
              </Text>
            )}
          </Text>
        </Box>
      </HStack>
      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="72"
      >
        <ScaleFade
          onAnimationComplete={() => {
            if (!isOpen) {
              setIsHidden(false);
            }
          }}
          initialScale={0.9}
          in={isOpen}
        >
          <Box
            w="full"
            p={"4"}
            background="white"
            boxShadow={"lg"}
            rounded={"lg"}
          >
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
            <Box mt={4}>
              <Button w="full" onClick={onClose}>
                Готово
              </Button>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
});
