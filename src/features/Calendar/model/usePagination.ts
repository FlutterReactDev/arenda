import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getPagination, getTotalPage } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

export const usePagination = () => {
  const { currentPage, visibleObjectCount } = useAppSelector(getPagination);

  const totalPage = useAppSelector(getTotalPage);
  const dispatch = useAppDispatch();

  const onNext = () => {
    dispatch(calendarActions.increaseCurrentPage());
  };

  const onPrev = () => {
    dispatch(calendarActions.decreaseCurrentPage());
  };

  const jump = (page: number) => {
    dispatch(calendarActions.jumpPage(page));
  };

  return {
    totalPage,
    onNext,
    onPrev,
    currentPage,
    jump,
    visibleObjectCount
  };
};
