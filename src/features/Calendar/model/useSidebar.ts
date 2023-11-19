import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getSidebar } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";
import { SidebarType } from "./types";

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, objectId, type, availabilityId } = useAppSelector(getSidebar);

  const onOpen = ({
    objectId,
    type,
    availabilityId,
  }: {
    objectId: number;
    type?: SidebarType;
    availabilityId?: number;
  }) => {
    dispatch(
      calendarActions.setOnOpen({
        objectId,
        type,
        availabilityId,
      })
    );
  };
  const onClose = () => dispatch(calendarActions.setOnClose());

  return {
    isOpen,
    onClose,
    onOpen,
    objectId,
    type,
    availabilityId,
  };
};
