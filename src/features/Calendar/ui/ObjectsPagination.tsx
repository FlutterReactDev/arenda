import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { usePagination } from "../model/usePagination";

export const ObjectPagination = () => {
  const { totalPage, onNext, onPrev, currentPage } = usePagination();
  return (
    <ButtonGroup h={10} w="full" justifyContent={"space-between"}>
      <Button fontSize={"xl"} bgColor={"white"} onClick={onPrev}>
        <ChevronLeftIcon />
      </Button>
      <Flex
        bgColor={"white"}
        rounded={"lg"}
        alignItems={"cente"}
        justifyContent={"center"}
        h="full"
        py={1.5}
        px={2}
        w="full"
      >
        <Text fontSize={"lg"} fontWeight={"medium"}>
          {currentPage} из {totalPage}
        </Text>
      </Flex>
      <Button fontSize={"xl"} bgColor={"white"} onClick={onNext}>
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
};
