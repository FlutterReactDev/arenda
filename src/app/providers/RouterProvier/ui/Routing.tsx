import { AddHotelPage } from "@pages/AddHotelPage";
import { AddObjectPage } from "@pages/AddObjectPage";
import {
  AddObjectStepperPage,
  ProtectAddObjectRoute,
} from "@pages/AddObjectStepperPage";
import { HomePage } from "@pages/HomePage";
import { ObjectDetailPage } from "@pages/ObjectDetailPage";

import { SearchResultPage } from "@pages/SearchResultPage";
import { TestPage } from "@pages/TestPage";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route path="/test" element={<TestPage />} />
      <Route
        path="/add-object"
        element={
          <Suspense fallback={<PageLoader />}>
            <AddObjectPage />
          </Suspense>
        }
      />

      <Route path="/search-result" element={<SearchResultPage />} />
      <Route
        path="/add-object-info"
        element={
          <ProtectAddObjectRoute>
            <AddObjectStepperPage />
          </ProtectAddObjectRoute>
        }
      />
      <Route path="/add-hotel" element={<AddHotelPage />} />
      <Route path="/object-detail" element={<ObjectDetailPage />} />
    </Routes>
  );
};
