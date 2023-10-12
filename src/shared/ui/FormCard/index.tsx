import { Stack, Text, Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface FormCardProps {
  title?: string;
  w?: "full";
}

export const FormCard: FC<PropsWithChildren<FormCardProps>> = (props) => {
  const { title, children, w } = props;
  return (
    <Stack
      bgColor="white"
      p="4"
      boxShadow="lg"
      borderRadius="xl"
      {...(w == "full" && {
        w: "full",
      })}
    >
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
