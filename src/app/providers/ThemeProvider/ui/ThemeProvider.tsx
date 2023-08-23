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
          borderRadius: "lg",
        },
      },
    },
    CalendarMonth: {
      parts: ["days"],
      baseStyle: {
        days: {
          gap: "5px",
        },
      },
    },
    CalendarDay: {
      baseStyle: {
        rounded: "md",
        _active: {
          bgColor: "blackAlpha.600",
        },
        _hover: {
          bgColor: "blackAlpha.600",
          color: "white",
        },
      },
      variants: {
        selected: {
          bgColor: "gray.500",
          color: "white",

          _hover: {
            bgColor: "gray.300",
          },
        },

        range: {
          bgColor: "gray.400",
          color: "white",

          _hover: {
            bgColor: "pink.100",
          },

          _disabled: {
            _hover: {
              bgColor: "pink.300",
            },
          },
        },

        outside: {
          color: "gray.300",
        },
        today: {
          border:"1px solid",
          borderColor:"gray.500",
          bgColor:"transparent",
          _hover: {
            bgColor: "gray.500",
          },
        },
      },
    },
    CalendarControl: {
      parts: ["button"],

      baseStyle: {
        button: {
          h: 6,
          w: 6,

          rounded: "full",
          fontSize: "sm",
          color: "white",
          bgColor: "red.500",

          _hover: {
            bgColor: "red.200",
          },

          _focus: {
            outline: "none",
          },
        },
      },
    },
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
