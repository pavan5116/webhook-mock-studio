import { useEffect, useState } from "react";
import API from "../Api";
import DashboardLayout from "../components/DashboardLayout";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/logs/").then((res) => setLogs(res.data));
  }, []);

  return (
    <DashboardLayout title="Request Logs" sectionNum="04">

      {logs.length === 0 ? (
        <div className="border border-rule bg-card p-12 text-center">
          <p className="font-serif text-2xl mb-2 text-ink">No requests yet</p>
          <p className="text-ink-muted">
            Hit one of your mocks and they'll show up here.
          </p>
        </div>
      ) : (
        <div className="border border-rule bg-card divide-y divide-rule overflow-hidden">

          {/* Header row — like a printed table */}
          <div className="hidden md:grid grid-cols-[40px_80px_1fr_80px_180px] gap-4 px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-ink-muted bg-paper">
            <div>#</div>
            <div>Method</div>
            <div>Endpoint</div>
            <div>Status</div>
            <div>Time</div>
          </div>

          {logs.map((log, i) => (
            <div
              key={i}
              className="grid grid-cols-[40px_80px_1fr_80px_180px] gap-4 px-6 py-3 items-center font-mono text-sm hover:bg-paper transition"
            >
              <span className="text-ink-muted text-xs">{String(i + 1).padStart(2, "0")}</span>
              <MethodBadge method={log.method} />
              <span className="text-ink truncate">/{log.endpoint}</span>
              <StatusBadge status={log.status} />
              <span className="text-ink-muted text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

function MethodBadge({ method }) {
  const colors = {
    GET: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-700/30",
    POST: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-700/30",
    PUT: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-700/30",
    DELETE: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-700/30",
  };
  const cls = colors[method] || "bg-paper text-ink-muted border-rule";
  return (
    <span className={`px-2 py-0.5 border text-[10px] font-bold tracking-wider w-14 text-center ${cls}`}>
      {method}
    </span>
  );
}

function StatusBadge({ status }) {
  const n = parseInt(status, 10);
  let cls = "text-ink-muted";
  if (n >= 200 && n < 300) cls = "text-emerald-700 dark:text-emerald-400";
  else if (n >= 400 && n < 500) cls = "text-amber-700 dark:text-amber-400";
  else if (n >= 500) cls = "text-red-700 dark:text-red-400";
  return <span className={`text-xs font-bold ${cls}`}>{status}</span>;
}
