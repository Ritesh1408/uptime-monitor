import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { Monitor } from "../models/Monitor.js";
import { createMonitorSchema } from "../validators/monitor.validator.js";

import { sendSuccess } from "../utils/response.js";

import { MESSAGES } from "../constants/messages.js";
import { AppError } from "../exceptions/AppError.js";
import { HTTP_STATUS } from "../constants/http-status.js";
import { getMonitorStatuses } from "../services/monitor.service.js";

export const createMonitor = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData =
      createMonitorSchema.parse(req.body);

    const existingMonitor =
      await Monitor.findOne({
        url: validatedData.url,
      });

    if (existingMonitor) {
      throw new AppError(
        MESSAGES.MONITOR_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hostname = new URL(
      validatedData.url
    ).hostname;

    const monitor = await Monitor.create({
      url: validatedData.url,
      name: hostname,
    });

    sendSuccess(
      res,
      HTTP_STATUS.CREATED,
      MESSAGES.MONITOR_CREATED,
      monitor
    );
  }
);

export const getMonitors = asyncHandler(
  async (_req: Request, res: Response) => {
    const monitors = await getMonitorStatuses();

    sendSuccess(
      res,
      HTTP_STATUS.OK,
      MESSAGES.MONITORS_FETCHED,
      monitors
    );
    return;
  }
);

export const deleteMonitor = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedMonitor =
      await Monitor.findByIdAndDelete(id);

    if (!deletedMonitor) {
      throw new AppError(
        MESSAGES.MONITOR_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    sendSuccess(
      res,
      HTTP_STATUS.OK,
      MESSAGES.MONITOR_DELETED
    );
  }
);