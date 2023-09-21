import { AddObjectPage } from "@pages/AddObjectPage";
import { HomePage } from "@pages/HomePage";
import { MapPage } from "@pages/MapPage";
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
        path="/addObject"
        element={
          <Suspense fallback={<PageLoader />}>
            <AddObjectPage />
          </Suspense>
        }
      />
      <Route path="/map" element={<MapPage />} />
      <Route path="/search-result" element={<SearchResultPage />} />
    </Routes>
  );
};
