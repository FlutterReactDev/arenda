import { ClusterTarget } from "@2gis/mapgl-clusterer";
import { Flex, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
interface ObjectCluster {
  pointsCount: number;
  target: ClusterTarget;
}
export const ObjectCluster: FC<ObjectCluster> = memo((props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pointsCount, target } = props;

  return (
    <Flex
      w={8}
      h={8}
      border="3px solid"
      borderColor={"red.600"}
      cursor={"pointer"}
      rounded="full"
      _hover={{
        color: "white",
        bgColor: "red.600",
      }}
      color={"red.600"}
      transition={"0.3s all"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Text fontWeight={"medium"}>{pointsCount}</Text>
    </Flex>
  );
});
