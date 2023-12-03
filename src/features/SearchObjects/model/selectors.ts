import { RootState } from "@app/providers/StoreProvider";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";

export const useSearchObjectData = () => {
  const { searchData } = useAppSelector((state) => state.searchObject);
  return searchData;
};

export const getSearchObjectData = (state: RootState) =>
  state.searchObject.searchData;
