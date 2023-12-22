import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetCurrenciesQuery } from "@entites/CommonReference";
import { useUser } from "@entites/User";

export const CurrencySwitcher = () => {
  const { changeCurrency, currentCurrency } = useUser();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { data, isSuccess } = useGetCurrenciesQuery();

  const onCurrencyChange = (value: string) => {
    if (data && isSuccess) {
      const currency = data.filter(({ id }) => id == Number(value))[0];
      changeCurrency(currency);
    }

    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          variant={"outline"}
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          {currentCurrency.symbol}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <RadioGroup
            onChange={onCurrencyChange}
            value={`${currentCurrency.id}`}
          >
            <Stack fontWeight={"medium"}>
              {data &&
                isSuccess &&
                data.map(({ id, name, symbol }) => (
                  <Radio size={"lg"} key={id} value={id.toString()}>
                    {symbol} - {name}
                  </Radio>
                ))}
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
