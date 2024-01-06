import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, IconButton, chakra } from "@chakra-ui/react";
import { FC } from "react";
import { AlertProps } from "../type";
import { MdErrorOutline } from "react-icons/md";

export const ErrorAlert: FC<AlertProps> = (props) => {
  const { description, onClose, title } = props;
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      alignItems="center"
      justifyContent="center"
      rounded={"lg"}
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
        <Flex justifyContent="center" alignItems="center" w={20} bg="red.500" p={4}>
          <Icon as={MdErrorOutline} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color="red.500"
              _dark={{
                color: "red.400",
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
