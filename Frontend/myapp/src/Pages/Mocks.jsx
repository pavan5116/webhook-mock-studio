import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { API_BASE } from "../Api";
import DashboardLayout from "../components/DashboardLayout";

function Mocks() {
  const [mocks, setMocks] = useState([]);

  useEffect(() => {
    API.get("/mymocks/")
      .then((res) => setMocks(res.data))
      .catch((err) => console.error("Error fetching mocks:", err));
  }, []);

  return (
    <DashboardLayout
      title="My Mocks"
      sectionNum="03"
      action={
        <Link
          to="/createmock"
          className="bg-brick text-on-brick px-4 py-2 rounded-sm font-medium text-sm hover:bg-brick-dark transition"
        >
          + Create Mock API
        </Link>
      }
    >

      {mocks.length === 0 ? (
        <div className="border border-rule bg-card p-12 text-center">
          <p className="font-serif text-2xl mb-2 text-ink">No mocks yet</p>
          <p className="text-ink-muted mb-6">Create your first mock and it'll show up here.</p>
          <Link
            to="/createmock"
            className="inline-block bg-brick text-on-brick px-4 py-2 rounded-sm font-medium text-sm hover:bg-brick-dark transition"
          >
            Create your first mock →
          </Link>
        </div>
      ) : (
        <div className="border border-rule bg-card divide-y divide-rule">
          {mocks.map((mock, i) => {
            const endpointPath = mock.endpoint_id || mock.endpoint;
            const url = `${API_BASE}/mock/${endpointPath}`;

            return (
              <div key={i} className="px-6 py-4 flex items-center gap-4 flex-wrap">
                <span className="text-ink-muted text-xs font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
                <MethodBadge method={mock.method} />
                <span className="font-mono text-sm text-ink flex-1 truncate">
                  /mock/{endpointPath}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    alert("Copied: " + url);
                  }}
                  className="px-3 py-1.5 bg-paper hover:bg-paper-shade border border-rule text-ink rounded-sm text-xs font-medium whitespace-nowrap"
                >
                  Copy URL
                </button>
              </div>
            );
          })}
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

export default Mocks;
