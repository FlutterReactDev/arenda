import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCurrency, getUser } from "./selectors";
import { Currency, UserData } from "./types/UserType";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { userAction } from "..";
import { USER_CURRENCY } from "../constant/user";
import { useContext } from "react";
import { AboutMeContext } from "../ui/AboutMeContext";

export const useUser = () => {
  const { refetch } = useContext(AboutMeContext);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getUser);
  const isLoaded = useAppSelector((state) => state.user.isLoaded);
  const currentCurrency = useAppSelector(getCurrency);
  const changeCurrency = (currency: Currency) => {
    dispatch(userAction.setCurrency(currency));
    localStorage.setItem(USER_CURRENCY, JSON.stringify(currency));
  };
  const setUserData = (data: UserData) => {
    dispatch(userAction.setUserData(data));
  };

  const getMe = () => {
    if (refetch) {
      return refetch();
    }
  };

  return {
    currentCurrency,
    changeCurrency,
    setUserData,
    currentUser,
    getMe,
    isLoaded,
  };
};
