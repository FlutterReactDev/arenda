import { Flex, Icon, Box, chakra, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AlertProps } from "../type";
import { CloseIcon } from "@chakra-ui/icons";

export const SucessAlert: FC<AlertProps> = (props) => {
  const { description, onClose, title } = props;
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      rounded="lg"
      shadow="md"
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
          bg="green.500"
          p={4}
        >
          <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color="green.500"
              _dark={{
                color: "green.400",
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
