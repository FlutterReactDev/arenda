import { Box, Heading } from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode } from "react";
interface ObjectDetailInfoCardProps {
  title: ReactNode;
}
export const ObjectDetailInfoCard: FC<
  PropsWithChildren<ObjectDetailInfoCardProps>
> = (props) => {
  const { title, children } = props;
  return (
    <Box rounded={"lg"} bgColor={"white"} p={4}>
      <Heading fontSize={"22px"}>{title}</Heading>
      <Box mt={4}>{children}</Box>
    </Box>
  );
};
