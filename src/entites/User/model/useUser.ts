import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCurrency } from "./selectors";
import { Currency } from "./types/UserType";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { userAction } from "..";
import { USER_CURRENCY } from "../constant/user";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector(getCurrency);
  const changeCurrency = (currency: Currency) => {
    dispatch(userAction.setCurrency(currency));
    localStorage.setItem(USER_CURRENCY, JSON.stringify(currency));
  };

  return {
    currentCurrency,
    changeCurrency,
  };
};
