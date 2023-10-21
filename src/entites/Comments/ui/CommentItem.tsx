import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import { Avatar, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { BiUserCircle, BiLike, BiDislike } from "react-icons/bi";
export const CommentItem: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <HStack alignItems={"flex-start"} position={"relative"}>
      <Avatar src="https://bit.ly/broken-link" />
      <Stack spacing={3}>
        <HStack justifyContent={"space-between"}>
          <Stack spacing={0}>
            <Text fontWeight={"medium"}>Jane Doe</Text>
            <HStack color={"gray.500"}>
              <HStack>
                <CalendarIcon />
                <Text>Сентябрь 2023, 4 суток</Text>
              </HStack>
              <HStack>
                <Icon as={BiUserCircle} />
                <Text>6 гостей</Text>
              </HStack>
            </HStack>
          </Stack>
          <Stack spacing={0}>
            <HStack spacing={1} justifyContent={"flex-end"}>
              <StarIcon color={"red.500"} />s
              <Text fontWeight={"medium"}>9,5</Text>
            </HStack>
            <Text color={"gray.500"}>15 февраля 2023 г</Text>
          </Stack>
        </HStack>
        <Text position={"relative"}>
          Отличная квартира в самом центре. Всё в пешей доступности. В квартире
          всё есть, что необходимо для комфортного проживания. Все возникающие
          вопросы решают оперативно (заменили плохо работающий ключ от подъезда
          <Icon
            as={BiLike}
            fontSize={"20px"}
            color={"green.500"}
            position={"absolute"}
            left={"-10"}
            top={0}
          />
        </Text>
        <Text position={"relative"}>
          Отличная квартира в самом центре. Всё в пешей доступности. В квартире
          всё есть, что необходимо для комфортного проживания. Все возникающие
          вопросы решают оперативно (заменили плохо работающий ключ от подъезда
          <Icon
            as={BiDislike}
            fontSize={"20px"}
            color={"red.500"}
            position={"absolute"}
            left={"-10"}
            top={0}
          />
        </Text>
        {children}
      </Stack>
    </HStack>
  );
};
