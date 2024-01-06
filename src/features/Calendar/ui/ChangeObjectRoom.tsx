import { Select } from "@chakra-ui/react";
import { useGetAllObjectsQuery, useGetObjectRoomsQuery } from "@entites/Object";
import { useEffect, useState } from "react";
import { useObjects } from "../model/useObjects";
import { CalendarObject } from "../model/types";
import { useGetCurrenciesQuery } from "@entites/CommonReference";

export const ChangeObjectRoom = () => {
  const { setObjects } = useObjects();
  const [objectId, setObjectId] = useState<null | number>(null);

  const { data: objectsData, isSuccess: objectIsSuccess } =
    useGetAllObjectsQuery();
  const { data: roomsData, isSuccess: roomsIsSuccess } = useGetObjectRoomsQuery(
    objectId as number,
    {
      skip: !objectIsSuccess && !objectId,
    }
  );

  const { data: currencyData, isSuccess: currencyIsSuccess } =
    useGetCurrenciesQuery();

  useEffect(() => {
    if (objectIsSuccess && objectsData.length) {
      setObjectId(objectsData[0].id);
    }
  }, [objectIsSuccess]);

  useEffect(() => {
    if (roomsIsSuccess && roomsData && currencyIsSuccess) {
      const objects: CalendarObject[] = roomsData.map(
        ({
          anObjectRoomDescription: { ownName },
          anObjectRoomBookingSettings: { checkInAfter, checkOutAfter },
          anObjectRoomBaseCost: { pricePerDay, currencyId },
          id,
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
        })
      );

      setObjects(objects);
    }
  }, [roomsIsSuccess, roomsData, currencyIsSuccess]);
  return (
    <>
      {objectIsSuccess && objectId && (
        <Select
          onChange={(e) => setObjectId(Number(e.target.value))}
          value={objectId}
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
