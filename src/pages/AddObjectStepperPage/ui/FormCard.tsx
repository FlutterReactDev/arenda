import { Stack, Text, Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface FormCardProps {
  title?: string;
}

export const FormCard: FC<PropsWithChildren<FormCardProps>> = (props) => {
  const { title, children } = props;
  return (
    <Stack bgColor="white" p="4" boxShadow="lg" borderRadius="xl">
      {title && (
        <Stack direction="row" alignItems="center" mb={2}>
          <Text fontSize={"lg"} fontWeight="semibold">
            {title}
          </Text>
        </Stack>
      )}

      <Box>{children}</Box>
    </Stack>
  );
};
