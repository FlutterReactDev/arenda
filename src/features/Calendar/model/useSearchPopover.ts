import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getSaerchPopover } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

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
