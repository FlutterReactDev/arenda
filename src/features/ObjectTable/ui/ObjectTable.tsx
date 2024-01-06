import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { ObjectTableType } from "../model/types";
import { useObjectTable } from "../model/useObjectTable";
import { ObjectAnnouncement } from "./ObjectAnnouncement";
import { ReactTable } from "./ReactTable";
import { ObjectResponse } from "@entites/Object";
import { RoomResponse } from "@entites/Object/model/types/room";
import { FC } from "react";
interface ObjectTableProps {
  object: ObjectResponse;
  room: RoomResponse;
}
export const ObjectTable: FC<ObjectTableProps> = (props) => {
  const { object, room } = props;
  const { deleteIsLoading, onDeleteObject } = useObjectTable();
  const columnHelper = createColumnHelper<ObjectTableType>();

  const columns = [
    columnHelper.accessor("announcement", {
      cell: (info) => {
        return <ObjectAnnouncement {...info.getValue()} />;
      },
      header: "Объявление",
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
                    to={`/object/${row.original.announcement.id}/edit-object`}
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

  const data = [
    {
      announcement: {
        name: object.name,
        image:
          "https://cachizer2.2gis.com/reviews-photos/9a462c00-369a-474e-97be-c34ed0801f37.jpg",
        id: room.id,
        fullAddress: object.fullAddress,
      },
      calendar: true,
      todayPrice: 1500,
    },
  ];
  return <ReactTable columns={columns} data={data} />;
};
