import {
  useEditObjectMutation,
  useEditRoomMutation,
  useGetObjectByIdQuery,
  useGetRoomByIdQuery,
} from "@entites/Object";
import { useParams } from "react-router-dom";
import { EditPositionData } from "./types";

import { GeneralInformationSchemaType } from "@entites/Object/model/schemas/generalInformationSchema";
import { FacilitiesType } from "@entites/Object/model/schemas/facilitiesFormSchema";
import { HeadingFormType } from "@entites/Object/model/schemas/headingFormSchema";
import { PostingRulesType } from "@entites/Object/model/schemas/postingRulesSchema";
import { CheckInCheckOutType } from "@entites/Object/model/schemas/checkInCheckOutSchema";
import { PriceFormType } from "@entites/Object/model/schemas/priceSchema";
import { OptionalServiceType } from "@entites/Object/model/schemas/optionalServiceSchema";

export const useEditObject = () => {
  const { objectId } = useParams();
  const {
    data: roomData,
    isLoading: roomIsLoading,
    isSuccess: roomIsSuсcess,
  } = useGetRoomByIdQuery(objectId as string);

  const {
    data: objectData,
    isSuccess: objectIsSuccess,
    isLoading: objectIsLoading,
  } = useGetObjectByIdQuery(`${roomData?.anObjectId}` as string, {
    skip: !roomIsSuсcess,
  });
  const [editObject, { isLoading: objectEditIsLoading }] =
    useEditObjectMutation();
  const [editRoom, { isLoading: roomEditIsLoading }] = useEditRoomMutation();
  const updatePositionData = (data: EditPositionData) => {
    if (objectData) {
      return editObject({
        data: { ...objectData, ...data },
        anObjectId: Number(roomData?.anObjectId),
      }).unwrap();
    }
  };

  const updateObjectGeneralInformation = (
    data: GeneralInformationSchemaType
  ) => {
    const {
      additionalBathroom,
      additionalToilet,
      area,
      attic,
      bath,
      beds,
      bidet,
      count,
      elevator,
      floorType,
      floorsInTheBuilding,
      hairDryer,
      hygienicShower,
      kitchenType,
      maximumGuests,
      numberOfBathroomsWithOutToilet,
      numberOfBathroomsWithToilet,
      numberOfIsolatedBedroom,
      numberOfSeparateToilets,
      repairType,
      robe,
      sauna,
      sharedBathroom,
      sharedShowerRoom,
      sharedToilet,
      shower,
      slippers,
      toiletries,
      towels,
    } = data;
    if (roomData && objectId) {
      const anObjectRoomBeds = [
        ...beds.map(({ bedType, count }) => ({
          id: 0,
          anObjectRoomId: roomData.id,
          bedType,
          count,
          isDelete: false,
        })),
      ];

      return editRoom({
        data: {
          ...roomData,
          anObjectRoomDescription: {
            ...roomData.anObjectRoomDescription,
            area,
            count,
            floorsInTheBuilding,
            floorType,
            kitchenType,
            numberOfIsolatedBedroom,
            repairType,
          },
          anObjectRoomAvailability: {
            ...roomData.anObjectRoomAvailability,
            elevator,
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
          anObjectRoomEquipment: {
            ...roomData.anObjectRoomEquipment,
            attic,
          },
          anObjectRoomBeds,
          maximumGuests,
        },
        roomId: objectId,
      }).unwrap();
    }
  };

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
    if (roomData && objectId) {
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
        roomId: objectId,
      }).unwrap();
    }
  };

  const updateHeading = (data: HeadingFormType) => {
    const { detailedDescription, title, ownName } = data;
    if (roomData && objectId) {
      return editRoom({
        roomId: objectId,
        data: {
          ...roomData,
          anObjectRoomDescription: {
            ...roomData.anObjectRoomDescription,
            ownName: ownName || "",
            uniqueName: title,
          },
          description: detailedDescription,
        },
      }).unwrap();
    }
  };

  const updatePostingRules = (data: PostingRulesType) => {
    if (roomData && objectId) {
      return editRoom({
        roomId: objectId,
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
    if (roomData && objectId) {
      return editRoom({
        roomId: objectId,
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
    if (roomData && objectId) {
      return editRoom({
        roomId: objectId,
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

  const updateOptionalService = (data: OptionalServiceType) => {
    const {
      cleaningFeeType,
      cleaningAmount,
      depositAmount,
      transfer,
      transferDescription,
    } = data;
    if (roomData && objectId && objectData) {
      return editObject({
        data: {
          ...objectData,
          anObjectFeeAdditionalService: {
            ...objectData.anObjectFeeAdditionalService,
            hasTransfer: transfer || false,
            transferDetails: transferDescription || "",
          },
        },
        anObjectId: Number(roomData?.anObjectId),
      })
        .unwrap()
        .then(() => {
          return editRoom({
            roomId: objectId,
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
        });
    }
  };

  return {
    roomData,
    objectData,
    roomIsLoading,
    roomIsSuсcess,
    objectIsSuccess,
    objectIsLoading,
    updatePositionData,
    objectEditIsLoading,
    updateObjectGeneralInformation,
    roomEditIsLoading,
    updateFacilities,
    updateHeading,
    updatePostingRules,
    updateCheckInCheckOut,
    updateBaseCost,
    updateOptionalService,
  };
};
