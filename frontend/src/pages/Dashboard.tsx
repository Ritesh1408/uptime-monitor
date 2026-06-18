import { useEffect } from "react";

import toast from "react-hot-toast";

import {
  createMonitor,
  fetchMonitors,
  deleteMonitor,
} from "../features/monitor/monitorThunks";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import AddMonitorForm from "../components/AddMonitorForm";
import MonitorTable from "../components/MonitorTable";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const { monitors, loading } = useAppSelector(
    (state) => state.monitor
  );

  useEffect(() => {
    dispatch(fetchMonitors());

    const interval = setInterval(() => {
      dispatch(fetchMonitors());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCreateMonitor = async (
    url: string
  ) => {
    try {
      await dispatch(
        createMonitor(url)
      ).unwrap();

      toast.success(
        "Monitor added successfully"
      );

      dispatch(fetchMonitors());
    } catch (error) {
      toast.error(
        "Failed to add monitor"
      );
    }
  };

  const handleDeleteMonitor = async (
    id: string
  ) => {
    try {
      await dispatch(
        deleteMonitor(id)
      ).unwrap();

      toast.success(
        "Monitor deleted successfully"
      );
    } catch (error) {
      toast.error(
        "Failed to delete monitor"
      );
    }
  };

  const upCount = monitors.filter(
    (monitor) => monitor.status === "UP"
  ).length;

  const downCount = monitors.filter(
    (monitor) => monitor.status === "DOWN"
  ).length;

  const validResponses = monitors.filter(
    (monitor) =>
      monitor.responseTime !== null
  );

  const avgResponseTime =
    validResponses.length > 0
      ? Math.round(
          validResponses.reduce(
            (acc, monitor) =>
              acc +
              (monitor.responseTime ?? 0),
            0
          ) / validResponses.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Uptime Monitor
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor website availability and
            response times in real-time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 mb-8 md:grid-cols-4">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Monitors
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {monitors.length}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Healthy
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {upCount}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Down
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {downCount}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Avg Response
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {avgResponseTime} ms
            </h2>
          </div>
        </div>

        {/* Add Monitor */}
        <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Add New Monitor
          </h3>

          <AddMonitorForm
            onSubmit={handleCreateMonitor}
          />
        </div>

        {/* Monitor Table */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-slate-500">
                Loading monitors...
              </div>
            </div>
          ) : (
            <MonitorTable
              monitors={monitors}
              onDelete={handleDeleteMonitor}
            />
          )}
        </div>
      </div>
    </div>
  );
}