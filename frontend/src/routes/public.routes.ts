import React from "react";
import { ComponentRouteProps } from "./routes.interface";

const LoginPage = React.lazy(
  () => import("../pages/public/login/loginContext")
);
const RegisterPage = React.lazy(
  () => import("../pages/public/register/registerContext")
);

export const PUBLIC_ROUTES: ComponentRouteProps[] = [
  {
    name: "Login",
    component: LoginPage,
    path: "/login",
    key: "LOGIN",
  },
  {
    name: "Register",
    component: RegisterPage,
    path: "/register",
    key: "REGISTER",
  },
];
