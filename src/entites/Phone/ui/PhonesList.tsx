import { HStack, useRadioGroup } from "@chakra-ui/react";
import { FieldArrayWithId } from "react-hook-form";
import { FC } from "react";

import { PhoneRadioButton } from "..";

interface PhonesListProps {
  onChange: (nextValue: string) => void;
  fields: FieldArrayWithId<
    {
      phoneNumbers?:
        | {
            phoneNumber: string;
            isMain: NonNullable<boolean | undefined>;
          }[]
        | undefined;
    },
    "phoneNumbers",
    "id"
  >[];
}

export const PhonesList: FC<PhonesListProps> = (props) => {
  const { fields, onChange } = props;

  const { getRadioProps } = useRadioGroup({
    name: "phoneNumbers",
    defaultValue: fields && fields[0]?.phoneNumber,
    onChange: (nextValue) => {
      onChange(nextValue);
    },
  });
  return (
    <HStack flexWrap={"wrap"}>
      {fields.map(({ id, phoneNumber }) => {
        const radio = getRadioProps({ value: phoneNumber });

        return (
          <PhoneRadioButton key={id} {...radio}>
            {phoneNumber}
          </PhoneRadioButton>
        );
      })}
    </HStack>
  );
};
