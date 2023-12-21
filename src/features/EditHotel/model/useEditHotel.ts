import {
  useDeleteObjectMutation,
  useEditObjectMutation,
  useGetObjectByIdQuery,
} from "@entites/Object";
import { useParams } from "react-router-dom";
import { EditHotelInfo, EditPositionData } from "./types";

export const useEditHotel = () => {
  const { hotelId } = useParams();

  const {
    data: objectData,
    isSuccess,
    isLoading,
  } = useGetObjectByIdQuery(hotelId as string);
  const [deleteObject, { isLoading: deleteIsLoading }] =
    useDeleteObjectMutation();
  const [editObject, { isLoading: editIsLoading }] = useEditObjectMutation();

  const updateHotelGeneralInfo = (data: EditHotelInfo) => {
    if (objectData) {
      return editObject({
        data: { ...objectData, ...data },
        anObjectId: Number(hotelId),
      }).unwrap();
    }
  };

  const updatePositionData = (data: EditPositionData) => {
    if (objectData) {
      return editObject({
        data: { ...objectData, ...data },
        anObjectId: Number(hotelId),
      }).unwrap();
    }
  };

  return {
    data: objectData,
    isSuccess,
    isLoading,
    editIsLoading,
    updateHotelGeneralInfo,
    updatePositionData,
    deleteObject,
    deleteIsLoading,
  };
};
