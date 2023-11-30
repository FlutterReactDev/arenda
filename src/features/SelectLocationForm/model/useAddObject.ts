import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";

import { addObjectActions } from "..";
import { SelectLocationSchemaType } from "./schema";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getObjectFormData } from "./selectors";

export const useAddObject = () => {
  const dispatch = useAppDispatch();
  const objectFormData = useAppSelector(getObjectFormData);

  const setAddObjectData = (data: SelectLocationSchemaType) => {
    dispatch(addObjectActions.setLocationData(data));
  };

  return {
    objectFormData,
    setAddObjectData,
  };
};
