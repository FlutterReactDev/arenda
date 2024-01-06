import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { Stack, HStack, Heading, Button, Icon, Text } from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useObjectTable } from "../model/useObjectTable";
import { RoomTable } from "./RoomTable";
import { ObjectTable } from "..";

export const Table = () => {
  const { data, isLoading, isSuccess } = useObjectTable();

  return (
    <>
      {isSuccess && data && (
        <Stack spacing={10}>
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

          <Stack spacing={20}>
            {data.map(
              (
                { isHotel, rooms, id, fullAddress, objectPropertyName },
                _,
                arr
              ) => {
                return (
                  <Stack spacing={4}>
                    <Stack>
                      <Heading size={"lg"}>{objectPropertyName}</Heading>
                      {isHotel && (
                        <HStack>
                          <Text fontWeight={"medium"} color={"gray.500"}>
                            {rooms.length}{" "}
                            {getWordByNum(rooms.length, [
                              "номер",
                              "номера",
                              "номеров",
                            ])}
                            ,
                          </Text>

                          <Text fontWeight={"medium"} color={"gray.500"}>
                            {fullAddress}
                          </Text>
                        </HStack>
                      )}

                      {isHotel && (
                        <HStack>
                          <Button
                            as={Link}
                            to={`/hotel/${id}/edit-hotel`}
                            colorScheme="facebook"
                            leftIcon={<EditIcon />}
                          >
                            Редактировать информацию об отеле
                          </Button>

                          <Button
                            as={Link}
                            to={`/hotel/${id}/create-room`}
                            colorScheme="facebook"
                            leftIcon={<AddIcon />}
                          >
                            Добавить номер
                          </Button>
                        </HStack>
                      )}
                    </Stack>
                    <Stack>
                      {isHotel && <RoomTable rooms={rooms} />}
                      {!isHotel && (
                        <ObjectTable object={arr[0]} room={rooms[0]} />
                      )}
                    </Stack>
                  </Stack>
                );
              }
            )}
          </Stack>
        </Stack>
      )}

      {isLoading && <PageLoader />}
    </>
  );
};
