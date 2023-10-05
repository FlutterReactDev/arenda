import { Stack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const FormContainer: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Stack spacing={2}>{children}</Stack>;
};
