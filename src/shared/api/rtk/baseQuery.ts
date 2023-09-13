import { _BASE_API_URL_ } from "@app/types/global";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_TOKEN } from "@shared/constants/user";

export const baseQuery = fetchBaseQuery({
  baseUrl: _BASE_API_URL_,
  prepareHeaders(headers) {
    const token = localStorage.getItem(USER_TOKEN.ACCESS_TOKEN);
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
