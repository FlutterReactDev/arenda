import { Box, Center, CircularProgress } from "@chakra-ui/react";
import { useGetObjectImageQuery } from "@entites/Object";
import { FC, lazy, Suspense } from "react";
const Slider = lazy(() => import("@entites/Object/ui/ObjectDetailSlider"));
interface ImageLoaderProps {
  id: string;
}
export const ImageLoader: FC<ImageLoaderProps> = (props) => {
  const { id } = props;
  const { data, isSuccess } = useGetObjectImageQuery(id);

  return (
    <Box mt={4} w={"100%"}>
      <Suspense
        fallback={
          <Center>
            <CircularProgress isIndeterminate color="red.600" />
          </Center>
        }
      >
        {isSuccess && <Slider images={data.items} />}
      </Suspense>
    </Box>
  );
};
