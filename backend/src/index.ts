import cors from "cors";
import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { CONFIG } from "./config";
import { CORS_OPTIONS } from "./config/cors";
import sequelize from "./config/database";
import { swaggerDocument } from "./docs";
import { verifyToken } from "./middlewares/authMiddleware";
import {
  errorHandler,
  errorLogger,
  notFoundErrorHandler,
} from "./middlewares/errorHandler";
import privateRouter from "./router/private.router";
import publicRouter from "./router/public.router";

// initialize the appplication
const port = CONFIG.PORT.API;

const app = express();

app.use(cors(CORS_OPTIONS));

app.use(express.json());

// registering routes
app.use("/api", publicRouter);

app.use("/api", verifyToken, privateRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handling
app.use(errorLogger);
app.use(errorHandler);
app.use(notFoundErrorHandler);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${CONFIG.PORT.API}`);
  });
});
