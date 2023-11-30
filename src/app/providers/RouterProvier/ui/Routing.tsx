import { PageLoader } from "@shared/ui/PageLoader";
import { ReactNode, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";
import { PrivateRoute } from "./PrivateRoute";
import { BaseLayout } from "./BaseLayout";
import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";

export const Routing = () => {
  const routeElement = (element: ReactNode) => {
    return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
  };

  const withLayout = (
    element: ReactNode,
    layout: boolean | "header" | "footer"
  ) => {
    if (layout == true) {
      return <BaseLayout>{element}</BaseLayout>;
    }
    if (layout == "header") {
      return (
        <>
          <Header />
          {element}
        </>
      );
    }

    if (layout == "footer") {
      return (
        <>
          {element}
          <Footer />
        </>
      );
    }

    return element;
  };

  return (
    <Routes>
      {routeConfig.map((route) => {
        if (route?.children && route?.children.length) {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                route.private ? (
                  <PrivateRoute>
                    {withLayout(routeElement(route.element), route.layout)}
                  </PrivateRoute>
                ) : (
                  withLayout(routeElement(route.element), route.layout)
                )
              }
            >
              {route.children.map((route) => {
                return (
                  <Route
                    path={route.path}
                    key={route.path}
                    element={
                      route.private ? (
                        <PrivateRoute>
                          {withLayout(
                            routeElement(route.element),
                            route.layout
                          )}
                        </PrivateRoute>
                      ) : (
                        withLayout(routeElement(route.element), route.layout)
                      )
                    }
                  />
                );
              })}
            </Route>
          );
        }
        return (
          <Route
            path={route.path}
            key={route.path}
            element={
              route.private ? (
                <PrivateRoute>
                  {withLayout(routeElement(route.element), route.layout)}
                </PrivateRoute>
              ) : (
                withLayout(routeElement(route.element), route.layout)
              )
            }
          />
        );
      })}
    </Routes>
  );
};
