export interface EmploymentCalendarState {
  common: CalendarCommonType;
  calendar: CalendarState;
  actions: CalendarActionsState;
  sidebar: SidebarState;
  objects: CalendarObject[];
  currentVisbleId: number;
  deleteModal: DeleteModal;
  pagination: CalendarPagination;
  search: string;
  searchPopover: SearchPopover;
  searchAvailibilityRoomsModal: SearchAvailibilityRoomsModal;
  searchClientFullname: string;
  appLoading: boolean;
  currentObject: number | null;
}

export interface DeleteModal {
  isOpen: boolean;
  objectId: number | null;
  availibilityId: number | null;
}
export interface SearchAvailibilityRoomsModal {
  isOpen: boolean;
  minDate: Date | null;
  maxDate: Date | null;
  checkIn: string | null;
  checkOut: string | null;
}
export interface CalendarState {
  rangeSelect: {
    in: Date | null;
    out: Date | null;
  };
  rangeSelectObjectId: number | null;
}

export interface CalendarActionsState {
  beginDate: Date;
  countDay: number;
}
export interface SidebarState {
  isOpen: boolean;
  objectId: number | null;
  type?: SidebarType;
  availabilityId?: number;
  checkIn?: string;
  checkOut?: string;
}

export enum SidebarType {
  EDIT = "EDIT",
  BOOK = "BOOK",
}

export interface CalendarCommonType {
  mobile: {
    widthCell: number;
  };
  desktop: {
    widthCell: number;
  };
  hotels: {
    startMonth: Date;
    countMonth: number;
  };
  objects: {
    startMonth: Date;
    countMonth: number;
  };
  currentWidth: number;
  sidebarWidth: number;
}

export interface CalendarObject {
  availability: CalendarAvailability[];
  objectDefaultPerDayCost: number;
  seasonsPrice: CalendarSeasonsPrice[];
  id: number;
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  currency: string;
  roomCategoryName: null | string;
}

export interface CalendarAvailability {
  minDate: Date;
  maxDate: Date;
  comment: string;
  id: number;
  color: string;
  objectId: number;
  createdDate: Date;
  clientFullname: string;
  totalSum: number;
  phoneNumber: string;
}

export interface CalendarSeasonsPrice {
  date: Date;
  cost: number;
}

export interface CalendarPagination {
  currentPage: number;
  visibleObjectCount: number;
}

export interface CalendarDetailAvailability extends CalendarAvailability {
  left: number;
  top: number;
  width: number;
  isRightRounded: boolean;
  isLeftRounded: boolean;
}

export interface EventClickProps {
  id: number;
  objectId: number;
  availibilityInfo: CalendarAvailability;
  page: number;
}

export interface SearchPopover {
  isOpen: boolean;
}
