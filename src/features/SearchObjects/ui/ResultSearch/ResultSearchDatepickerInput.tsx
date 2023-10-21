import { Box, BoxProps, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { FC, memo } from "react";

interface ResultSearchDatepickerInputProps {
  label: string;
  date: Date | undefined;
  isSelected: boolean;
}
export const ResultSearchDatepickerInput: FC<ResultSearchDatepickerInputProps> =
  memo((props) => {
    const { date, label, isSelected } = props;

    const isSelecteStyle: BoxProps = {
      boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
      bgColor: "white",
    };
    return (
      <Box
        p={"1"}
        pl={"6"}
        w={"100%"}
        h={"full"}
        border={"none"}
        rounded={"full"}
        transition={"0.2s box-shadow"}
        cursor={"pointer"}
        {...(isSelected && isSelecteStyle)}
        _focus={{
          outline: "none",
          border: "none",
        }}
      >
        <Text
          fontWeight="medium"
          fontSize="14px"
          lineHeight="20px"
          color={"gray.300"}
        >
          {label}
        </Text>
        <Text
          fontWeight="medium"
          fontSize={{
            "2xl": "17px",
            md: "15px",
            base: "15px",
          }}
        >
          {date
            ? format(date, "d MMMM, EEE", {
                locale: ru,
              })
            : "Когда"}
        </Text>
      </Box>
    );
  });
