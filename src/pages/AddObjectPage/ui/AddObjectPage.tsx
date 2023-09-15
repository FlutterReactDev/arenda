import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { AddObjectForm } from "@features/AddObjectForm";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";

const AddObjectPage = () => {
  return (
    <Box bgColor={"gray.100"}>
      <Header />
      <Box as="main" pt={8} pb={20}>
        <Container maxW="container.xl">
          <Heading textAlign={"center"}>
            Сдавайте своё жильё на Turak.kg
          </Heading>
          <Text textAlign={"center"} mt={2}>
            Бесплатное размещение объявлений, оплата только за успешные
            бронирования
          </Text>
          <Box mt={4}>
            <AddObjectForm />
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AddObjectPage;
