import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getSearchObjectData } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { searchObjectAction } from "..";
import { Guests } from "./types";
import { SearchSchemaType } from "./schema";

export const useSearchObjects = () => {
  const dispatch = useAppDispatch();
  const { dates, guests, term } = useAppSelector(getSearchObjectData);

  const setCheckIn = (date: Date) => {
    dispatch(searchObjectAction.setCheckIn(date));
  };

  const setCheckOut = (date: Date) => {
    dispatch(searchObjectAction.setCheckOut(date));
  };

  const setDates = (dates: { checkIn: Date; checkOut: Date }) => {
    dispatch(searchObjectAction.setDates(dates));
  };

  const setGuestData = (data: Guests) => {
    dispatch(searchObjectAction.setGuestData(data));
  };

  const setTerm = (data: string) => {
    dispatch(searchObjectAction.setTerm(data));
  };

  const setSearchData = (data: SearchSchemaType) => {
    dispatch(searchObjectAction.setSearchData(data));
  };

  return {
    dates,
    guests,
    term,
    setCheckIn,
    setCheckOut,
    setGuestData,
    setTerm,
    setSearchData,
    setDates,
  };
};
