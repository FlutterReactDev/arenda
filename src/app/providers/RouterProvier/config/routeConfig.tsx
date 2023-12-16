import { AddObjectPage } from "@pages/AddObjectPage";

import { CalendarBookingPage } from "@pages/CalendarBookingPage";
import { CalendarCashBoxPage } from "@pages/CalendarCashBoxPage";
import { CalendarDetailPage } from "@pages/CalendarDetailPage";
import { CalendarPage } from "@pages/CalendarPage";
import { CalendarStatPage } from "@pages/CalendarStatPage";
import { CreateHotelPage } from "@pages/CreateHotelPage";
import { CreateObjectPage } from "@pages/CreateObjectPage";
import { CreateRoomPage } from "@pages/CreateRoomPage";
import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";
import { ObjectDetailPage } from "@pages/ObjectDetailPage";
import { RegisterPage } from "@pages/RegisterPage";
import { SearchResultPage } from "@pages/SearchResultPage";
import { SelectionPage } from "@pages/SelectionPage";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ObjectSecureRoute } from "../ui/ObjectSecureRoute";
import { MyObjectsPage } from "@pages/MyObjectsPage";
import { EditHotelPage } from "@pages/EditHotelPage";
import { EditRoomPage } from "@pages/EditRoomPage";

export enum RouteName {
  MAIN_PAGE = "/",
  SEARCH_PAGE = "/search-result",
  ADD_OBJECT = "/add-object",
  DETAIL_PAGE = "/object-detail",

  LOGIN_PAGE = "/login",
  REGISTER_PAGE = "/register",
  MY_OBJECTS = "/my-objects",
  CABINET = "/cabinet",
  SELECTION = "/selection",

  CREATE_HOTEL = "/hotel/create-hotel",
  EDIT_HOTEL = "/hotel/:hotelId/edit-hotel",

  CREATE_ROOM = "/hotel/:hotelId/create-room",
  EDIT_ROOM = "/hotel/edit-room",

  CREATE_OBJECT = "/object/create",
  EDIT_OBJECT = "/object/:objectId/edit-object",

  CALENDAR_PAGE = "/calendar",
  CALENDAR_BOOKING = "/booking",
  CALENDAR_STAT = "/stat",
  CALENDAR_CASHBOX = "/cashbox",
}

export interface Route {
  path: string;
  role?: string[];
  private: boolean;
  element: ReactNode;
  layout: boolean | "header" | "footer";
  children?: Route[];
}

export const routeConfig: Route[] = [
  {
    path: RouteName.MAIN_PAGE,
    element: <HomePage />,
    private: false,
    layout: true,
  },
  {
    path: RouteName.SEARCH_PAGE,
    element: <SearchResultPage />,
    private: false,
    layout: "header",
  },
  {
    path: RouteName.ADD_OBJECT,
    element: <AddObjectPage />,
    private: true,
    layout: true,
  },
  {
    path: RouteName.CREATE_OBJECT,
    element: (
      <ObjectSecureRoute>
        <CreateObjectPage />
      </ObjectSecureRoute>
    ),
    private: false,
    layout: true,
  },
  {
    path: RouteName.CREATE_HOTEL,
    element: (
      <ObjectSecureRoute>
        <CreateHotelPage />
      </ObjectSecureRoute>
    ),
    private: false,
    layout: true,
  },
  {
    path: RouteName.EDIT_HOTEL,
    element: <EditHotelPage />,
    layout: true,
    private: true,
  },
  {
    path: RouteName.CREATE_ROOM,
    element: <CreateRoomPage />,
    private: false,
    layout: true,
  },
  {
    path: RouteName.EDIT_ROOM,
    element: <EditRoomPage />,
    layout: true,
    private: true,
  },
  {
    path: RouteName.CALENDAR_PAGE,
    element: <CalendarPage />,
    private: false,
    layout: "header",
    children: [
      {
        element: <Navigate to={RouteName.CALENDAR_BOOKING.replace("/", "")} />,
        layout: false,
        private: false,
        path: "",
      },
      {
        element: <CalendarBookingPage />,
        path: RouteName.CALENDAR_BOOKING.replace("/", ""),
        layout: false,
        private: false,
      },
      {
        path: RouteName.CALENDAR_BOOKING.replace("/", "") + "/:id",
        element: <CalendarDetailPage />,
        private: false,
        layout: false,
      },
      {
        element: <CalendarStatPage />,
        path: RouteName.CALENDAR_STAT.replace("/", ""),
        layout: false,
        private: false,
      },
      {
        element: <CalendarCashBoxPage />,
        path: RouteName.CALENDAR_CASHBOX.replace("/", ""),
        layout: false,
        private: false,
      },
    ],
  },
  {
    element: <MyObjectsPage />,
    layout: true,
    path: RouteName.MY_OBJECTS,
    private: true,
  },
  {
    path: RouteName.LOGIN_PAGE,
    element: <LoginPage />,
    private: false,
    layout: true,
  },
  {
    path: RouteName.REGISTER_PAGE,
    element: <RegisterPage />,
    private: false,
    layout: true,
  },
  {
    path: RouteName.SELECTION,
    element: <SelectionPage />,
    private: false,
    layout: false,
  },
  {
    path: RouteName.DETAIL_PAGE,
    element: <ObjectDetailPage />,
    private: false,
    layout: true,
  },
];
