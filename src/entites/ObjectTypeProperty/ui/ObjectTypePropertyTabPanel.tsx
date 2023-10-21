import { SlideFade, TabPanel } from "@chakra-ui/react";
import { FC, PropsWithChildren, memo } from "react";
export interface ObjectTypePropertyTabPanelProps {
  index: number;
  tabIndex: number;
}
export const ObjectTypePropertyTabPanel: FC<
  PropsWithChildren<ObjectTypePropertyTabPanelProps>
> = memo((props) => {
  const { index, tabIndex, children } = props;
  return (
    <TabPanel px={0}>
      <SlideFade in={index == tabIndex} offsetY={"60px"}>
        {children}
      </SlideFade>
    </TabPanel>
  );
});
