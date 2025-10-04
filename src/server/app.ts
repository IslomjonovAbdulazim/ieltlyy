import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth.routes";
import testsRoutes from "./routes/tests.routes";
import submissionsRoutes from "./routes/submissions.routes";
import uploadRoutes from "./routes/upload.routes";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: ENV.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/auth", authRoutes);
  app.use("/tests", testsRoutes);
  app.use("/", submissionsRoutes);
  app.use("/", uploadRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // eslint-disable-next-line no-console
    console.error("[error]", err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  return app;
};

export default createApp;