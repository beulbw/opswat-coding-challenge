import express from "express";
import userRoutes from "./routes/user.routes";
import articleRoutes from "./routes/article.routes";

const privateRouter = express.Router();

const protectedRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/articles",
    route: articleRoutes,
  },
];

protectedRoutes.forEach((route) => {
  privateRouter.use(route.path, route.route);
});

export default privateRouter;
