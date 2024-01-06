import { StarIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Avatar,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, PropsWithChildren } from "react";
interface CommentItemProps {
  userName: string;
  text: string;
  rating: number;
  userImg: string;
  createdDate: string;
  photos: string[];
}
export const CommentItem: FC<PropsWithChildren<CommentItemProps>> = (props) => {
  const { children, text, userName, rating, userImg, createdDate, photos } =
    props;

  return (
    <HStack alignItems={"flex-start"} position={"relative"}>
      <Avatar src={userImg} size={["sm", "md"]} />
      <Stack spacing={3} w="full">
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          spacing={0}
        >
          <Stack spacing={0}>
            <Text fontSize={["small", "sm", "md"]} fontWeight={"medium"}>
              {userName}
            </Text>
            <Text color={"gray.500"} fontSize={["small", "sm", "md"]}>
              {format(Date.parse(createdDate), "d MMMM yyyy", {
                locale: ru,
              })}{" "}
              г
            </Text>
          </Stack>
          <Stack spacing={0}>
            <HStack spacing={1} justifyContent={"flex-end"}>
              <StarIcon color={"red.500"} />
              <Text fontWeight={"medium"} fontSize={["sm", "md"]}>
                {rating}
              </Text>
            </HStack>
          </Stack>
        </HStack>

        {photos.map((image) => (
          <AspectRatio maxW="560px" ratio={1}>
            <Image rounded={"lg"} src={image} />
          </AspectRatio>
        ))}
        <Text position={"relative"}>{text}</Text>
        {children}
      </Stack>
    </HStack>
  );
};
