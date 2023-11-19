import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { SelectLocationForm } from "@features/SelectLocationForm";

const AddObjectPage = () => {
  return (
    <Box bgColor={"gray.100"}>
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
            <SelectLocationForm />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddObjectPage;
