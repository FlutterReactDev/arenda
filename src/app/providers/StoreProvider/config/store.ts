import { configureStore } from "@reduxjs/toolkit";
import { base2GISApi } from "@shared/api/2GiSApi";
import { baseApiWithReAuth, baseApi } from "@shared/api/rtk";
import { createRoomReducer, createObjectReducer } from "@entites/Object";
import { addObjectSliceReducer } from "@features/SelectLocationForm";
import { userReducer } from "@entites/User";
import { searchObjectReducer } from "@features/SearchObjects";
import { calendarReducer } from "@features/Calendar";
import { dragObjectReducer } from "@features/DragObject";
import { searchMapReducer, selectMapReducer } from "@entites/Map";
import { bookingFormReducer } from "@widgets/BookingForm";
import { headerReducer } from "@widgets/Header";
import { base2GISReviewApi } from "@shared/api/2GISReviewApi";
import { base2GISPhotoApi3V } from "@shared/api/2GISPhotoApi3V";
import { base2GISProductApi } from "@shared/api/2GISProductApi";
import { base2GISPhotoApi2V } from "@shared/api/2GISPhotoApi2V";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApiWithReAuth.reducerPath]: baseApiWithReAuth.reducer,
    [base2GISApi.reducerPath]: base2GISApi.reducer,
    [base2GISReviewApi.reducerPath]: base2GISReviewApi.reducer,
    [base2GISPhotoApi3V.reducerPath]: base2GISPhotoApi3V.reducer,
    [base2GISProductApi.reducerPath]: base2GISProductApi.reducer,
    [base2GISPhotoApi2V.reducerPath]: base2GISPhotoApi2V.reducer,
    header: headerReducer,
    bookingForm: bookingFormReducer,
    searchObject: searchObjectReducer,
    addObjectForm: addObjectSliceReducer,
    createObject: createObjectReducer,
    calendar: calendarReducer,
    dragObject: dragObjectReducer,
    createRoom: createRoomReducer,
    searchMap: searchMapReducer,
    selectMap: selectMapReducer,
    user: userReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      baseApiWithReAuth.middleware,
      baseApi.middleware,
      base2GISApi.middleware,
      base2GISReviewApi.middleware,
      base2GISPhotoApi3V.middleware,
      base2GISProductApi.middleware,
      base2GISPhotoApi2V.middleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
