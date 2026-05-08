import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { API_BASE } from "../Api";
import DashboardLayout from "../components/DashboardLayout";

export default function Createmock() {
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("200");
  const [headers, setHeaders] = useState("");
  const nav = useNavigate();

  const createapi = async (e) => {
    e.preventDefault();

    try {
      const bodyData = response ? JSON.parse(response) : {};
      const headerData = headers ? JSON.parse(headers) : {};

      await API.post("/mock/", {
        endpoint_id: endpoint,
        method: method,
        response_body: bodyData,
        status_code: parseInt(status),
        headers: headerData,
      });

      const url = `${API_BASE}/mock/${endpoint}`;
      await navigator.clipboard.writeText(url);

      alert(`Mock API Created!\nEndpoint: ${url}\nCopied to clipboard`);

      nav("/mocks");

      setEndpoint("");
      setMethod("GET");
      setResponse("");
      setStatus("200");
      setHeaders("");
    } catch (err) {
      if (err instanceof SyntaxError) {
        alert("Check your JSON formatting in the Response or Headers fields.");
      } else {
        console.error("Error creating mock:", err);
        alert("Something went wrong. check the console.");
      }
    }
  };

  return (
    <DashboardLayout title="Create Mock API" sectionNum="02">

      <p className="text-ink-muted mb-8 max-w-2xl leading-relaxed">
        Define an endpoint, pick a method, and shape the response. We'll give you a URL you can hit immediately.
      </p>

      <form onSubmit={createapi} className="border border-rule bg-card max-w-3xl">

        <div className="p-6 md:p-8 space-y-6">

          <Field label="Endpoint Path" hint="The path users will hit, e.g. users/list">
            <input
              type="text"
              placeholder="users/list"
              value={endpoint}
              required
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition font-mono text-sm"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="HTTP Method">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition font-mono text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </Field>

            <Field label="Status Code">
              <input
                type="number"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition font-mono text-sm"
              />
            </Field>
          </div>

          <Field label="Response Headers" hint="JSON object. Optional.">
            <textarea
              rows="4"
              placeholder='{ "Content-Type": "application/json" }'
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition font-mono text-sm"
            />
          </Field>

          <Field label="Response Body" hint="JSON returned to the caller.">
            <textarea
              rows="8"
              placeholder='{ "id": 1, "name": "Test" }'
              value={response}
              required
              onChange={(e) => setResponse(e.target.value)}
              className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition font-mono text-sm"
            />
          </Field>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 px-6 md:px-8 py-4 border-t border-rule bg-paper">
          <button
            type="submit"
            className="bg-brick text-on-brick px-6 py-3 rounded-sm font-medium hover:bg-brick-dark transition"
          >
            Save Mock API →
          </button>
          <button
            type="button"
            onClick={() => {
              setEndpoint(""); setResponse(""); setHeaders("");
            }}
            className="border border-rule bg-card px-6 py-3 rounded-sm font-medium text-ink hover:bg-paper-shade transition"
          >
            Clear
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-ink-muted mt-2 italic">{hint}</p>}
    </div>
  );
}
