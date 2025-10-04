import mongoose from "mongoose";
import { ENV } from "./config/env";
import { createApp } from "./app";

async function start() {
  try {
    if (!ENV.MONGODB_URI) throw new Error("MONGODB_URI not set");
    await mongoose.connect(ENV.MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log("[db] connected");

    const app = createApp();
    app.listen(ENV.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`[server] listening on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();