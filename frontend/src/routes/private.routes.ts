import React from "react";
import { ComponentRouteProps } from "./routes.interface";

const UserListPage = React.lazy(
  () => import("../pages/private/users/userListContext")
);
const ArticleListPage = React.lazy(
  () => import("../pages/private/articles/articleListContext")
);

export const PRIVATE_ROUTES: ComponentRouteProps[] = [
  {
    name: "Users",
    component: UserListPage,
    path: "/users",
    key: "USER_LIST",
  },
  {
    name: "Articles",
    component: ArticleListPage,
    path: "/articles",
    key: "ARTICLE_LIST",
  },
];
