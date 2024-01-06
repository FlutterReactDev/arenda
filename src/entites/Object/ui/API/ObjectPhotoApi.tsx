import { ObjectPhoto, useGetObjectImageQuery } from "@entites/Object";
import { FC, ReactNode } from "react";

interface ObjectProductApi {
  objectId: string;
  render: (
    data: ObjectPhoto | undefined,
    isSuccess: boolean,
    isLoading: boolean
  ) => ReactNode;
}

export const ObjectPhotoApi: FC<ObjectProductApi> = (props) => {
  const { objectId, render } = props;
  const { data, isSuccess, isFetching } = useGetObjectImageQuery(objectId);

  return <>{render(data, isSuccess, isFetching)}</>;
};
