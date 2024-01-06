// import { userActions } from "@entites/User";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";

import { UserLoginData, userAction } from "@entites/User";
import { USER_TOKEN } from "@shared/constants/user";
import { Mutex } from "async-mutex";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: _BASE_API_URL_,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        if (localStorage.getItem(USER_TOKEN.REFRESH_TOKEN)) {
          const refreshResult = await baseQuery(
            {
              url: "/RefreshToken",
              body: {
                refreshToken: localStorage.getItem(USER_TOKEN.REFRESH_TOKEN),
              },
              method: "POST",
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            api.dispatch(
              userAction.setAuthData(refreshResult.data as UserLoginData)
            );
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(userAction.logout());
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
