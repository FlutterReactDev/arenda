import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";

export const useSearchObjectData = () => {
  const { serachData } = useAppSelector((state) => state.searchObject);
  return serachData;
};
