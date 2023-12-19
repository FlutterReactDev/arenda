import { RootState } from "@app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

import {
  addDays,
  eachDayOfInterval,
  isEqual,
  isLastDayOfMonth,
  isPast,
  isSameDay,
  isToday,
  setHours,
  subDays,
} from "date-fns";
import { toDay } from "../utils/toDay";
import { search } from "@shared/ui/SelectSearch/lib/fuzzySearch";
import { isOverlaping } from "../utils/isOverlaping";
import { convertToHour } from "../utils/convertToHour";

const selectBeginDate = (state: RootState) => state.calendar.actions.beginDate;
const selectCountDay = (state: RootState) => state.calendar.actions.countDay;
const selectObjects = (state: RootState) => state.calendar.objects;
const selectCurrentWidth = (state: RootState) =>
  state.calendar.common.currentWidth;

export const getColumnDays = createSelector(
  [selectBeginDate, selectCountDay, selectCurrentWidth],
  (beginDate: Date, countDay: number, currentWidth) => {
    const start = subDays(beginDate, 1);
    const end = addDays(beginDate, countDay);
    const result = eachDayOfInterval({
      start,
      end,
    }).map((date, index, arr) => {
      const isWeekday = date.getDay() === 6 || date.getDay() === 0;

      const getMonthIndex = () => {
        return currentWidth == 72 ? 1 : 0;
      };

      return {
        date,
        isMonth:
          (index == getMonthIndex() && !isLastDayOfMonth(date)) ||
          date.getDate() == 1
            ? true
            : false,
        isToday: isToday(date),
        isPastDay: isPast(addDays(date, 1)),
        isWeekday,
        isFirst: index == 0,
        isLast: index == arr.length - 1,
      };
    });

    return result;
  }
);
export const getPagination = (state: RootState) => state.calendar.pagination;

export const getCommonSettings = (state: RootState) => state.calendar.common;
export const getCalendar = (state: RootState) => state.calendar.calendar;
export const getCalendarActions = (state: RootState) => state.calendar.actions;
export const getSidebar = (state: RootState) => state.calendar.sidebar;
export const getDeleteModal = (state: RootState) => state.calendar.deleteModal;
export const getObjects = (state: RootState) => state.calendar.objects;
export const getSearchAvailibilityRoomsModal = (state: RootState) =>
  state.calendar.searchAvailibilityRoomsModal;
export const getObject = (objectId: number) =>
  createSelector([selectObjects], (objects) => {
    const id = objects.findIndex((object) => object.id == objectId);
    return objects[id];
  });

export const getObjectPageByOrder = (objectId: number) =>
  createSelector(
    [selectObjects, getObject(objectId), getPagination],
    (allObjects, object, pagination) => {
      const orderObject = allObjects.indexOf(object) + 1;
      return Math.ceil(orderObject / pagination.visibleObjectCount);
    }
  );
export const getSearch = (state: RootState) => state.calendar.search;
export const getObjectsBySearch = createSelector(
  [selectObjects, getSearch],
  (objects, searchQuery) => {
    return !searchQuery.length
      ? objects
      : objects.filter((o) =>
          search(searchQuery.toLowerCase(), `${o.name}`.trim().toLowerCase())
        );
  }
);
export const getTotalPage = createSelector(
  [getPagination, getObjectsBySearch],
  (pagination, objects) => {
    return Math.ceil(objects.length / pagination.visibleObjectCount);
  }
);
export const getObjectsBySearchAvailibility = createSelector(
  [getObjectsBySearch],
  (objects) => {
    return objects.map((object) => object.availability).flat();
  }
);
export const getSaerchPopover = (state: RootState) =>
  state.calendar.searchPopover;
export const getCurrentObjects = createSelector(
  [getObjectsBySearch],
  (searchFilteredObjects) => {
    return searchFilteredObjects;
  }
);
export const getCurrentObjectsAvailibility = createSelector(
  [getCurrentObjects],
  (objects) => {
    return objects.map((object) => object.availability);
  }
);
export const getObjectAvailibility = (objectId: number) =>
  createSelector([selectObjects], (objects) => {
    return objects.filter((object) => object.id == objectId)[0]?.availability;
  });

export const getObjectAvailibilityById = (
  objectId: number | null,
  availabilityId: number | null | undefined
) =>
  createSelector([selectObjects], (objects) => {
    return objects
      .filter((object) => object.id == objectId)[0]
      ?.availability.filter((a) => a.id == availabilityId)[0];
  });
export const getSeasonPriceByDate = (objectId: number | null, dates: Date[]) =>
  createSelector([selectObjects], (objects) => {
    const objectIndex = objects.findIndex((object) => object.id == objectId);
    const result = objects[objectIndex]?.seasonsPrice.filter((price) => {
      const findedDate = !!dates.filter((date) => isSameDay(date, price.date))
        .length;

      return findedDate;
    });

    const restDate = dates.filter((date) => {
      const findedDate = !!objects[objectIndex].seasonsPrice.filter((price) =>
        isSameDay(date, price.date)
      ).length;

      return !findedDate;
    });

    return (
      (result && [
        ...result,
        ...restDate.map((date) => ({
          date,
          cost: objects[objectIndex].objectDefaultPerDayCost,
        })),
      ]) ||
      []
    );
  });

export const getAvailibilities = createSelector([selectObjects], (objects) => {
  return objects.map((object) => object.availability);
});

export const getAvailibilityRooms = createSelector(
  [getObjects, getSearchAvailibilityRoomsModal],
  (objects, { checkIn, checkOut, maxDate, minDate }) => {
    if (minDate && maxDate && checkOut && checkIn) {
      return objects.filter(({ availability }) => {
        const res = availability.filter(
          ({ minDate: minDate1, maxDate: maxDate1 }) => {
            return isOverlaping(
              {
                start: minDate1,
                end: maxDate1,
              },
              {
                start: setHours(minDate, convertToHour(checkIn) || 0),
                end: setHours(maxDate, convertToHour(checkOut) || 0),
              }
            );
          }
        );

        return res.length == 0;
      });
    }
    return [];
  }
);

export const getTodayCheckIn = createSelector(
  [getObjectsBySearch],
  (objects) => {
    return objects
      .map((object) => object.availability)
      .flat()
      .filter((a) => {
        return isEqual(toDay(a.minDate), toDay(new Date()));
      }).length;
  }
);

export const getTodayCheckOut = createSelector(
  [getObjectsBySearch],
  (objects) => {
    return objects
      .map((object) => object.availability)
      .flat()
      .filter((a) => {
        return isEqual(toDay(a.maxDate), toDay(new Date()));
      }).length;
  }
);

export const getTodayCheckInAvailibilities = createSelector(
  [getObjectsBySearch],
  (objects) => {
    return objects
      .map((object) => object.availability)
      .flat()
      .filter((a) => {
        return isEqual(toDay(a.minDate), toDay(new Date()));
      });
  }
);

export const getTodayCheckOutAvailibilities = createSelector(
  [getObjectsBySearch],
  (objects) => {
    return objects
      .map((object) => object.availability)
      .flat()
      .filter((a) => {
        return isEqual(toDay(a.maxDate), toDay(new Date()));
      });
  }
);
