import { configureStore } from "@reduxjs/toolkit";
import { baseApi, baseApiWithReAuth } from "@shared/api/rtk";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApiWithReAuth.reducerPath]: baseApiWithReAuth.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      baseApi.middleware,
      baseApiWithReAuth.middleware,
    ]);
  },
});
