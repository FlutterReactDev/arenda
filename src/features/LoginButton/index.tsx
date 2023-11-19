import { Button, ButtonProps } from "@chakra-ui/react";
import { useAuthModal } from "@entites/User";
import { FC } from "react";

export const LoginButton: FC<ButtonProps> = (props) => {
  const { onOpen } = useAuthModal();
  return <Button onClick={onOpen} {...props} />;
};
