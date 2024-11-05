import FallbackPage from "components/fallbackui";
import MiniDrawer from "components/sidebar";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./app-routes";
import ProtectedRoute from "./private-route";

const AppRoutes = () => {
  const authKey = useSelector((state) => state.authTokenAccess.token);
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Component = route.component;
          return (
            <Route
              key={`route-${index}`}
              path={route.path}
              element={
                <Suspense fallback={<FallbackPage />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        <Route element={<MiniDrawer />}>
          {privateRoutes.map((route, index) => {
            let Component = route.component;
            return (
              <Route
                key={`privateroute-${index}`}
                path={route.path}
                element={
                  <Suspense fallback={<></>}>
                    <ProtectedRoute authKey={authKey}>
                      <Component />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </React.Fragment>
  );
};
export default AppRoutes;
