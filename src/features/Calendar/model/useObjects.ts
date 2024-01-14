import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getObjects } from "./selectors";
import { CalendarObject } from "./types";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";

export const useObjects = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(getObjects);
  const currentObject = useAppSelector((state) => state.calendar.currentObject);
  const setObjects = (objects: CalendarObject[]) => {
    dispatch(calendarActions.setObjects(objects));
  };

  const setCurrentObject = (id: number) => {
    dispatch(calendarActions.setCurrentObject(id));
  };

  return {
    objects,
    setObjects,
    setCurrentObject,
    currentObject,
  };
};
