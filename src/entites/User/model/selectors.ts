import { RootState } from "@app/providers/StoreProvider";

export const getAuthData = (state: RootState) => state.user.userAuthData;
