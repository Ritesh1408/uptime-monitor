import { Schema, model, Document } from "mongoose";

export interface IMonitor extends Document {
  url: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const monitorSchema = new Schema<IMonitor>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Monitor = model<IMonitor>(
  "Monitor",
  monitorSchema
);
