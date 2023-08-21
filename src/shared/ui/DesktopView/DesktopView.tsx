import { useMediaQuery } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
export const DesktopView: FC<PropsWithChildren> = ({ children }) => {
  const [isLargeThan880] = useMediaQuery("(min-width: 880px)");
  if (isLargeThan880) {
    return children;
  }
  return null;
};
