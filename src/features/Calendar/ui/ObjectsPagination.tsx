import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { usePagination } from "../model/usePagination";

export const ObjectPagination = () => {
  const { totalPage, onNext, onPrev, currentPage } = usePagination();
  return (
    <HStack fontSize={"lg"} fontWeight={"medium"} ml={2} mt={2}>
      <IconButton
        aria-label="prev objects"
        isRound
        bgColor={"white"}
        color="black"
        fontSize={"2xl"}
        border={"1px solid"}
        borderColor={"#444"}
        onClick={onPrev}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box
        bgColor={"white"}
        color={"black"}
        rounded={"lg"}
        px={3}
        py={1}
        border={"1px solid"}
        borderColor={"#444"}
      >
        {currentPage} / {totalPage}
      </Box>
      <IconButton
        aria-label="next object"
        isRound
        bgColor={"white"}
        color="black"
        fontSize={"2xl"}
        border={"1px solid"}
        borderColor={"#444"}
        onClick={onNext}
      >
        <ChevronRightIcon />
      </IconButton>
    </HStack>
  );
};
