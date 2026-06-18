import axios from "axios";

export interface PingResult {
  status: "UP" | "DOWN";
  statusCode: number | null;
  responseTime: number | null;
}

export const pingUrl = async (
  url: string
): Promise<PingResult> => {
  const startTime = Date.now();

  try {
    const response = await axios.get(url, {
      timeout: 5000,
      validateStatus: () => true,
    });

    return {
      status:
        response.status >= 200 &&
        response.status < 400
          ? "UP"
          : "DOWN",

      statusCode: response.status,

      responseTime:
        Date.now() - startTime,
    };
  } catch {
    return {
      status: "DOWN",
      statusCode: null,
      responseTime: null,
    };
  }
};
