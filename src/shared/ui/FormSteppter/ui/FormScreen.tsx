import { SlideFade } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
interface FormScreenProps {
  isIn: boolean;
}
export const FormScreen: FC<PropsWithChildren<FormScreenProps>> = (props) => {
  const { isIn, children } = props;

  return (
    <SlideFade in={isIn} offsetY={0} offsetX={"60px"}>
      {children}
    </SlideFade>
  );
};
