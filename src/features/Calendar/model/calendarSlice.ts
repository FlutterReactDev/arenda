import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addDays, isSameDay, subDays, subMonths } from "date-fns";
import { EmploymentCalendarState, SidebarType } from "./types";
const initialState = {
  common: {
    desktop: {
      widthCell: 72,
    },
    mobile: {
      widthCell: 50,
    },
    hotels: {
      countMonth: 13,
      startMonth: new Date(),
    },
    objects: {
      countMonth: 19,
      startMonth: subMonths(new Date(), 6),
    },
    currentWidth: 0,
    sidebarWidth: 280,
  },
  actions: {
    beginDate: new Date(),
    countDay: 0,
  },
  calendar: {
    rangeSelect: {
      in: null,
      out: null,
    },
    rangeSelectObjectId: null,
  },
  sidebar: {
    isOpen: false,
    objectId: null,
  },
  deleteModal: {
    isOpen: false,
    availibilityId: null,
    objectId: null,
  },
  objects: [],
  currentObject: null,
  currentVisbleId: 0,
  pagination: {
    currentPage: 1,
    visibleObjectCount: 6,
  },
  search: "",
  searchPopover: {
    isOpen: false,
  },
  searchAvailibilityRoomsModal: {
    isOpen: false,
    checkIn: null,
    checkOut: null,
    minDate: null,
    maxDate: null,
  },
  searchClientFullname: "",
  appLoading: false,
} as EmploymentCalendarState;

const correctDate = (date: Date, isHotel: boolean): Date => {
  let minDate;

  if (isHotel) {
    minDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
  } else {
    minDate = new Date(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 6,
        new Date().getDate()
      )
    );
  }

  const maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 12,
    new Date().getDate()
  );

  if (
    minDate.getTime() <= date.getTime() &&
    date.getTime() <= maxDate.getTime()
  ) {
    return date;
  }
  if (minDate.getTime() > date.getTime()) {
    return minDate;
  }

  return maxDate;
};
const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setObjects(state, actions) {
      state.objects = actions.payload;
    },

    setCurrentObject(state, action) {
      state.currentObject = action.payload;
    },
    setAppIsLoading(state, action) {
      state.appLoading = action.payload;
    },
    increaseDay(state) {
      state.actions.beginDate = correctDate(
        addDays(state.actions.beginDate, 1),
        false
      );
    },
    decreaseDay(state) {
      state.actions.beginDate = correctDate(
        subDays(state.actions.beginDate, 1),
        false
      );
    },

    increaseStep(state) {
      state.actions.beginDate = correctDate(
        addDays(state.actions.beginDate, state.actions.countDay),
        false
      );
    },
    decreaseStep(state) {
      state.actions.beginDate = correctDate(
        subDays(state.actions.beginDate, state.actions.countDay),
        false
      );
    },
    initWidthWindow(state) {
      const width = window.innerWidth;

      if (width <= 968) {
        state.common.currentWidth = state.common.mobile.widthCell;

        state.common.sidebarWidth = 50;
        state.pagination.visibleObjectCount = 4;
      } else {
        state.common.currentWidth = state.common.desktop.widthCell;
        state.common.sidebarWidth = 280;
      }

      state.actions.countDay =
        Math.floor(
          (width - state.common.sidebarWidth) / state.common.currentWidth
        ) - 1;
    },
    setBeginDate(state, action) {
      state.actions.beginDate = action.payload;
    },

    setRangeIn(state, action: PayloadAction<Date>) {
      state.calendar.rangeSelect.in = action.payload;
    },

    setRangeOut(state, action: PayloadAction<Date>) {
      state.calendar.rangeSelect.out = action.payload;
    },

    setClearRange(state) {
      state.calendar.rangeSelect.in = null;
      state.calendar.rangeSelect.out = null;
    },

    setOnOpen(
      state,
      action: PayloadAction<{
        objectId: number;
        type?: SidebarType;
        availabilityId?: number;
        checkIn?: string;
        checkOut?: string;
      }>
    ) {
      state.sidebar.isOpen = true;
      state.sidebar.objectId = action.payload.objectId;
      state.sidebar.type = action.payload.type;
      if (action.payload.availabilityId)
        state.sidebar.availabilityId = action.payload.availabilityId;
      state.sidebar.checkIn = action.payload.checkIn;
      state.sidebar.checkOut = action.payload.checkOut;
    },

    setOnClose(state) {
      state.sidebar.isOpen = false;
      state.sidebar.objectId = null;
      state.sidebar.type = undefined;
    },
    editAvailability(
      state,
      action: PayloadAction<{
        id: number;
        objectId: number;
        minDate: Date;
        maxDate: Date;
        comment: string;
        color: string;
        phoneNumber: string;
        clientFullname: string;
      }>
    ) {
      const objectIndex = state.objects.findIndex(
        (object) => object.id == action.payload.objectId
      );

      const availability = state.objects[objectIndex].availability.filter(
        (a) => a.id == action.payload.id
      )[0];

      const otherAvailabilities = state.objects[
        objectIndex
      ].availability.filter((a) => a.id != action.payload.id);

      state.objects[objectIndex].availability = [
        ...otherAvailabilities,
        {
          ...availability,
          minDate: action.payload.minDate,
          maxDate: action.payload.maxDate,
          color: action.payload.color,
          comment: action.payload.comment,
          phoneNumber: action.payload.phoneNumber,
          clientFullname: action.payload.clientFullname,
        },
      ];
    },
    createAvailability(
      state,
      action: PayloadAction<{
        id: number;
        objectId: number;
        minDate: Date;
        maxDate: Date;
        comment: string;
        color: string;
        createdDate: Date;
        totalSum: number;
        phoneNumber: string;
        clientFullname: string;
      }>
    ) {
      const objectIndex = state.objects.findIndex(
        (object) => object.id == action.payload.objectId
      );

      state.objects[objectIndex].availability = [
        ...state.objects[objectIndex].availability,
        {
          id: action.payload.id,
          maxDate: action.payload.maxDate,
          minDate: action.payload.minDate,
          comment: action.payload.comment,
          color: action.payload.color,
          createdDate: action.payload.createdDate,
          objectId: action.payload.objectId,
          totalSum: action.payload.totalSum,
          clientFullname: action.payload.clientFullname,
          phoneNumber: action.payload.phoneNumber,
        },
      ];
    },
    deleteAvailability(
      state,
      action: PayloadAction<{
        objectId: number;
        id: number;
      }>
    ) {
      const objectIndex = state.objects.findIndex(
        (object) => object.id == action.payload.objectId
      );

      state.objects[objectIndex].availability = state.objects[
        objectIndex
      ].availability.filter((a) => a.id != action.payload.id);
    },
    editAvailabilityDates(
      state,
      action: PayloadAction<{
        objectId: number;
        id: number;
        minDate: Date;
        maxDate: Date;
      }>
    ) {
      const objectIndex = state.objects.findIndex(
        (object) => object.id == action.payload.objectId
      );
      const availabilityIndex = state.objects[
        objectIndex
      ].availability.findIndex((a) => a.id == action.payload.id);
      state.objects[objectIndex].availability[availabilityIndex].minDate =
        action.payload.minDate;
      state.objects[objectIndex].availability[availabilityIndex].maxDate =
        action.payload.maxDate;
    },
    createSeasonPrice(
      state,
      action: PayloadAction<{
        dates: Date[];
        cost: number;
        objectId: number;
      }>
    ) {
      const objectIndex = state.objects.findIndex(
        (object) => object.id == action.payload.objectId
      );
      const findDateWithSeasonPrice = action.payload.dates
        .map((date) => {
          return state.objects[objectIndex].seasonsPrice.findIndex((price) =>
            isSameDay(price.date, date)
          );
        })
        .filter((num) => num >= 0);
      const restDate = action.payload.dates.filter((date) => {
        const findedDate = !!state.objects[objectIndex].seasonsPrice.filter(
          (price) => isSameDay(date, price.date)
        ).length;

        return !findedDate;
      });

      findDateWithSeasonPrice.forEach(
        (indexOfSeason) =>
          (state.objects[objectIndex].seasonsPrice[indexOfSeason].cost =
            action.payload.cost)
      );

      restDate.forEach((date) => {
        state.objects[objectIndex].seasonsPrice = [
          ...state.objects[objectIndex].seasonsPrice,
          {
            cost: action.payload.cost,
            date,
          },
        ];
      });
    },

    setCurrentVisbleId(state, action) {
      state.currentVisbleId = action.payload;
    },
    setDeleteModalOnOpen(
      state,
      action: PayloadAction<{
        objectId: number;
        availabilityId: number;
      }>
    ) {
      state.deleteModal.isOpen = true;
      state.deleteModal.availibilityId = action.payload.availabilityId;
      state.deleteModal.objectId = action.payload.objectId;
    },
    setDeleteModalOnClose(state) {
      state.deleteModal.isOpen = false;
      state.deleteModal.availibilityId = null;
      state.deleteModal.objectId = null;
    },

    increaseCurrentPage(state) {
      state.pagination.currentPage = Math.min(
        state.pagination.currentPage + 1,
        Math.ceil(state.objects.length / state.pagination.visibleObjectCount)
      );
    },
    decreaseCurrentPage(state) {
      state.pagination.currentPage = Math.max(
        state.pagination.currentPage - 1,
        1
      );
    },

    jumpPage(state, action: PayloadAction<number>) {
      const pageNumber = Math.max(
        1,
        Math.min(
          action.payload,
          Math.ceil(state.objects.length / state.pagination.visibleObjectCount)
        )
      );

      state.pagination.currentPage = pageNumber;
    },

    search(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setOpenSearchPopover(state) {
      state.searchPopover.isOpen = true;
    },

    setCloseSearchPopover(state) {
      state.searchPopover.isOpen = false;
    },

    setOpenSearchAvailibilityRooms(
      state,
      action: PayloadAction<{
        minDate: Date;
        maxDate: Date;
        checkIn: string;
        checkOut: string;
      }>
    ) {
      const { checkIn, checkOut, maxDate, minDate } = action.payload;
      state.searchAvailibilityRoomsModal.isOpen = true;
      state.searchAvailibilityRoomsModal.checkIn = checkIn;
      state.searchAvailibilityRoomsModal.checkOut = checkOut;
      state.searchAvailibilityRoomsModal.minDate = minDate;
      state.searchAvailibilityRoomsModal.maxDate = maxDate;
    },

    setCloseSearchAvailibilityRooms(state) {
      state.searchAvailibilityRoomsModal.isOpen = false;
      state.searchAvailibilityRoomsModal.checkIn = null;
      state.searchAvailibilityRoomsModal.checkOut = null;
      state.searchAvailibilityRoomsModal.minDate = null;
      state.searchAvailibilityRoomsModal.maxDate = null;
    },
    setSearchClientFullnameQuery(state, action) {
      state.searchClientFullname = action.payload;
    },
  },
});

export const { reducer: calendarReducer, actions: calendarActions } =
  calendarSlice;
