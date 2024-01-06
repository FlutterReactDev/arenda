import { AddObjectPage } from "@pages/AddObjectPage";

import { CalendarBookingPage } from "@pages/CalendarBookingPage";
import { CalendarDetailPage } from "@pages/CalendarDetailPage";
import { CalendarPage } from "@pages/CalendarPage";
import { CreateHotelPage } from "@pages/CreateHotelPage";
import { CreateObjectPage } from "@pages/CreateObjectPage";
import { CreateRoomPage } from "@pages/CreateRoomPage";
import { EditHotelPage } from "@pages/EditHotelPage";
import { EdtiObjectPage } from "@pages/EditObjectPage";
import { EditRoomPage } from "@pages/EditRoomPage";
import { ForgotPage } from "@pages/ForgotPage";
import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";
import { MyObjectsPage } from "@pages/MyObjectsPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ObjectDetailPage } from "@pages/ObjectDetailPage";
import { ProfileEditPage } from "@pages/ProfileEditPage";
import { ProfilePage } from "@pages/ProfilePage";
import { ProfilePasswordPage } from "@pages/ProfilePasswordPage";
import { RegisterPage } from "@pages/RegisterPage";
import { ResetPage } from "@pages/ResetPage";
import { SearchResultPage } from "@pages/SearchResultPage";
import { VerifyPage } from "@pages/VerifyPage";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ObjectSecureRoute } from "../ui/ObjectSecureRoute";
import { ResetPasswordPage } from "@pages/ResetPasswordPage";

export enum RouteName {
  MAIN_PAGE = "/",
  SEARCH_PAGE = "/search-result",
  ADD_OBJECT = "/add-object",
  DETAIL_PAGE = "/:objectId/object-detail",

  LOGIN_PAGE = "/login",
  REGISTER_PAGE = "/register",
  RESET_PAGE = "/reset-password",
  FORGOT_PAGE = "/forgot",
  VERIFY_PAGE = "/verify",

  PROFILE_PAGE = "/profile",
  PROFILE_EDIT_PAGE = "/edit",
  PROFILE_PASSWORD_PAGE = "/password",

  MY_OBJECTS = "/my-objects",
  CABINET = "/cabinet",
  SELECTION = "/selection",

  CREATE_HOTEL = "/hotel/create-hotel",
  EDIT_HOTEL = "/hotel/:hotelId/edit-hotel",

  CREATE_ROOM = "/hotel/:hotelId/create-room",
  EDIT_ROOM = "/hotel/:roomId/edit-room",

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
  requiredVerify: boolean;
}

export const routeConfig: Route[] = [
  {
    path: RouteName.MAIN_PAGE,
    element: <HomePage />,
    private: false,
    layout: true,
    requiredVerify: false,
  },
  {
    path: RouteName.SEARCH_PAGE,
    element: <SearchResultPage />,
    private: false,
    layout: "header",
    requiredVerify: false,
  },
  {
    path: RouteName.ADD_OBJECT,
    element: <AddObjectPage />,
    private: true,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.CREATE_OBJECT,
    element: (
      <ObjectSecureRoute>
        <CreateObjectPage />
      </ObjectSecureRoute>
    ),
    private: true,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.CREATE_HOTEL,
    element: (
      <ObjectSecureRoute>
        <CreateHotelPage />
      </ObjectSecureRoute>
    ),
    private: true,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.EDIT_HOTEL,
    element: <EditHotelPage />,
    layout: true,
    private: true,
    requiredVerify: true,
  },
  {
    path: RouteName.CREATE_ROOM,
    element: <CreateRoomPage />,
    private: true,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.EDIT_ROOM,
    element: <EditRoomPage />,
    layout: true,
    private: true,
    requiredVerify: true,
  },
  {
    path: RouteName.EDIT_OBJECT,
    element: <EdtiObjectPage />,
    layout: true,
    private: true,
    requiredVerify: true,
  },
  {
    path: RouteName.CALENDAR_PAGE,
    element: <CalendarPage />,
    private: true,
    layout: "header",
    requiredVerify: true,
    children: [
      {
        element: <Navigate to={RouteName.CALENDAR_BOOKING.replace("/", "")} />,
        layout: false,
        private: true,
        path: "",
        requiredVerify: true,
      },
      {
        element: <CalendarBookingPage />,
        path: RouteName.CALENDAR_BOOKING.replace("/", ""),
        layout: false,
        private: true,
        requiredVerify: true,
      },
      {
        path: RouteName.CALENDAR_BOOKING.replace("/", "") + "/:id",
        element: <CalendarDetailPage />,
        private: true,
        layout: false,
        requiredVerify: true,
      },
      // {
      //   element: <CalendarStatPage />,
      //   path: RouteName.CALENDAR_STAT.replace("/", ""),
      //   layout: true,
      //   private: false,
      // },
      // {
      //   element: <CalendarCashBoxPage />,
      //   path: RouteName.CALENDAR_CASHBOX.replace("/", ""),
      //   layout: true,
      //   private: false,
      // },
    ],
  },
  {
    element: <MyObjectsPage />,
    layout: true,
    path: RouteName.MY_OBJECTS,
    private: true,
    requiredVerify: true,
  },
  {
    path: RouteName.LOGIN_PAGE,
    element: <LoginPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.REGISTER_PAGE,
    element: <RegisterPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.RESET_PAGE,
    element: <ResetPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.RESET_PAGE + "/:token",
    element: <ResetPasswordPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.FORGOT_PAGE,
    element: <ForgotPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },

  {
    path: RouteName.VERIFY_PAGE,
    element: <VerifyPage />,
    private: false,
    layout: true,
    requiredVerify: true,
  },
  {
    path: RouteName.PROFILE_PAGE,
    element: <ProfilePage />,
    layout: true,
    private: true,
    requiredVerify: false,
    children: [
      {
        element: <Navigate to={RouteName.PROFILE_EDIT_PAGE.replace("/", "")} />,
        layout: false,
        private: true,
        path: "",
        requiredVerify: false,
      },
      {
        element: <ProfileEditPage />,
        layout: false,
        private: true,
        path: RouteName.PROFILE_EDIT_PAGE.replace("/", ""),
        requiredVerify: false,
      },
      {
        element: <ProfilePasswordPage />,
        layout: false,
        private: true,
        path: RouteName.PROFILE_PASSWORD_PAGE.replace("/", ""),
        requiredVerify: true,
      },
    ],
  },
  // {
  //   path: RouteName.SELECTION,
  //   element: <SelectionPage />,
  //   private: false,
  //   layout: false,
  // },
  {
    path: RouteName.DETAIL_PAGE,
    element: <ObjectDetailPage />,
    private: false,
    layout: true,
    requiredVerify: false,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    layout: true,
    private: false,
    requiredVerify: false,
  },
];
