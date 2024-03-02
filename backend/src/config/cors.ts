import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];

export const CORS_OPTIONS: cors.CorsOptions = {
  origin: allowedOrigins,
};
