import { Button, Collapse, HStack, useDisclosure } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const CollapseCheckbox: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle} colorScheme="red" variant="link">
        {!isOpen ? " развернуть список" : "свернуть список"}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <HStack flexWrap={"wrap"} mt={4}>{children}</HStack>
      </Collapse>
    </>
  );
};
