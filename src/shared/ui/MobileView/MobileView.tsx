import { useMediaQuery } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
export const MobileView: FC<PropsWithChildren> = ({ children }) => {
  const [isLessThan880] = useMediaQuery("(max-width: 880px)");
  if (isLessThan880) {
    return children;
  }
  return null;
};
