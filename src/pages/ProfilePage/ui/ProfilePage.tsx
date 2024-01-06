import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useUser } from "@entites/User";
import { ProfileSidebar } from "@widgets/ProfileSidebar";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useUser();
  return (
    <Box bgColor={"blackAlpha.50"} p={5}>
      <Container maxW={"1400px"}>
        <Grid
          templateAreas={{
            base: `"header" "sidebar" "content"`,
            md: `"header header" "sidebar content"`,
          }}
          templateColumns={{ base: "1fr", md: "300px 1fr" }}
          templateRows={{ base: "auto auto auto", md: "100px 1fr" }}
          minH={"100dvh"}
          rowGap={4}
          columnGap={2}
        >
          <GridItem area={"header"} p={4} bgColor={"white"} rounded={"lg"}>
            {currentUser && (
              <HStack spacing={4}>
                <Avatar size={"lg"} />
                <Stack spacing={0}>
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    {currentUser.name} {currentUser.surname}
                  </Text>
                  <Text color={"gray.500"} fontWeight={"medium"}>
                    {currentUser.email}
                  </Text>
                </Stack>
              </HStack>
            )}
          </GridItem>
          <GridItem area={"sidebar"} p={4} bgColor={"white"} rounded={"lg"}>
            <ProfileSidebar />
          </GridItem>

          <GridItem area={"content"} p={4} bgColor={"white"} rounded={"lg"}>
            <Outlet />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
export default ProfilePage;
