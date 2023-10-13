import { HStack, useCheckboxGroup } from "@chakra-ui/react";
import { FC } from "react";
import { CheckboxCard } from "./ui/CheckboxCard";
export interface CheckboxListProps {
  value: (string | number)[];
  defaultValue?: (string | number)[];
  checkboxes: {
    label: string;
    value: number | string;
  }[];
  onChange: (value: (string | number)[]) => void;
}
export const CheckboxList: FC<CheckboxListProps> = (props) => {
  const { defaultValue, value, checkboxes, onChange } = props;
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue,
    value,
    onChange(value) {
      onChange(value);
    },
  });

  return (
    <HStack flexWrap={"wrap"}>
      {checkboxes.map(({ label, value }) => {
        return (
          <CheckboxCard {...getCheckboxProps({ value })}>{label}</CheckboxCard>
        );
      })}
    </HStack>
  );
};
