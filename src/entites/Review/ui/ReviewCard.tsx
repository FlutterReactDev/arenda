import { Avatar, Flex, Text } from "@chakra-ui/react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  index: number;
}

export const ReviewCard = (props: TestimonialCardProps) => {
  const { name, content, avatar } = props;
  return (
    <Flex
      maxW={"640px"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={"white"}
    >
      <Flex
        direction={"column"}
        textAlign={"left"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"medium"} fontSize={"15px"} pb={4}>
          {content}
        </Text>
        <Text fontWeight={"bold"} fontSize={14}>
          {name}
        </Text>
      </Flex>
      <Avatar
        src={avatar}
        height={"80px"}
        width={"80px"}
        alignSelf={"center"}
        m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
      />
    </Flex>
  );
};
