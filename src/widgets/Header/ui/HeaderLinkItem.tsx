import {
  Box,
  Button,
  ComponentWithAs,
  Icon,
  IconProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ReactNode, FC, memo, useState } from "react";
import { Link } from "react-router-dom";

export interface HeaderLinkItemProps {
  title: string;
  dropdownContent: ReactNode;
  to: string;
  icon: ComponentWithAs<"svg", IconProps>;
}
export const HeaderLinkItem: FC<HeaderLinkItemProps> = memo((props) => {
  const { dropdownContent, title, to, icon } = props;
  const [isHover, setHover] = useState(false);
  return (
    <Popover
      trigger="hover"
      onOpen={() => {
        setHover(true);
      }}
      onClose={() => {
        setHover(false);
      }}
      gutter={0}
      openDelay={0}
      closeDelay={0}
    >
      <PopoverTrigger>
        <Button
          as={Link}
          to={to}
          variant={"unstyled"}
          color="white"
          h="full"
          position={"relative"}
          role="group"
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          leftIcon={<Icon as={icon} w={5} h={6} />}
          p={2}
        >
          {title}
          <Box
            as="span"
            position={"absolute"}
            bgColor={"red.600"}
            w="full"
            h={"2px"}
            left={0}
            bottom={0}
            opacity={0}
            {...(isHover && { opacity: 1 })}
          ></Box>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bgColor={"trasparent"}
        background={"none"}
        boxShadow={"none"}
        borderRadius={"none"}
        border={"none"}
      >
        <PopoverBody
          rounded={"xl"}
          bgColor={"blackAlpha.900"}
          mt={1}
          color="white"
          p={4}
        >
          {dropdownContent}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});
