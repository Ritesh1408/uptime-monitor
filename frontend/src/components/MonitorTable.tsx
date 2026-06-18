import type { Monitor } from "../features/monitor/monitorTypes";

import StatusBadge from "./StatusBadge";

interface Props {
  monitors: Monitor[];
  onDelete: (id: string) => void;
}

export default function MonitorTable({
  monitors, onDelete,
}: Props) {
  if (!monitors.length) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No monitors found
        </h3>

        <p className="mt-2 text-slate-500">
          Add your first URL above to start
          monitoring uptime.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              URL
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Response Time
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Last Checked
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {monitors.map((monitor) => (
            <tr
              key={monitor.id}
              className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="max-w-md">
                  <p
                    className="truncate font-medium text-slate-900"
                    title={monitor.url}
                  >
                    {monitor.url}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                <StatusBadge
                  status={monitor.status}
                />
              </td>

              <td className="px-6 py-4">
                {monitor.responseTime ? (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium">
                    {monitor.responseTime} ms
                  </span>
                ) : (
                  <span className="text-slate-400">
                    --
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {monitor.lastChecked ? (
                  new Date(
                    monitor.lastChecked
                  ).toLocaleString()
                ) : (
                  <span className="text-slate-400">
                    --
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(monitor.id)}
                  className="
                    text-red-600
                    hover:text-red-700
                    font-medium
                    transition-colors
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}