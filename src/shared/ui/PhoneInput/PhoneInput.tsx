import { Input, InputProps } from "@chakra-ui/react";
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
    <Input
      {...props}
      value={phoneInput.phone}
      onChange={phoneInput.handlePhoneValueChange}
      ref={phoneInput.inputRef}
    />
  );
};
