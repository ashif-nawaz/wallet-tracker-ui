import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES_CONFIG } from "./config";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = (props) => {
  return (
    <Suspense fallback={<p>loading.....</p>}>
      <Routes>
        {ROUTES_CONFIG.map((item) => (
          <Route
            key={item.id}
            path={item.path}
            exact={item.exact}
            element={
              <ProtectedRoute
                children={item.component}
                check={item.authGuard}
                redirectTo={item.redirect}
              />
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
