import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  if (!data) {
    return (
      <DashboardLayout title="Dashboard" sectionNum="01">
        <p className="text-ink-muted font-mono text-sm">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Dashboard"
      sectionNum="01"
      action={
        <Link
          to="/createmock"
          className="bg-brick text-on-brick px-4 py-2 rounded-sm font-medium text-sm hover:bg-brick-dark transition"
        >
          + Create Mock API
        </Link>
      }
    >

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-dot border border-dot mb-12">
        <StatCard label="Total APIs" value={data.total_apis} />
        <StatCard label="Total Requests" value={data.total_requests} />
      </div>

      {/* Recent Activity section */}
      <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-widest text-ink-muted">
        <span className="font-mono">─── Recent activity</span>
        <Link to="/logs" className="ml-auto text-brick hover:text-brick-dark normal-case tracking-normal">View all →</Link>
      </div>

      <div className="border border-rule bg-card">
        {data.recent_logs.length === 0 ? (
          <div className="px-6 py-12 text-center text-ink-muted text-sm">
            No requests yet. Create a mock and try hitting it.
          </div>
        ) : (
          <ul className="divide-y divide-rule">
            {data.recent_logs.map((log, i) => (
              <li key={i} className="px-6 py-3 flex items-center gap-4 font-mono text-sm">
                <span className="text-ink-muted text-xs w-6">{String(i + 1).padStart(2, "0")}</span>
                <MethodBadge method={log.method} />
                <span className="text-ink flex-1 truncate">/{log.endpoint}</span>
                <StatusBadge status={log.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-paper p-6 hover:bg-card transition">
      <p className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3">{label}</p>
      <p className="font-serif text-5xl font-bold tracking-tight text-ink">{value}</p>
    </div>
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
