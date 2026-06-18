import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startMonitorJob } from "./jobs/monitor.job.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  startMonitorJob();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();