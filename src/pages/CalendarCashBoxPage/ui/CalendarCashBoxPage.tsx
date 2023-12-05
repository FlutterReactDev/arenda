import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

const CalendarCashBoxPage = () => {
  return (
    <Box p={4}>
      <Heading>Касса</Heading>
      <Stat>
        <StatLabel>По состоянию на 04.12.2023</StatLabel>
        <StatNumber>0.00 KGS</StatNumber>
        <StatHelpText>За период с 01.12.2023 по 04.12.2023</StatHelpText>
      </Stat>
      <FormControl>
        <FormLabel>Период</FormLabel>
        <HStack>
                    
        </HStack>
      </FormControl>
    </Box>
  );
};

export default CalendarCashBoxPage;
