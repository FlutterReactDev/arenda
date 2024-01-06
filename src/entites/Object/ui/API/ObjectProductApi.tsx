import { ObjectProduct, useGetObjectProductQuery } from "@entites/Object";
import { FC, ReactNode } from "react";

interface ObjectProductApi {
  objectId: string;
  render: (
    data: ObjectProduct | undefined,
    isSuccess: boolean,
    isLoading: boolean
  ) => ReactNode;
}
export const ObjectProductApi: FC<ObjectProductApi> = (props) => {
  const { objectId, render } = props;
  const { data, isSuccess, isFetching } = useGetObjectProductQuery(objectId);

  return <>{render(data, isSuccess, isFetching)}</>;
};
