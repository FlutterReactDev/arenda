import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { calendarActions } from "..";
import { getSaerchPopover } from "./selectors";

export const useSearchPopover = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(getSaerchPopover);

  const onOpen = () => {
    dispatch(calendarActions.setOpenSearchPopover());
  };

  const onClose = () => {
    dispatch(calendarActions.setCloseSearchPopover());
  };

  return { isOpen, onOpen, onClose };
};
