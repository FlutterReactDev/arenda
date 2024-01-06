import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useUser } from "@entites/User";
import {
  useGetVerifyEmailQuery,
  useVerifyEmailMutation,
} from "@entites/User/model/api/userApi";
import { VerifyEmail } from "@entites/User/model/types/UserType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { PageLoader } from "@shared/ui/PageLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const toast = useToast();
  const [token, setToken] = useState("");
  const { currentUser, getMe } = useUser();
  const {
    data: verifyEmailMessage,
    isLoading: getVerifyIsLoading,
    isSuccess: getVerifyEmailIsSuccess,
  } = useGetVerifyEmailQuery();

  const [verifyEmail, { isLoading: verifyIsLoading }] =
    useVerifyEmailMutation();
  const navigate = useNavigate();
  const onSubmit = () => {
    if (token.length == 5) {
      verifyEmail(token)
        .unwrap()
        .then((data) => {
          toast({
            isClosable: true,
            duration: 3000,
            position: "top-right",
            render({ onClose }) {
              return (
                <SucessAlert
                  title="Верификация почты"
                  description={data.result}
                  onClose={onClose}
                />
              );
            },
          });
          getMe()?.then(() => {
            navigate(RouteName.MAIN_PAGE);
          });
        })
        .catch((error: FetchBaseQueryError) => {
          const verifyError = error.data as VerifyEmail;

          toast({
            isClosable: true,
            duration: 3000,
            position: "top-right",
            render({ onClose }) {
              return (
                <ErrorAlert
                  title={verifyError.message}
                  description={verifyError.result}
                  onClose={onClose}
                />
              );
            },
          });
        });
    }
  };

  if (getVerifyIsLoading) {
    return <PageLoader />;
  }

  if (getVerifyEmailIsSuccess) {
    return (
      <Flex minH={"70vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"2xl"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Подтвердите Ваш электронный адрес
            </Heading>
          </Center>

          <Text fontWeight={"medium"} color={"gray.500"} textAlign={"center"}>
            {verifyEmailMessage.result}
          </Text>
          <Text fontWeight={"medium"} color={"gray.800"} textAlign={"center"}>
            {currentUser?.email}
          </Text>
          <Center
            fontSize={"xl"}
            fontWeight="medium"
            color={"gray.800"}
          ></Center>
          <FormControl>
            <Center>
              <HStack>
                <PinInput size="lg" onChange={setToken} value={token}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              isDisabled={token.length != 5}
              onClick={onSubmit}
              colorScheme="red"
              isLoading={verifyIsLoading}
            >
              Подтвердить
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }

  return <></>;
};

export default VerifyPage;
