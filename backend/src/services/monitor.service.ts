import { Monitor } from "../models/Monitor.js";
import { HealthCheck } from "../models/HealthCheck.js";

export const getMonitorStatuses = async () => {
  const monitors = await Monitor.find().lean();

  const monitorIds = monitors.map(
    (monitor) => monitor._id
  );

  const latestChecks = await HealthCheck.aggregate([
    {
      $match: {
        monitorId: {
          $in: monitorIds,
        },
      },
    },
    {
      $sort: {
        checkedAt: -1,
      },
    },
    {
      $group: {
        _id: "$monitorId",
        latestCheck: {
          $first: "$$ROOT",
        },
      },
    },
  ]);

  const latestCheckMap = new Map(
    latestChecks.map((check) => [
      check._id.toString(),
      check.latestCheck,
    ])
  );

  return monitors.map((monitor) => {
    const latestCheck =
      latestCheckMap.get(
        monitor._id.toString()
      );

    return {
      id: monitor._id,
      name: monitor.name,
      url: monitor.url,

      status:
        latestCheck?.status ??
        "UNKNOWN",

      statusCode:
        latestCheck?.statusCode ??
        null,

      responseTime:
        latestCheck?.responseTime ??
        null,

      lastChecked:
        latestCheck?.checkedAt ??
        null,
    };
  });
};
