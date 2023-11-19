import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

export const StatusChangePopover = () => {
  return (
    <Popover strategy="fixed" isLazy>
      <PopoverTrigger>
        <Tag cursor={"pointer"} colorScheme="green">
          <TagLabel>Чистый</TagLabel>
        </Tag>
      </PopoverTrigger>
      <PopoverContent w={"45"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Stack>
            <Tag w="max-content" cursor={"pointer"} colorScheme="yellow">
              <TagLabel>Уборка</TagLabel>
            </Tag>
            <Tag w="max-content" cursor={"pointer"} colorScheme="red">
              <TagLabel>Грязный</TagLabel>
            </Tag>
            <Tag w="max-content" cursor={"pointer"} colorScheme="gray">
              <TagLabel>Закрыть на ремонт </TagLabel>
            </Tag>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
