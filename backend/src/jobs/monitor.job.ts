import cron from "node-cron";

import { Monitor } from "../models/Monitor.js";
import { HealthCheck } from "../models/HealthCheck.js";

import { pingUrl } from "../services/ping.service.js";

export const startMonitorJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log(
      `[MONITOR] Running at ${new Date().toISOString()}`
    );

    const monitors =
      await Monitor.find();

    for (const monitor of monitors) {
      try {
        const result =
          await pingUrl(monitor.url);

        await HealthCheck.create({
          monitorId: monitor._id,

          status: result.status,

          statusCode:
            result.statusCode,

          responseTime:
            result.responseTime,

          checkedAt: new Date(),
        });
      } catch (error) {
        console.error(
          `Failed monitor: ${monitor.url}`,
          error
        );
      }
    }
  });
};
