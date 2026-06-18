import { Schema, model, Types, Document } from "mongoose";

export type MonitorStatus = "UP" | "DOWN";

export interface IHealthCheck extends Document {
  monitorId: Types.ObjectId;
  status: MonitorStatus;
  statusCode: number | null;
  responseTime: number | null;
  checkedAt: Date;
}

const healthCheckSchema = new Schema<IHealthCheck>({
  monitorId: {
    type: Schema.Types.ObjectId,
    ref: "Monitor",
    required: true,
  },

  status: {
    type: String,
    enum: ["UP", "DOWN"],
    required: true,
  },

  statusCode: {
    type: Number,
    default: null,
  },

  responseTime: {
    type: Number,
    default: null,
  },

  checkedAt: {
    type: Date,
    default: Date.now,
  },
});

healthCheckSchema.index({
  monitorId: 1,
  checkedAt: -1,
});

export const HealthCheck = model<IHealthCheck>(
  "HealthCheck",
  healthCheckSchema
);
