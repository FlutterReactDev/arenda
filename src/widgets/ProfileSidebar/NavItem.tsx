import { Box, ComponentWithAs, Flex, Icon, IconProps } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  to: string;
  icon: ComponentWithAs<"svg", IconProps>;
}

export const NavItem: FC<PropsWithChildren<NavItem>> = (props) => {
  const { to, children, icon } = props;
  const { pathname } = useLocation();
  return (
    <Box
      as={Link}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      fontWeight={"medium"}
    >
      <Flex
        align="center"
        p="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "facebook.400",
          color: "white",
        }}
        {...(pathname.includes(to) && {
          bg: "facebook.400",
          color: "white",
        })}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
        {children}
      </Flex>
    </Box>
  );
};
