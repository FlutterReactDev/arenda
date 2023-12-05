import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CalendarStatPage = () => {
  return (
    <Box p={4}>
      <Heading>Общая статистика</Heading>
      <TableContainer mt={4}>
        <Table size={"lg"} variant="simple">
          <Thead>
            <Tr>
              <Th>Период</Th>
              <Th>Заезды (чел.)</Th>
              <Th>Выезды (чел.)</Th>
              <Th>Занято номеров (чел.)</Th>
              <Th>Свободно номеров</Th>
              <Th>Загрузка</Th>
              <Th>Доход</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
            <Tr>
              <Td>01.12.2023, Пт</Td>
              <Td>1 (14)</Td>
              <Td>0 (0)</Td>
              <Td>12 (168)</Td>
              <Td>23</Td>
              <Td> 34%</Td>
              <Td> 9 460</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Итого суммарно за период</Th>
              <Th>53</Th>
              <Th>63</Th>
              <Th> 178 (2413)</Th>
              <Th> 907</Th>
              <Th> 17%</Th>
              <Th>159 820</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CalendarStatPage;
