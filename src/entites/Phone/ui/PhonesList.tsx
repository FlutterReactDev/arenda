import { IconButton, useRadioGroup, Text, SimpleGrid } from "@chakra-ui/react";
import { FieldArrayWithId } from "react-hook-form";
import { FC } from "react";

import { PhoneRadioButton } from "..";
import { DeleteIcon } from "@chakra-ui/icons";
interface PhonesListProps {
  onChange: (nextValue: string) => void;
  fields: FieldArrayWithId<
    {
      phoneNumbers?:
        | {
            isMain?: boolean | undefined;
            phoneNumber: string;
          }[]
        | undefined;
    },
    "phoneNumbers",
    "id"
  >[];
  onDelete: (phone: string) => void;
}

export const PhonesList: FC<PhonesListProps> = (props) => {
  const { fields, onChange, onDelete } = props;
  const getDefaultValue = () => {
    if (fields.length == 1) {
      return fields[0]?.phoneNumber;
    } else if (fields.length > 1) {
      return fields.filter(({ isMain }) => isMain)[0].phoneNumber;
    }
  };
  const { getRadioProps } = useRadioGroup({
    name: "phoneNumbers",
    defaultValue: getDefaultValue() || undefined,
    onChange: (nextValue) => {
      onChange(nextValue);
    },
  });

  return (
    <SimpleGrid columns={[1, 2, 3]} spacingY={5} spacing={2}>
      {fields.map(({ id, phoneNumber }) => {
        const radio = getRadioProps({ value: phoneNumber });

        return (
          <PhoneRadioButton key={id} {...radio}>
            <Text fontSize={"sm"} fontWeight="medium">
              {phoneNumber}
            </Text>

            <IconButton
              onClick={() => onDelete(phoneNumber)}
              aria-label={"delete phone"}
            >
              <DeleteIcon />
            </IconButton>
          </PhoneRadioButton>
        );
      })}
    </SimpleGrid>
  );
};
