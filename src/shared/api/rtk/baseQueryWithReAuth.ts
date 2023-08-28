// import { userActions } from "@entites/User";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { baseQuery } from "./baseQuery";
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/Auth/Refresh", api, extraOptions);
    if (refreshResult.data) {
      //   api.dispatch(userActions.setAuthData(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      //   api.dispatch(userActions.logout());
    }
  }

  return result;
};
