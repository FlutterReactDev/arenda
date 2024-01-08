import {
  HStack,
  Show,
  IconButton,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FilterObjects } from "@features/FilterObjects";
import { ResultSearch } from "@features/SearchObjects";
import { memo } from "react";
import { VscSettings } from "react-icons/vsc";

export const ObjectSearchHeader = memo(() => {
  const {
    isOpen: desktopFilterIsOpen,
    onOpen: desktopFilterOnOpen,
    onClose: desktopFilterOnClose,
  } = useDisclosure();
  return (
    <>
      <HStack
        justifyContent={{
          base: "space-between",
          "2xl": "center",
        }}
        w="full"
        h={"full"}
        px={4}
      >
        <Show below="2xl">
          <IconButton
            aria-label="open filter drawer button"
            colorScheme="red"
            size={"lg"}
            onClick={desktopFilterOnOpen}
          >
            <Icon as={VscSettings} />
          </IconButton>
        </Show>

        <ResultSearch
          maxW={{ base: "5xl", xl: "5xl", "2xl": "7xl" }}
          w={"full"}
        />
      </HStack>
      <Show below="2xl">
        <Drawer
          isOpen={desktopFilterIsOpen}
          placement="left"
          onClose={desktopFilterOnClose}
        >
          <DrawerOverlay />
          <DrawerContent bgColor={"none"}>
            <DrawerCloseButton />
            <DrawerHeader p={2}>Фильтры</DrawerHeader>

            <DrawerBody p={0} bgColor={"white"}>
              <FilterObjects />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
});
