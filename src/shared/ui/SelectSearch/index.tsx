import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  SlideFade,
  useDisclosure,
  InputRightElement,
  ListIcon,
  ListItemProps,
  Icon,
  IconProps,
  ComponentWithAs,
} from "@chakra-ui/react";
import { FC, useCallback, useMemo, useState } from "react";

import { ChevronDownIcon, SearchIcon, CheckIcon } from "@chakra-ui/icons";
import fuzzySearch from "./lib/fuzzySearch";

interface Option {
  value: string | number;
  label: string;
}

interface SelectSearchProps {
  onChange: (value: string | number) => void;
  value: string | number;
  options: Option[];
  placeholder: string;
  icon: ComponentWithAs<"svg", IconProps>;
}

interface ListItemStyleProps {
  defaultStyles: ListItemProps;
  selectedStyles: ListItemProps;
}
export const SelectSearch: FC<SelectSearchProps> = (props) => {
  const { onChange, value, options, placeholder, icon } = props;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState("");
  const isSelected = useCallback(
    (listValue: string | number) => {
      return listValue == value;
    },
    [value]
  );
  const getValue = (value: string | number) => {
    return (
      options.filter((option) => option.value == value)[0]?.label || undefined
    );
  };
  const listItemStyles: ListItemStyleProps = useMemo(
    () => ({
      defaultStyles: {
        cursor: "pointer",
        borderRadius: "10px",
        p: 2,
        _hover: {
          bgColor: "red.300",
          color: "white",
          boxShadow: "lg",
        },
      },
      selectedStyles: {
        bgColor: "red.600",
        color: "white",
        boxShadow: "lg",
        _hover: {
          bgColor: "red.600",
          color: "white",
        },
      },
    }),
    []
  );
  const onClick = (value: string | number) => {
    onChange(value);
  };
  const onQueryChange = (value: string) => {
    setQuery(value);
  };
  return (
    <Box
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={2}
      position="relative"
      w="full"
    >
      <InputGroup>
        <InputLeftElement>
          <Icon as={icon} fontSize={"xl"} />
        </InputLeftElement>

        <Input
          bgColor="white"
          placeholder={placeholder}
          value={getValue(value)}
        />
        <InputRightElement>
          <ChevronDownIcon />
        </InputRightElement>
      </InputGroup>

      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="full"
        tabIndex={0}
      >
        <SlideFade
          onAnimationComplete={() => {
            if (!isOpen) {
              setIsHidden(false);
            }
          }}
          in={isOpen}
          offsetY="60px"
          style={{
            height: "100%",
          }}
        >
          <Box
            maxW="full"
            w={"full"}
            h="full"
            background="white"
            border="1px solid"
            borderColor="gray.400"
            rounded={"lg"}
            p={2}
          >
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Поиск"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
              />
            </InputGroup>

            <List mt={2}>
              {fuzzySearch(options, query).map(({ value, label }) => {
                const selected = isSelected(value);

                return (
                  <ListItem
                    {...listItemStyles.defaultStyles}
                    {...(selected && listItemStyles.selectedStyles)}
                    onClick={() => onClick(value)}
                    key={value}
                  >
                    <ListIcon
                      as={CheckIcon}
                      color={(selected && "white") || "transparent"}
                    />
                    {label}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </SlideFade>
      </Box>
    </Box>
  );
};
