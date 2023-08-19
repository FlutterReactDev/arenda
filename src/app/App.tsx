import { Center, Heading } from "@chakra-ui/react";
import { MainSearch } from "@features/MainSearch";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Heading color="blackAlpha.900" size="3xl" textAlign="center" mt={32}>
          Найдём, где остановиться!
        </Heading>
        <Center>
          <MainSearch />
        </Center>
      </main>
      <Footer />
    </>
  );
};
