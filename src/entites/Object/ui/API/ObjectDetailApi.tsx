import { ObjectDetail, useGet2GISObjectInfoQuery } from "@entites/Object";
import { FC, ReactNode } from "react";

interface ObjectProductApi {
  objectId: string | string[];
  render: (
    data: ObjectDetail | undefined,
    isSuccess: boolean,
    isLoading: boolean
  ) => ReactNode;
}

export const ObjectDetailApi: FC<ObjectProductApi> = (props) => {
  const { objectId, render } = props;
  const { data, isSuccess, isFetching } = useGet2GISObjectInfoQuery(objectId);

  return <>{render(data, isSuccess, isFetching)}</>;
};
