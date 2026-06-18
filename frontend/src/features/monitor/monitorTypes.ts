export interface Monitor {
  id: string;
  name: string;
  url: string;

  status: "UP" | "DOWN" | "UNKNOWN";

  statusCode: number | null;

  responseTime: number | null;

  lastChecked: string | null;
}

export interface MonitorState {
  monitors: Monitor[];
  loading: boolean;
  error: string | null;
}