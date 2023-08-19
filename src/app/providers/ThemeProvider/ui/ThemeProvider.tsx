import { ChakraProvider } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";
import { FC, PropsWithChildren } from "react";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    return <ChakraProvider theme={CalendarDefaultTheme}>
        {children}
    </ChakraProvider>
}