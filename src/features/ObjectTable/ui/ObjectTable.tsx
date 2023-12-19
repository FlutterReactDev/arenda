import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";
import { useObjectTable } from "../model/useObjectTable";
import { ReactTable } from "./ReactTable";
import { Link } from "react-router-dom";
import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { getWordByNum } from "@shared/utils/getWordByNum";

export const ObjectTable = () => {
  const { columns, data, isLoading, isSuccess } = useObjectTable();

  return (
    <>
      <Stack>
        <HStack justifyContent={"space-between"}>
          <Heading>
            {data.length}{" "}
            {getWordByNum(data.length, [
              "объявление",
              "объявления",
              "объявлений",
            ])}
          </Heading>
          <Button
            size={"lg"}
            variant={"outline"}
            as={Link}
            to={RouteName.ADD_OBJECT}
          >
            Создать новое объявление
          </Button>
        </HStack>
        {isSuccess && <ReactTable columns={columns} data={data} />}
      </Stack>

      {isLoading && <PageLoader />}
    </>
  );
};
