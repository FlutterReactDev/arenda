import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { Link } from "react-router-dom";
import { useObjectTable } from "../model/useObjectTable";
import { ReactTable } from "./ReactTable";

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
            size={"md"}
            variant={"outline"}
            as={Link}
            to={RouteName.ADD_OBJECT}
            bgColor={"white"}
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
