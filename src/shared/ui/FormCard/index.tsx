import { Stack, Text, Box } from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode } from "react";

interface FormCardProps {
  title?: ReactNode;
  w?: "full";
  disableBg?: boolean;
  disableShadow?: boolean;
}

export const FormCard: FC<PropsWithChildren<FormCardProps>> = (props) => {
  const {
    title,
    children,
    w,
    disableBg = false,
    disableShadow = false,
  } = props;
  return (
    <Stack
      {...(!disableBg && {
        bgColor: "white",
      })}
      {...(disableBg && {
        bgColor: "none",
      })}
      {...(!disableShadow && {
        boxShadow: "lg",
      })}
      {...(disableShadow && {
        boxShadow: "none",
      })}
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
