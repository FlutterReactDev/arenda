import { SimpleGrid, useRadioGroup, Text } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { ObjectCardRadio } from "./ObjectCardRadio";
interface ObjectTypes {
  value: string;
  id: number;
}
interface ObjectSelectListProps {
  onChange: (nextValue: string) => void;
  objectTypes: ObjectTypes[];
  value: number | undefined;
}
export const ObjectSelectList: FC<ObjectSelectListProps> = (props) => {
  const { objectTypes, onChange, value } = props;

  const getDefaultValue = useCallback(() => {
    return objectTypes[0].id.toString();
  }, [objectTypes]);

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: "objectType",
    defaultValue: getDefaultValue() || undefined,
    value: value?.toString(),
    onChange: (nextValue) => {
      onChange(nextValue);
    },
  });
  const group = getRootProps();
  return (
    <SimpleGrid {...group} columns={[1, 2, 3, 4]} spacing={6}>
      {objectTypes.map(({ value, id }) => {
        const radio = getRadioProps({ value: id.toString() });

        return (
          <ObjectCardRadio key={id} {...radio}>
            <Text>{value}</Text>
          </ObjectCardRadio>
        );
      })}
    </SimpleGrid>
  );
};
