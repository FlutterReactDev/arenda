import { StarIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Avatar,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, PropsWithChildren, memo } from "react";
import { Photo } from "../model/types/review";
interface ReviewCardProps {
  userName: string;
  text: string;
  rating: number;
  userImg: string;
  createdDate: string;
  photos: Photo[];
}
export const ReviewCard: FC<PropsWithChildren<ReviewCardProps>> = memo(
  (props) => {
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
          <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={2}>
            {photos.map(({ preview_urls, id }) => (
              <AspectRatio
                key={id}
                h={{ base: "200px", md: "auto" }}
                maxW="full"
                ratio={1}
              >
                <Image rounded={"lg"} src={preview_urls.url} />
              </AspectRatio>
            ))}
          </SimpleGrid>

          <Text position={"relative"}>{text}</Text>
          {children}
        </Stack>
      </HStack>
    );
  }
);
