import { z } from "zod";

export const createMonitorSchema = z.object({
  url: z.url(),
});
