import { configureStore } from "@reduxjs/toolkit";
import { base2GISApi } from "@shared/api/2GiSApi";
import { baseApiWithReAuth, baseApi } from "@shared/api/rtk";
import { addHotelReducer, addObjectStepReducer } from "@entites/Object";

import { addObjectSliceReducer } from "@features/SelectLocationForm";

import { userReducer } from "@entites/User";
import { searchObjectReducer } from "@features/SearchObjects";
import { calendarReducer } from "@features/Calendar";
import { dragObjectReducer } from "@features/DragObject";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApiWithReAuth.reducerPath]: baseApiWithReAuth.reducer,
    [base2GISApi.reducerPath]: base2GISApi.reducer,
    searchObject: searchObjectReducer,
    addObjectForm: addObjectSliceReducer,
    addObjectStep: addObjectStepReducer,
    addHotel: addHotelReducer,
    calendar: calendarReducer,
    dragObject: dragObjectReducer,
    user: userReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      baseApiWithReAuth.middleware,
      baseApi.middleware,
      base2GISApi.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
