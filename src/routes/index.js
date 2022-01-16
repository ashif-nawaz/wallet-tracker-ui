import { Route, Routes } from "react-router-dom";

const ROUTES_CONFIG = [
  {
    id: "page_1",
    path: "/",
    component: <div>Home</div>,
    exact: true,
  },
  {
    id: "page_2",
    path: "/signup",
    component: <div>Signup</div>,
    exact: true,
  },
  {
    id: "page_3",
    path: "/dashboard",
    component: <div>Dashboard</div>,
    exact: true,
  },
];

const AllRoutes = (props) => {
  return (
    <Routes>
      {ROUTES_CONFIG.map((item) => (
        <Route
          key={item.id}
          path={item.path}
          element={item.component}
          exact={item.exact}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
