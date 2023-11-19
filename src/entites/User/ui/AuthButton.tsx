import { Button, ButtonProps } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getAuthData, useAuthModal, useAuthToken } from "..";
import { Link } from "react-router-dom";
import { FC } from "react";
interface AuthButtonProps extends ButtonProps {
  to: string;
  isAuth?: boolean;
}
export const AuthButton: FC<AuthButtonProps> = (props) => {
  const { to, isAuth = false, ...otherProps } = props;
  const authData = useAppSelector(getAuthData);
  const { onOpen } = useAuthModal();
  const { accessToken, refreshToken } = useAuthToken();
  if (!isAuth) {
    return <Button {...otherProps} />;
  }
  if (!authData || !accessToken || !refreshToken) {
    return <Button onClick={onOpen} {...otherProps} />;
  }

  return <Button as={Link} {...otherProps} to={to} />;
};
