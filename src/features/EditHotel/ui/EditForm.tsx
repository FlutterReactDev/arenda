import { Loader } from "@shared/ui/Loader";
import { FC, PropsWithChildren, Suspense } from "react";

export const EditForm: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
