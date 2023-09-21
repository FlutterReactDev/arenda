import { Box, Center, CircularProgress } from "@chakra-ui/react";

export const PageLoader = () => {
  return (
    <Box h="100vh">
      <Center h={"full"}>
        <CircularProgress isIndeterminate color="red.600" />
      </Center>
    </Box>
  );
};
