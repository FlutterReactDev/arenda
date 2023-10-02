import { addObjectSliceReducer } from "@features/AddObjectForm";
import { addObjectReducer } from "@pages/AddObjectStepperPage";
import { configureStore } from "@reduxjs/toolkit";
import { base2GISApi } from "@shared/api/2GiSApi";
import { baseApi, baseApiWithReAuth } from "@shared/api/rtk";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApiWithReAuth.reducerPath]: baseApiWithReAuth.reducer,
    [base2GISApi.reducerPath]: base2GISApi.reducer,
    addObjectForm: addObjectSliceReducer,
    addOBject: addObjectReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      baseApi.middleware,
      baseApiWithReAuth.middleware,
      base2GISApi.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
