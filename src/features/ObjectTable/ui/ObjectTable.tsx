import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";
import { useObjectTable } from "../model/useObjectTable";
import { ReactTable } from "./ReactTable";

export const ObjectTable = () => {
  const { columns, data, isLoading, isSuccess } = useObjectTable();

  return (
    <>
      <Stack>
        <HStack justifyContent={"space-between"}>
          <Heading>{data.length}</Heading>
          <Button size={"lg"} variant={"outline"}>
            Создать новое объявление
          </Button>
        </HStack>
        {isSuccess && <ReactTable columns={columns} data={data} />}
      </Stack>

      {isLoading && <PageLoader />}
    </>
  );
};
