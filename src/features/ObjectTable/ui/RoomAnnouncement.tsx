import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
interface RoomAnnouncementProps {
  id: number;
  image: string;

  name: string;
}
export const RoomAnnouncement: FC<RoomAnnouncementProps> = memo((props) => {
  const { id, image, name } = props;
  return (
    <HStack>
      <Stack>
        <Text fontWeight={"medium"} color={"gray.500"}>
          № {id}
        </Text>

        <Image
          rounded={"lg"}
          w="94px"
          h="94px"
          objectFit={"cover"}
          src={image}
        />
      </Stack>
      <Stack maxW="200px" w="full">
        <Text
          fontWeight={"medium"}
          fontSize={"lg"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
        >
          {name}
        </Text>
      </Stack>
    </HStack>
  );
});
