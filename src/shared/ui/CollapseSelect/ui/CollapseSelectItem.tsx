import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";

interface CollapseSelectItemProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  onClose: () => void;
  selected: boolean;
 
}

export const CollapseSelectItem: FC<CollapseSelectItemProps> = memo((props) => {
  const { label, onChange, value, onClose, selected } = props;

  const onSelect = () => {
    onChange(value);
    onClose();
  };
  return (
    <Box
      _hover={{
        bgColor: "white",
      }}
      transition={"0.3s all"}
      onClick={onSelect}
      p={2}
      w="full"
      cursor={"pointer"}
      rounded={"lg"}
      fontWeight={"medium"}
      {...(selected && {
        bgColor: "white",
      })}
    >
      {label}
    </Box>
  );
});
