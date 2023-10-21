import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";

export const CommentOwner = () => {
  return (
    <Stack alignItems={"flex-start"} position={"relative"}>
      <HStack>
        <Avatar src="https://bit.ly/broken-link" />
        <HStack spacing={1}>
          <Text fontWeight={"medium"}>Jane Doe,</Text>
          <Text color={"gray.500"}>хозяин жилья</Text>
        </HStack>
      </HStack>
      <Text>Круто </Text>
    </Stack>
  );
};
