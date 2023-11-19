import { AddHotelPage } from "@pages/AddHotelPage";
import { AddObjectPage } from "@pages/AddObjectPage";
import { AddObjectStepperPage } from "@pages/AddObjectStepperPage";
import { CalendarDetailPage } from "@pages/CalendarDetailPage";
import { CalendarPage } from "@pages/CalendarPage";
import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";
import { ObjectDetailPage } from "@pages/ObjectDetailPage";
import { RegisterPage } from "@pages/RegisterPage";
import { SearchResultPage } from "@pages/SearchResultPage";
import { SelectionPage } from "@pages/SelectionPage";
import { ReactNode } from "react";

export enum RouteName {
  MAIN_PAGE = "/",
  SEARCH_PAGE = "/search-result",
  ADD_OBJECT = "/add-object",
  DETAIL_PAGE = "/object-detail",
  ADD_OBJECT_INFO = "/add-object-info",
  ADD_HOTEL_PAGE = "/add-hotel",
  CALENDAR_PAGE = "/calendar",
  LOGIN_PAGE = "/login",
  REGISTER_PAGE = "/register",
  MY_OBJECTS = "/my-objects",
  CABINET = "/cabinet",
  SELECTION = "/selection",
}

export interface Route {
  path: string;
  role?: string[];
  private: boolean;
  element: ReactNode;
  layout: boolean | "header" | "footer";
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
    layout: true,
  },
  {
    path: RouteName.ADD_OBJECT,
    element: <AddObjectPage />,
    private: true,
    layout: true,
  },
  {
    path: RouteName.ADD_HOTEL_PAGE,
    element: <AddHotelPage />,
    private: true,
    layout: true,
  },
  {
    path: RouteName.CALENDAR_PAGE,
    element: <CalendarPage />,
    private: false,
    layout: "header",
  },
  {
    path: RouteName.CALENDAR_PAGE + "/:id",
    element: <CalendarDetailPage />,
    private: false,
    layout: "header",
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
    path: RouteName.ADD_OBJECT_INFO,
    element: <AddObjectStepperPage />,
    private: true,
    layout: true,
  },
  {
    path: RouteName.DETAIL_PAGE,
    element: <ObjectDetailPage />,
    private: false,
    layout: true,
  },
];
