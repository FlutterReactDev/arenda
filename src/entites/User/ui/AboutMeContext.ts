import {
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { createContext } from "react";
import { AboutMeResponse } from "../model/types/UserType";

export const AboutMeContext = createContext<{
  refetch?: () => QueryActionCreatorResult<
    QueryDefinition<
      void,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "object" | "room" | "availibility",
      AboutMeResponse,
      "baseApiWithReAuth"
    >
  >;
}>({});
