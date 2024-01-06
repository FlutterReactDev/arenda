import { FC, PropsWithChildren } from "react";
import { useAboutMeQuery } from "../model/api/userApi";
import { AboutMeContext } from "./AboutMeContext";
import { useUser } from "../model/useUser";

export const AboutMe: FC<PropsWithChildren> = (props) => {
  const { isLoaded } = useUser();
  const { refetch } = useAboutMeQuery();
  const { children } = props;
  if (!isLoaded) {
    return <></>;
  }
  return (
    <AboutMeContext.Provider
      value={{
        refetch,
      }}
    >
      {children}
    </AboutMeContext.Provider>
  );
};
