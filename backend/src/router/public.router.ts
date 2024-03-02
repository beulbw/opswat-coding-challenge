import express from "express";
import authRoutes from "./routes/auth.routes";

const publicRouter = express.Router();

const publicRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
];

publicRoutes.forEach((route) => {
  publicRouter.use(route.path, route.route);
});

export default publicRouter;
