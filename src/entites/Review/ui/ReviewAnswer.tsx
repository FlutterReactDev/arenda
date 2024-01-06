import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Officialanswer } from "../model/types/review";

export const ReviewAnswer: FC<Officialanswer> = (props) => {
  const { org_name, text } = props;
  return (
    <Stack alignItems={"flex-start"} position={"relative"}>
      <HStack>
        <Avatar size={["sm", "md"]} src="https://bit.ly/broken-link" />
        <HStack spacing={1}>
          <Text fontSize={["small", "sm", "md"]} fontWeight={"medium"}>
            {org_name},
          </Text>
          <Text fontSize={["small", "sm", "md"]} color={"gray.500"}>
            хозяин жилья
          </Text>
        </HStack>
      </HStack>
      <Text>{text}</Text>
    </Stack>
  );
};
