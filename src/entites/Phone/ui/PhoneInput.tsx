import { Box, Button, HStack, Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
export const PhoneInput: FC<InputProps> = (props) => {
  const { value, onChange, ...otherProps } = props;
  const phoneInput = usePhoneInput({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    value,
    defaultCountry: "kg",
    onChange: (data) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onChange && onChange(data.phone);
    },
  });

  return (
    <>
      <HStack spacing={0} position={"relative"}>
        <Box
          position={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          left={1}
          zIndex={"9"}
        >
          <CountrySelector
            selectedCountry={phoneInput.country}
            onSelect={({ iso2 }) => phoneInput.setCountry(iso2)}
            renderButtonWrapper={({ children, rootProps }) => {
              return (
                <Button
                  bgColor={"transparent"}
                  p={0}
                  size={"sm"}
                  {...rootProps}
                >
                  {children}{" "}
                </Button>
              );
            }}
          />
        </Box>

        <Input
          pl={12}
          {...props}
          type="tel"
          value={phoneInput.phone}
          onChange={phoneInput.handlePhoneValueChange}
          ref={phoneInput.inputRef}
          {...otherProps}
        />
      </HStack>
    </>
  );
};
