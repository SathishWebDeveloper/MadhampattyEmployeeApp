import { lazy } from "react";

const PRIVATE = "PRIVATE";
const PUBLIC = "PUBLIC";

export const publicRoutes = [
  {
    id: 1,
    name: "Login",
    path: "/",
    component: lazy(() => import("../container/auth/login")),
    routeType: PUBLIC,
  },
  {
    id: 2,
    name: "Forgot Password",
    path: "/forgot-password",
    component: lazy(() => import("../container/auth/login/forgot-password")),
    routeType: PUBLIC,
  },
  {
    id: 3,
    name: "Reset Password",
    path: "/reset-password",
    component: lazy(() => import("../container/auth/login/reset-password")),
    routeType: PUBLIC,
  },
  {
    id: 4,
    name: "Page Not Found",
    path: "*",
    component: lazy(() => import("../container/page-notfound")),
    routeType: PUBLIC,
  },
];

export const privateRoutes = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    component: lazy(() => import("../container/dashboard")),
    routeType: PRIVATE,
  },
  {
    id: 2,
    name: "StaffEnrollment",
    path: "/staffenrollment/*",
    component: lazy(() => import("../routes/nestedroutes")),
    routeType: PRIVATE,
  },
  {
    id: 3,
    name: "Leads",
    path: "/leads",
    component: lazy(() => import("../container/leads")),
    routeType: PRIVATE,
  },
  {
    id: 4,
    name: "Reports",
    path: "/reports",
    component: lazy(() => import("../container/reports")),
    routeType: PRIVATE,
  },
  {
    id: 5,
    name: "Settings",
    path: "/settings",
    component: lazy(() => import("../container/settings")),
    routeType: PRIVATE,
  },
];
