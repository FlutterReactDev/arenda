import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { userAction } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";

export const useAuthModal = () => {
  const dispatch = useAppDispatch();
  const onOpen = () => dispatch(userAction.setOnOpen());
  const onClose = () => dispatch(userAction.setOnClose());
  const isOpen = useAppSelector((state) => state.user.userAuthModal.isOpen);
  return {
    onOpen,
    onClose,
    isOpen,
  };
};
