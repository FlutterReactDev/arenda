import { useToast } from "@chakra-ui/react";
import {
  useDeleteObjectMutation,
  useGetObjectsWithRoomsQuery,
} from "@entites/Object";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { RoomTableType } from "./types";

export const useObjectTable = () => {
  const toast = useToast();
  const { data, isLoading, isSuccess } = useGetObjectsWithRoomsQuery();

  const [deleteObject, { isLoading: deleteIsLoading }] =
    useDeleteObjectMutation();

  const onDeleteObject = (id: number, objectInfo: RoomTableType) => {
    deleteObject(id)
      .unwrap()
      .then(() => {
        toast({
          duration: 3000,
          isClosable: true,
          position: "top-right",
          render: ({ onClose }) => {
            return (
              <ErrorAlert
                title="Удаление"
                description={`Удален объект ${objectInfo.announcement.name}`}
                onClose={onClose}
              />
            );
          },
        });
      });
  };

  return {
    data,
    isLoading,
    isSuccess,
    onDeleteObject,
    deleteIsLoading,
  };
};
