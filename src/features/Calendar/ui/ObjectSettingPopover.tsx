import { DeleteIcon, EditIcon, LockIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ObjectSettingPopover: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Popover isLazy strategy="fixed">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent maxW={"40"} p={3}>
        <PopoverHeader border="none" pb={4} />
        <PopoverArrow />
        <PopoverCloseButton />
        <Stack>
          <Button leftIcon={<EditIcon />}>Настройки</Button>
          <Button leftIcon={<LockIcon />}>Закрыть</Button>
          <Button leftIcon={<Search2Icon />}>Все брони</Button>
          <Button leftIcon={<DeleteIcon />}>Удалить</Button>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};
