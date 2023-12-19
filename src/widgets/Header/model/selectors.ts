import { RootState } from "@app/providers/StoreProvider";

export const getHeight = (state: RootState) => state.header.headerHeight;
