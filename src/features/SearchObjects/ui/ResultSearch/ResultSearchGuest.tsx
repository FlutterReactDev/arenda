import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Box,
  HStack,
  Button,
  Divider,
  Text,
  BoxProps,
  SlideFade,
  IconButton,
  Stack,
  useOutsideClick,
  useMergeRefs,
} from "@chakra-ui/react";
import { GuestsType } from "@entites/Object";
import { SearchSchemaType } from "@features/SearchObjects/model/schema";

import { CollapseSelect } from "@shared/ui/CollapseSelect";
import { getWordByNum } from "@shared/utils/getWordByNum";
import {
  LegacyRef,
  MutableRefObject,
  RefObject,
  forwardRef,
  memo,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Controller,
  useFieldArray,
  Control,
  useFormContext,
} from "react-hook-form";
interface ResultSearchGuest {
  value: GuestsType;
  onChange: (value: GuestsType) => void;
  control: Control<SearchSchemaType, unknown>;
}
export const ResultSearchGuest = memo(
  forwardRef<MutableRefObject<HTMLDivElement>, ResultSearchGuest>((_, ref) => {
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
    const isSelected: BoxProps = {
      boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
      bgColor: "white",
    };
    const containerRef = useRef();

    const { fields, append, remove } = useFieldArray({
      control,
      name: "guests.childrenAges",
    });
    const adultsCount = watch("guests.adultsCount");
    const childrenCount = watch("guests.childrenAges");

    const refs = useMergeRefs(ref, containerRef);
    useOutsideClick({
      ref: containerRef as unknown as RefObject<HTMLElement>,
      handler: onClose,
      enabled: isOpen,
    });

    return (
      <Box
        position="relative"
        w={"full"}
        onFocus={() => {
          onOpen();
          setIsHidden(true);
        }}
        tabIndex={3}
        ref={refs as LegacyRef<HTMLDivElement>}
      >
        <Box
          p={"1"}
          pl="4"
          h={"full"}
          rounded={"full"}
          w={{ "2xl": "80%", lg: "100%", base: "100%" }}
          {...(isOpen && isSelected)}
        >
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
              "2xl": "17px",
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

        <Box
          position="absolute"
          bottom={"-10px"}
          left={0}
          transform={"translateY(100%)"}
          zIndex={!isHidden ? "hide" : "popover"}
          display={!isHidden ? "none" : "block"}
          w={{
            "2xl": "full",
            xl: "350px",
            lg: "300px",
            base: "260px",
          }}
        >
          <SlideFade
            onAnimationComplete={() => {
              if (!isOpen) {
                setIsHidden(false);
              }
            }}
            offsetY={"60px"}
            in={isOpen}
          >
            <Box
              w="full"
              p={"4"}
              background="white"
              border="1px solid"
              borderColor="gray.400"
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
                  <Stack mt={2} maxH="50dvh">
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
          </SlideFade>
        </Box>
      </Box>
    );
  })
);
