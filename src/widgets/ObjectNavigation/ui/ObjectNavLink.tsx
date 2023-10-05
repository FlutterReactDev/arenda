import { Box, Flex, Icon } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
interface ObjectNavLinkProps {
  icon?: IconType;
  active?: boolean;
}
export const ObjectNavLink: FC<PropsWithChildren<ObjectNavLinkProps>> = (
  props
) => {
  const { icon, children, active } = props;
  return (
    <Box
      as={Link}
      to=""
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "red.400",
          color: "white",
        }}
        {...(active && {
          bgColor: "red.600",
        })}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
