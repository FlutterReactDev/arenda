import { PropsWithChildren, FC } from "react";
import { Provider } from "react-redux";
import { store } from "../config/store";

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
