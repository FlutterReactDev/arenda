import { SearchIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  InputGroup,
  Input,
  InputLeftElement,
  ScaleFade,
  List,
  Box,
  ListIcon,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import { LegacyRef, MutableRefObject, forwardRef, useState } from "react";

interface DesktopSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  trigger: () => void;
}

export const DesktopSearchInput = forwardRef<
  MutableRefObject<HTMLDivElement>,
  DesktopSearchInputProps
>((props, ref) => {
  const { onChange, value, trigger } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  return (
    <Box
      position="relative"
      w="full"
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={1}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <InputGroup w="full" h={"full"} border={"none"}>
        <Input
          h={"auto"}
          border={"none"}
          borderLeftRadius={"full"}
          outline={"none"}
          placeholder="Куда едем"
          padding={0}
          paddingLeft={"5"}
          paddingTop={"5"}
          minW={"full"}
          _placeholder={{
            fontWeight: "medium",
            fontSize: "17px",
            color: "black",
          }}
          _focusVisible={{
            boxShadow: "none",
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <InputLeftElement
          paddingLeft={"5"}
          paddingTop={"0"}
          width={"auto"}
          height={"auto"}
        >
          <Text
            fontWeight="medium"
            fontSize="14px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Курорт, город или адрес
          </Text>
        </InputLeftElement>
      </InputGroup>
      <Box
        position="absolute"
        bottom={"-20px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="full"
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
            boxShadow={"lg"}
            maxW="full"
            w={"full"}
            p={"2"}
            background="white"
            rounded={"lg"}
          >
            <Text>Популярные направления </Text>
            <List color="blackAlpha.800" fontSize="xs" spacing={3} mt={2}>
              <Flex
                alignItems="center"
                onClick={() => {
                  onChange("Кыргызстан, Ыссык-кол, Бостери");
                  trigger();
                  onClose();
                }}
              >
                <ListIcon as={SearchIcon} color="blackAlpha.800" />
                <Link>Кыргызстан, Ыссык-кол, Бостери</Link>
              </Flex>
            </List>
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
});
