import { Flex, Icon, Box, chakra, IconButton } from "@chakra-ui/react";
import { IoMdAlert } from "react-icons/io";
import { AlertProps } from "../type";
import { FC } from "react";
import { CloseIcon } from "@chakra-ui/icons";

export const WarningAlert: FC<AlertProps> = (props) => {
  const { description, onClose, title } = props;
  return (
    <Flex
      bg="#edf3f8"
      rounded={"lg"}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="md"
        rounded="lg"
        overflow="hidden"
        pos={"relative"}
      >
        <IconButton
          aria-label="close alert"
          onClick={onClose}
          pos={"absolute"}
          top={1}
          right={1}
          size={"sm"}
          bgColor={"transparent"}
        >
          <CloseIcon />
        </IconButton>
        <Flex
          justifyContent="center"
          alignItems="center"
          w={12}
          bg="yellow.500"
        >
          <Icon as={IoMdAlert} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color="yellow.400"
              _dark={{
                color: "yellow.300",
              }}
              fontWeight="bold"
            >
              {title}
            </chakra.span>
            <chakra.p
              color="gray.600"
              _dark={{
                color: "gray.200",
              }}
              fontSize="sm"
            >
              {description}
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
