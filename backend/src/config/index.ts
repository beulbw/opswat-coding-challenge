import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const CONFIG = {
  PORT: {
    API: Number(process.env.API_PORT),
    WEB: Number(process.env.WEB_PORT),
  },
  DATABASE: {
    HOST: String(process.env.POSTGRES_HOST),
    PORT: Number(process.env.POSTGRES_PORT),
    NAME: String(process.env.POSTGRES_DATABASE),
    USER: String(process.env.POSTGRES_USER),
    PASSWORD: String(process.env.POSTGRES_PASSWORD),
  },
  JWT: {
    EXPIRY_TIME: String(process.env.JWT_EXPIRY_TIME),
    SECRET_KEY: String(process.env.JWT_SECRET_KEY),
  },
};
