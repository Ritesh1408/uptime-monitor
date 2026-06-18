import { Router } from "express";

import {
  createMonitor,
  getMonitors,
  deleteMonitor,
} from "../controllers/monitor.controller.js";

const router = Router();

router.post("/", createMonitor);

router.get("/", getMonitors);

router.delete("/:id", deleteMonitor);

export default router;
