import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { FC, PropsWithChildren } from "react";

export const BaseLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
