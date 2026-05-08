import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await API.get("/logout/");
        nav("/");
      } catch (error) {
        console.error(error, error.response?.data);
        nav("/");
      }
    };

    performLogout();
  }, [nav]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-paper text-ink flex items-center justify-center z-[1000]">

      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative flex items-center gap-3 text-ink-muted font-mono text-sm uppercase tracking-widest">
        <Spinner />
        <span>─── Logging out</span>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin text-brick" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
