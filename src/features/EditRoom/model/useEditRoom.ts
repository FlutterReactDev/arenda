import { useEditRoomMutation, useGetRoomByIdQuery } from "@entites/Object";
import { CheckInCheckOutType } from "@entites/Object/model/schemas/checkInCheckOutSchema";
import { FacilitiesType } from "@entites/Object/model/schemas/facilitiesFormSchema";
import { GeneralRoomInformationType } from "@entites/Object/model/schemas/generalRoomInformatiomSchema";
import { PostingRulesType } from "@entites/Object/model/schemas/postingRulesSchema";
import { PriceFormType } from "@entites/Object/model/schemas/priceSchema";
import { RoomCategoryType } from "@entites/Object/model/schemas/roomCategorySchema";
import { RoomOptionalServiceType } from "@entites/Object/model/schemas/roomOptionalServiceSchema";
import { useParams } from "react-router-dom";

export const useEditRoom = () => {
  const { roomId } = useParams();
  const {
    data: roomData,
    isLoading: roomIsLoading,
    isSuccess: roomIsSuсcess,
  } = useGetRoomByIdQuery(roomId as string);

  const [editRoom, { isLoading: roomEditIsLoading }] = useEditRoomMutation();
  const updateFacilities = (data: FacilitiesType) => {
    const {
      roomAmenities,
      roomAvailability,
      roomForChildren,
      roomKitchenEquipment,
      roomEquipment,
      roomIndoorRelaxation,
      roomInfrastructureLeisureNearby,
      roomOutsideRelaxation,
      roomViewFromWindow,
    } = data;
    if (roomData && roomId) {
      return editRoom({
        data: {
          ...roomData,
          anObjectRoomAmenities: {
            ...roomData.anObjectRoomAmenities,
            ...roomAmenities,
          },
          anObjectRoomAvailability: {
            ...roomData.anObjectRoomAmenities,
            ...roomAvailability,
          },
          anObjectRoomForChildren: {
            ...roomData.anObjectRoomForChildren,
            ...roomForChildren,
          },
          anObjectRoomEquipment: {
            ...roomData.anObjectRoomEquipment,
            ...roomEquipment,
          },
          anObjectRoomInfrastructureLeisureNearby: {
            ...roomData.anObjectRoomInfrastructureLeisureNearby,
            ...roomInfrastructureLeisureNearby,
          },
          anObjectRoomOutsideRelaxation: {
            ...roomData.anObjectRoomOutsideRelaxation,
            ...roomOutsideRelaxation,
          },
          anObjectRoomIndoorRelaxation: {
            ...roomData.anObjectRoomIndoorRelaxation,
            ...roomIndoorRelaxation,
          },
          anObjectRoomKitchenEquipment: {
            ...roomData.anObjectRoomKitchenEquipment,
            ...roomKitchenEquipment,
          },
          anObjectRoomViewFromWindow: {
            ...roomData.anObjectRoomViewFromWindow,
            ...roomViewFromWindow,
          },
        },
        roomId,
      }).unwrap();
    }
  };

  const updatePostingRules = (data: PostingRulesType) => {
    if (roomData && roomId) {
      return editRoom({
        roomId,
        data: {
          ...roomData,
          anObjectRoomPostingRule: {
            ...roomData.anObjectRoomPostingRule,
            ...data,
          },
        },
      }).unwrap();
    }
  };

  const updateCheckInCheckOut = (data: CheckInCheckOutType) => {
    if (roomData && roomId) {
      return editRoom({
        roomId,
        data: {
          ...roomData,
          anObjectRoomBookingSettings: {
            ...roomData.anObjectRoomBookingSettings,
            ...data,
          },
        },
      }).unwrap();
    }
  };

  const updateBaseCost = (data: PriceFormType) => {
    if (roomData && roomId) {
      return editRoom({
        roomId,
        data: {
          ...roomData,
          anObjectRoomBaseCost: {
            ...roomData.anObjectRoomBaseCost,
            ...data,
          },
        },
      }).unwrap();
    }
  };

  const updateGeneralRoomInformation = (data: GeneralRoomInformationType) => {
    const {
      additionalBathroom,
      additionalToilet,
      area,
      bath,
      beds,
      bidet,
      count,
      floorType,
      floorsInTheBuilding,
      hairDryer,
      hygienicShower,
      maximumGuests,
      numberOfBathroomsWithOutToilet,
      numberOfBathroomsWithToilet,
      numberOfSeparateToilets,
      ownName,
      robe,
      roomNameTypeId,
      sauna,
      sharedBathroom,
      sharedShowerRoom,
      sharedToilet,
      shower,
      slippers,
      toiletries,
      towels,
      uniqueName,
    } = data;

    if (roomData && roomId) {
      console.log(roomData);

      const anObjectRoomBeds = [
        ...beds.map(({ bedType, count }) => ({
          id: 0,
          anObjectRoomId: roomData.id,
          bedType,
          count,
          isDelete: true,
        })),
      ];
      return editRoom({
        roomId,
        data: {
          ...roomData,
          anObjectRoomDescription: {
            ...roomData.anObjectRoomDescription,
            area,
            count,
            floorsInTheBuilding,
            uniqueName,
            ownName,
            roomNameTypeId,
            floorType,
          },
          anObjectRoomBathroom: {
            ...roomData.anObjectRoomBathroom,
            additionalBathroom,
            additionalToilet,
            bath,
            bidet,
            hairDryer,
            hygienicShower,
            numberOfBathroomsWithOutToilet,
            numberOfBathroomsWithToilet,
            numberOfSeparateToilets,
            robe,
            sauna,
            sharedBathroom,
            sharedShowerRoom,
            sharedToilet,
            shower,
            slippers,
            toiletries,
            towels,
          },
          maximumGuests,
          anObjectRoomBeds: [
            ...roomData.anObjectRoomBeds.map((bed) => ({
              ...bed,
              isDelete: true,
            })),
            ...anObjectRoomBeds,
          ],
        },
      }).unwrap();
    }
  };
  const updateOptionalService = (data: RoomOptionalServiceType) => {
    const { cleaningFeeType, cleaningAmount, depositAmount } = data;
    if (roomData && roomId) {
      return editRoom({
        roomId,
        data: {
          ...roomData,
          anObjectRoomCleaningFee: {
            ...roomData.anObjectRoomCleaningFee,
            cleaningFeeType,
            amount: cleaningAmount || 0,
          },
          anObjectRoomInsuranceDeposit: {
            ...roomData.anObjectRoomInsuranceDeposit,
            amount: depositAmount || 0,
          },
        },
      }).unwrap();
    }
  };

  const updateCategoryName = (data: RoomCategoryType) => {
    const { categoryType } = data;
    if (roomData && roomId) {
      return editRoom({
        roomId,
        data: {
          ...roomData,
          categoryType,
        },
      }).unwrap();
    }
  };

  return {
    roomData,
    roomIsLoading,
    roomIsSuсcess,
    updateFacilities,
    updatePostingRules,
    updateCheckInCheckOut,
    updateBaseCost,
    updateGeneralRoomInformation,
    roomEditIsLoading,
    updateOptionalService,
    updateCategoryName,
  };
};
