import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getBookingForm } from "./selectors";
import { Dates } from "./types";
import { GuestsType } from "@entites/Object";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { bookingFormActions } from "../model/bookingFormSlice";
import { BookingFormType } from "./schema";

export const useBookingForm = () => {
  const dispatch = useAppDispatch();
  const { dates, guests } = useAppSelector(getBookingForm);

  const setBookignForm = (data: BookingFormType) => {
    dispatch(bookingFormActions.setBookingForm(data));
  };

  const setDates = (dates: Dates) => {
    dispatch(bookingFormActions.setDates(dates));
  };

  const setGuests = (guests: GuestsType) => {
    dispatch(bookingFormActions.setGuests(guests));
  };

  return {
    dates,
    guests,
    setDates,
    setGuests,
    setBookignForm,
  };
};
