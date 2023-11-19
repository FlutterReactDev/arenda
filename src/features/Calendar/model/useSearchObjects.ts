import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getSearch } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

export const useSearchObjects = () => {
  const query = useAppSelector(getSearch);
  const dispatch = useAppDispatch();

  const onChangeQuery = (value: string) => {
    dispatch(calendarActions.search(value));
    dispatch(calendarActions.jumpPage(1));
  };

  return {
    query,
    onChangeQuery,
  };
};
