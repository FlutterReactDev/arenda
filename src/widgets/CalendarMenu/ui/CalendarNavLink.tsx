import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
interface CalendarNavLinkProps {
  to: string;
}
export const CalendarNavLink: FC<PropsWithChildren<CalendarNavLinkProps>> = (
  props
) => {
  const { children, to } = props;

  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
      }}
      to={to}
      fontWeight={"medium"}
    >
      {children}
    </Box>
  );
};
