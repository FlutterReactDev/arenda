import { Select } from "@chakra-ui/react";
import {
  useGetCurrenciesQuery,
  useGetRoomCategoriesQuery,
} from "@entites/CommonReference";
import { useGetAllObjectsQuery, useGetObjectRoomsQuery } from "@entites/Object";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useEffect } from "react";
import { calendarActions } from "..";
import { CalendarObject } from "../model/types";
import { useObjects } from "../model/useObjects";

export const ChangeObjectRoom = () => {
  const dispatch = useAppDispatch();
  const { setObjects, currentObject, setCurrentObject } = useObjects();

  const {
    data: objectsData,
    isSuccess: objectIsSuccess,
    isFetching: objectIsLoading,
  } = useGetAllObjectsQuery();
  const {
    data: roomsData,
    isSuccess: roomsIsSuccess,
    isFetching: roomsIsLoading,
  } = useGetObjectRoomsQuery(currentObject as number, {
    skip: !objectIsSuccess || !currentObject,
    refetchOnMountOrArgChange: true,
  });

  const { data: currencyData, isSuccess: currencyIsSuccess } =
    useGetCurrenciesQuery();
  const { data: roomCategory, isSuccess: roomCategoryIsSuccess } =
    useGetRoomCategoriesQuery();
  useEffect(() => {
    if (objectIsSuccess && objectsData.length && !currentObject) {
      setCurrentObject(objectsData[0].id);
    }
  }, [objectIsSuccess]);

  useEffect(() => {
    if (
      roomsIsSuccess &&
      roomsData &&
      currencyIsSuccess &&
      roomCategoryIsSuccess
    ) {
      const objectsData: CalendarObject[] = roomsData.map(
        ({
          anObjectRoomDescription: { ownName },
          anObjectRoomBookingSettings: { checkInAfter, checkOutAfter },
          anObjectRoomBaseCost: { pricePerDay, currencyId },
          id,
          categoryType,
        }) => ({
          id: id,
          name: ownName,
          availability: [],
          seasonsPrice: [],
          address: "",
          checkIn: checkInAfter,
          checkOut: checkOutAfter,
          objectDefaultPerDayCost: pricePerDay,
          currency: currencyData.filter(({ id }) => id == currencyId)[0].symbol,
          roomCategoryName: roomCategory.filter(
            ({ value }) => value == categoryType
          )[0].name,
        })
      );

      setObjects(objectsData);
    }
  }, [roomsIsSuccess, roomsData, currencyIsSuccess, roomCategoryIsSuccess]);

  useEffect(() => {
    if (roomsIsLoading) {
      dispatch(calendarActions.setAppIsLoading(true));
      return;
    }

    if (objectIsLoading) {
      dispatch(calendarActions.setAppIsLoading(true));
      return;
    }

    dispatch(calendarActions.setAppIsLoading(false));
  }, [dispatch, objectIsLoading, roomsIsLoading]);

  return (
    <>
      {objectIsSuccess && currentObject && (
        <Select
          onChange={(e) => setCurrentObject(Number(e.target.value))}
          value={currentObject}
          bgColor="white"
        >
          {objectsData.map(({ name, id }) => {
            return <option value={id}>{name}</option>;
          })}
        </Select>
      )}
    </>
  );
};
