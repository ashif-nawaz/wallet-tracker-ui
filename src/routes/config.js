import { lazy } from "react";

const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const Dashboard = lazy(() => import("../pages/kanban"));

const ROUTES_CONFIG = [
  {
    id: "page_1",
    path: "/",
    component: <Login />,
    exact: true,
    authGuard: false,
  },
  {
    id: "page_2",
    path: "/signup",
    component: <Signup />,
    exact: true,
    authGuard: false,
  },
  {
    id: "page_3",
    path: "/dashboard",
    component: <Dashboard />,
    exact: true,
    authGuard: true,
    redirect: "/",
  },
];

export { ROUTES_CONFIG };
