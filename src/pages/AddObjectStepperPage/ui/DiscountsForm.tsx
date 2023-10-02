import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { CloseIcon } from "@chakra-ui/icons";

export const DiscountsForm = () => {
  const onPrev = () => {};
  return (
    <Box as="form">
      <Stack spacing={2}>
        <FormCard title="Скидки">
          <Alert status="info">
            <AlertIcon />
            <Text fontSize={"small"}>
              Предложите гостям скидку при длительном проживании, чтобы повысить
              занятость жилья. Скидку можно указать в в рублях (для каждых суток
              проживания) или в процентах (от общей стоимости).
            </Text>
          </Alert>

          <Stack spacing={2} mt={2}>
            <FormControl>
              <FormLabel>Делать скидку</FormLabel>
              <Select>
                <option value="absolute">в рублях</option>
                <option value="relative">в процентах</option>
              </Select>
            </FormControl>
            <HStack>
              <FormControl>
                <Select>
                  <option value="2">при проживании от 2 дней</option>
                  <option value="3">при проживании от 3 дней</option>
                  <option value="4">при проживании от 4 дней</option>
                  <option value="5">при проживании от 5 дней</option>
                  <option value="6">при проживании от 6 дней</option>
                  <option value="7">при проживании от 7 дней</option>
                  <option value="8">при проживании от 8 дней</option>
                  <option value="9">при проживании от 9 дней</option>
                  <option value="10">при проживании от 10 дней</option>
                  <option value="11">при проживании от 11 дней</option>
                  <option value="12">при проживании от 12 дней</option>
                  <option value="13">при проживании от 13 дней</option>
                  <option value="14">при проживании от 14 дней</option>
                  <option value="15">при проживании от 15 дней</option>
                  <option value="16">при проживании от 16 дней</option>
                  <option value="17">при проживании от 17 дней</option>
                  <option value="18">при проживании от 18 дней</option>
                  <option value="19">при проживании от 19 дней</option>
                  <option value="20">при проживании от 20 дней</option>
                  <option value="21">при проживании от 21 дня</option>
                  <option value="22">при проживании от 22 дней</option>
                  <option value="23">при проживании от 23 дней</option>
                  <option value="24">при проживании от 24 дней</option>
                  <option value="25">при проживании от 25 дней</option>
                  <option value="26">при проживании от 26 дней</option>
                  <option value="27">при проживании от 27 дней</option>
                  <option value="28">при проживании от 28 дней</option>
                  <option value="29">при проживании от 29 дней</option>
                  <option value="30">при проживании от 30 дней</option>
                  <option value="45">при проживании от 45 дней</option>
                  <option value="60">при проживании от 60 дней</option>
                  <option value="90">при проживании от 90 дней</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input type="number" />
                  <InputRightElement>$</InputRightElement>
                </InputGroup>
              </FormControl>
              <IconButton
                aria-label="delete discount"
                colorScheme="blackAlpha"
                rounded={"full"}
                size={"sm"}
              >
                <CloseIcon />
              </IconButton>
            </HStack>
            <Button
              variant={"link"}
              colorScheme="red"
              textAlign={"left"}
              w={"max-content"}
            >
              + добавить ещё
            </Button>
          </Stack>

          <Alert status="info" mt={2}>
            <AlertIcon />
            <Text fontSize={"small"}>
              Важно! Скидка действует на каждые сутки и на все типы цен (базовые
              и сезонные). Для каждой брони применяется только одна скидка —
              максимально подходящая к сроку проживания.
            </Text>
          </Alert>
        </FormCard>
        <FormCard>
          <HStack justifyContent={"space-between"}>
            <Button onClick={onPrev} colorScheme="gray" variant={"outline"}>
              Назад
            </Button>
            <Button type="submit" colorScheme="red">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </Stack>
    </Box>
  );
};
