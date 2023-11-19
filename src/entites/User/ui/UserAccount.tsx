import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import {
  Popover,
  PopoverTrigger,
  Button,
  Box,
  PopoverContent,
  PopoverBody,
  Avatar,
  Text,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";

import { useState } from "react";
import { Link } from "react-router-dom";
import { userAction } from "..";

export const UserAccount = () => {
  const [isHover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(userAction.logout());
  };
  return (
    <Popover
      trigger="hover"
      onOpen={() => {
        setHover(true);
      }}
      onClose={() => {
        setHover(false);
      }}
      gutter={0}
      openDelay={0}
      closeDelay={0}
    >
      <PopoverTrigger>
        <Button
          as={Link}
          to={RouteName.CABINET}
          variant={"unstyled"}
          color="white"
          h="full"
          position={"relative"}
          role="group"
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          leftIcon={<Avatar h={8} w={8} src="https://bit.ly/broken-link" />}
          p={2}
        >
          <Stack spacing={0}>
            <Text color={"white"} fontWeight={"medium"} lineHeight={"12px"}>
              DEnchik
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              личный кабинет
            </Text>
          </Stack>
          <Box
            as="span"
            position={"absolute"}
            bgColor={"red.600"}
            w="full"
            h={"2px"}
            left={0}
            bottom={0}
            opacity={0}
            {...(isHover && { opacity: 1 })}
          ></Box>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bgColor={"trasparent"}
        background={"none"}
        boxShadow={"none"}
        borderRadius={"none"}
        border={"none"}
      >
        <PopoverBody
          rounded={"xl"}
          bgColor={"blackAlpha.900"}
          mt={1}
          color="white"
          p={4}
        >
          <Stack>
            <Button>Настройка уведомлений</Button>
            <Button>Редактировать профиль</Button>
            <Button>Изменить пароль</Button>
            <Divider />
            <Button
              _hover={{
                bgColor: "transparent",
              }}
              variant={"outline"}
              color={"white"}
              borderColor={"red.600"}
              onClick={onLogout}
            >
              Выйти из аккаунта
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
