import { Button, HStack } from "@chakra-ui/react";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
interface FormNavigationProps {
  onPrev?: () => void;
  onNext?: () => void;
}
export const FormNavigation: FC<FormNavigationProps> = (props) => {
  const { onPrev } = props;
  return (
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
  );
};
