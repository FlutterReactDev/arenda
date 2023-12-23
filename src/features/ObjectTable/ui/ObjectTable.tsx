import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Button, HStack, Heading, Icon, Stack } from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { BsPlusLg } from "react-icons/bs";
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
            as={Link}
            to={RouteName.ADD_OBJECT}
            colorScheme="facebook"
            rightIcon={<Icon as={BsPlusLg} />}
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
