import { PhoneIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { FC } from "react";
import { usePhoneInput } from "react-international-phone";

export const PhoneInput: FC<InputProps> = (props) => {
  const { value, onChange } = props;
  const phoneInput = usePhoneInput({
    defaultCountry: "kg",
    forceDialCode: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    value,
    onChange: (data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onChange && onChange(data.phone);
    },
  });

  return (
    <InputGroup>
      <InputLeftElement>
        <PhoneIcon />
      </InputLeftElement>
      <Input
        {...props}
        type="tel"
        value={phoneInput.phone}
        onChange={phoneInput.handlePhoneValueChange}
        ref={phoneInput.inputRef}
      />
    </InputGroup>
  );
};
