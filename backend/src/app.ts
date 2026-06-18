import express from "express";
import cors from "cors";

import monitorRoutes from "./routes/monitor.routes.js";
import { sendSuccess } from "./utils/response.js";
import { MESSAGES } from "./constants/messages.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  return sendSuccess(
    res,
    200,
    MESSAGES.SERVER_RUNNING
  );
});

app.use("/api/v1/monitors", monitorRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;