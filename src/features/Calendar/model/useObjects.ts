import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getObjects } from "./selectors";
import { CalendarObject } from "./types";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

export const useObjects = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(getObjects);

  const setObjects = (objects: CalendarObject[]) => {
    dispatch(calendarActions.setObjects(objects));
  };

  return {
    objects,
    setObjects,
  };
};
