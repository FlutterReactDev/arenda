import { useEditObjectMutation, useGetObjectByIdQuery } from "@entites/Object";
import { useParams } from "react-router-dom";
import { EditHotelInfo, EditPositionData } from "./types";

export const useEditHotel = () => {
  const { hotelId } = useParams();
  const {
    data: objectData,
    isSuccess,
    isLoading,
  } = useGetObjectByIdQuery(hotelId as string);

  const [editObject, { isLoading: editIsLoading }] = useEditObjectMutation();

  const updateHotelGeneralInfo = (data: EditHotelInfo) => {
    if (objectData) {
      editObject({
        data: { ...objectData, ...data },
        anObjectId: Number(hotelId),
      });
    }
  };

  const updatePositionData = (data: EditPositionData) => {
    if (objectData) {
      editObject({
        data: { ...objectData, ...data },
        anObjectId: Number(hotelId),
      });
    }
  };

  return {
    data: objectData,
    isSuccess,
    isLoading,
    editIsLoading,
    updateHotelGeneralInfo,
    updatePositionData,
  };
};
