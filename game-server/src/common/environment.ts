import { config } from "dotenv";

config();

type IEnvironment = {
  APP_NAME: string;
  VERSION: string;
  LISTEN_PORT: number;
  MONGODB_URI_DEV: string;
  DB_USER: string;
  DB_PASS: string;
};
const Environment: IEnvironment = {
  APP_NAME: process.env.APP_NAME || "application",
  VERSION: process.env.VERSION || "1.0.0",
  LISTEN_PORT: process.env.LISTEN_PORT
    ? Number(process.env.LISTEN_PORT)
    : 13089,
  MONGODB_URI_DEV: process.env.MONGODB_URI_DEV || "mongodb://localhost:27017/",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
};
export default Environment;
