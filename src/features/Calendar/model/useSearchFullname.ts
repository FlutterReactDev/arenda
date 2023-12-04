import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { calendarActions } from "..";

export const useSearchFullname = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.calendar.searchClientFullname);

  const setQuery = (data: string) => {
    dispatch(calendarActions.setSearchClientFullnameQuery(data));
  };

  return {
    query,
    setQuery,
  };
};
