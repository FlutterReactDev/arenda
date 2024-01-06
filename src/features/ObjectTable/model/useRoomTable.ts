import {
  useDeleteObjectMutation,
  useGetObjectsWithRoomsQuery,
} from "@entites/Object";

export const useRoomTable = () => {
  const { data, isLoading, isSuccess } = useGetObjectsWithRoomsQuery();

  const [deleteObject, { isLoading: deleteIsLoading }] =
    useDeleteObjectMutation();

  const onDeleteObject = (id: number) => {
    return deleteObject(id).unwrap();
  };

  return {
    data,
    isLoading,
    isSuccess,
    onDeleteObject,
    deleteIsLoading,
  };
};
