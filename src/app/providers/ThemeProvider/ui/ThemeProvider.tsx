import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";
import { FC, PropsWithChildren } from "react";
export const theme = extendTheme(CalendarDefaultTheme, {
  components: {
    Calendar: {
      parts: ["calendar"],

      baseStyle: {
        calendar: {
          width: "100%",
          boxShadow: "none",
          borderRadius: "20px",
        },
      },
    },

    CalendarDay: {
      baseStyle: {
        width: "1rem",

        borderRadius: "50%",
      },
    },
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
