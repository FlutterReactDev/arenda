import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { calendarActions } from "..";
import { getDeleteModal } from "./selectors";

export const useDeleteModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, availibilityId, objectId } = useAppSelector(getDeleteModal);

  const onOpen = ({
    objectId,
    availabilityId,
  }: {
    objectId: number;
    availabilityId: number;
  }) => {
    dispatch(
      calendarActions.setDeleteModalOnOpen({
        objectId,
        availabilityId,
      })
    );
  };
  const onClose = () => dispatch(calendarActions.setDeleteModalOnClose());

  return {
    isOpen,
    onClose,
    onOpen,
    availibilityId,
    objectId,
  };
};
