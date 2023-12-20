import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  useDeleteObjectMutation,
  useGetAllObjectsQuery,
} from "@entites/Object";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";
import { ObjectNotHotel } from "./types";

export const useObjectTable = () => {
  const toast = useToast();
  const { data: objects, isLoading, isSuccess } = useGetAllObjectsQuery();
  const [deleteObject, { isLoading: deleteIsLoading }] =
    useDeleteObjectMutation();
  const data: ObjectNotHotel[] = isSuccess
    ? objects?.map((object) => {
        return {
          announcement: {
            fullAddress: object.fullAddress,
            name: object.name,
            image:
              "data:image/jpeg;base64,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",
            id: object.id,
          },
          instantBooking: false,
          lastChange: new Date(),
          calendar: true,
          todayPrice: 1500,
        };
      })
    : [];

  const onDeleteObject = (id: number, objectInfo: ObjectNotHotel) => {
    deleteObject(id)
      .unwrap()
      .then(() => {
        toast({
          title: "Удаление",
          description: `Удален объект ${objectInfo.announcement.name}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const columnHelper = createColumnHelper<ObjectNotHotel>();

  const columns = [
    columnHelper.accessor("announcement", {
      cell: (info) => {
        const { fullAddress, image, id, name } = info.getValue();
        return (
          <HStack>
            <Stack>
              <Text fontWeight={"medium"} color={"gray.500"}>
                № {id}
              </Text>

              <Image
                rounded={"lg"}
                w="24"
                h="24"
                objectFit={"cover"}
                src={image}
              />
            </Stack>
            <Stack maxW="200px" w="full">
              <Text
                fontWeight={"medium"}
                fontSize={"lg"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
              >
                {name}
              </Text>
              <Text color={"gray.500"}>{fullAddress}</Text>
            </Stack>
          </HStack>
        );
      },
      header: "Объявление",
    }),
    columnHelper.accessor("instantBooking", {
      cell: (info) => {
        return (
          <>
            {info.getValue() ? (
              <Text fontWeight={"medium"} color={"green.600"}>
                Включено
              </Text>
            ) : (
              <Text fontWeight={"medium"} color={"red.500"}>
                Выключено
              </Text>
            )}
          </>
        );
      },
      header: "Мгновенное бронирование",
    }),
    columnHelper.accessor("calendar", {
      cell: (info) => {
        return (
          <Text fontWeight={"medium"}>
            сегодня {info.getValue() ? "свободно" : "зането"}
          </Text>
        );
      },

      header: "Календарь",
    }),
    columnHelper.accessor("todayPrice", {
      cell: (info) => {
        return <Text fontWeight={"medium"}>{info.getValue()} сом</Text>;
      },

      header: "Цена на сегодня",
    }),
    columnHelper.accessor("lastChange", {
      cell: (info) =>
        format(info.getValue(), "dd MMM yyyy, kk:mm", {
          locale: ru,
        }),
      header: "Последнее изменение",
    }),

    columnHelper.display({
      id: "edit",
      cell: ({ row }) => {
        return (
          <Popover>
            <PopoverTrigger>
              <IconButton aria-label="settings">
                <SettingsIcon />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent maxW={"60"} w="full">
              <PopoverBody>
                <PopoverArrow />
                <Stack>
                  <Button
                    as={Link}
                    to={`/hotel/${row.original.announcement.id}/edit-hotel`}
                    leftIcon={<EditIcon />}
                  >
                    Редактировать
                  </Button>
                  <Button
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    isLoading={deleteIsLoading}
                    loadingText={deleteIsLoading}
                    onClick={() =>
                      onDeleteObject(row.original.announcement.id, row.original)
                    }
                  >
                    Удалить
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];

  return {
    data,
    isLoading,
    isSuccess,
    columns,
  };
};
