import { ChakraProvider,theme } from "@chakra-ui/react";

import { FC, PropsWithChildren } from "react";


export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
