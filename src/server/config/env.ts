import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};

if (!ENV.MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.warn("[env] MONGODB_URI is not set. Set it in your .env file.");
}
if (!ENV.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn("[env] JWT_SECRET is not set. Set it in your .env file.");
}