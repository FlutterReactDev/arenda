import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getSearchAvailibilityRoomsModal } from "./selectors";

export const useSearchAvailibilityRoomsModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(getSearchAvailibilityRoomsModal);
  const onOpen = ({
    checkIn,
    checkOut,
    maxDate,
    minDate,
  }: {
    minDate: Date;
    maxDate: Date;
    checkIn: string;
    checkOut: string;
  }) => {
    dispatch(
      calendarActions.setOpenSearchAvailibilityRooms({
        checkIn,
        checkOut,
        maxDate,
        minDate,
      })
    );
  };

  const onClose = () => {
    dispatch(calendarActions.setCloseSearchAvailibilityRooms());
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
};
