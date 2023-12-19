import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getHeight } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { headerActions } from "..";

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const headerHeight = useAppSelector(getHeight);

  const setHeaderHeight = (data: number) => {
    dispatch(headerActions.setHeight(data));
  };

  return { headerHeight, setHeaderHeight };
};
