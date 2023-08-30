import { HomePage } from "@pages/HomePage";
import { TestPage } from "@pages/TestPage";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback="Loading">
            <HomePage />
          </Suspense>
        }
      />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};
