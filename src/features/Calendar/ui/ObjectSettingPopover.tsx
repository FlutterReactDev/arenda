import { EditIcon } from "@chakra-ui/icons";
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
interface ObjectSettingPopoverProps {
  roomId?: number;
  isHotel?: boolean;
}
export const ObjectSettingPopover: FC<
  PropsWithChildren<ObjectSettingPopoverProps>
> = (props) => {
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
        </Stack>
      </PopoverContent>
    </Popover>
  );
};
