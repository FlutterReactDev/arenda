import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";

export const useSelectLocationData = () => {
  const { city, country, objectType, objectTypeProperty, region } =
    useAppSelector((state) => state.addObjectForm);
  return {
    city,
    country,
    objectType,
    objectTypeProperty,
    region,
  };
};
