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
import { RoomResponse } from "@entites/Object/model/types/room";
import { createColumnHelper } from "@tanstack/react-table";
import { FC } from "react";
import { Link } from "react-router-dom";
import { RoomTableType } from "../model/types";
import { useObjectTable } from "../model/useObjectTable";
import { ReactTable } from "./ReactTable";
import { RoomAnnouncement } from "./RoomAnnouncement";
interface RoomTableProps {
  rooms: RoomResponse[];
}
export const RoomTable: FC<RoomTableProps> = (props) => {
  const { rooms } = props;
  const columnHelper = createColumnHelper<RoomTableType>();
  const { deleteIsLoading, onDeleteObject } = useObjectTable();
  const columns = [
    columnHelper.accessor("announcement", {
      cell: (info) => {
        return <RoomAnnouncement {...info.getValue()} />;
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
                    to={`/hotel/${row.original.announcement.id}/edit-room`}
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

  return (
    <ReactTable
      columns={columns}
      data={rooms.map(({ anObjectRoomDescription: { ownName }, id }) => {
        return {
          announcement: {
            name: ownName,
            image:
              "https://cachizer2.2gis.com/reviews-photos/9a462c00-369a-474e-97be-c34ed0801f37.jpg",
            id,
          },
          calendar: true,
          todayPrice: 1500,
        };
      })}
    />
  );
};
