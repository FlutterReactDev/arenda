import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth, useAuthModal } from "..";
interface AuthButtonProps extends ButtonProps {
  to: string;
  isAuth?: boolean;
}
export const AuthButton: FC<AuthButtonProps> = (props) => {
  const { to, isAuth = false, ...otherProps } = props;
  const { isLoggin } = useAuth();
  const { onOpen } = useAuthModal();
  
  if (!isAuth) {
    return <Button {...otherProps} />;
  }

  if (isLoggin) {
    return <Button onClick={onOpen} {...otherProps} />;
  }

  return <Button as={Link} {...otherProps} to={to} />;
};
