import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

// Color tokens defined in src/index.css — auto-flip in dark mode.
export default function DashboardLayout({ title, sectionNum, action, children }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-paper text-ink antialiased z-[1000] flex">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ========== SIDEBAR ========== */}
      <aside className="hidden md:flex flex-col w-60 border-r border-rule bg-paper/80 backdrop-blur relative z-10">

        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-5 border-b border-rule text-ink">
          <Logo />
          <span className="font-serif font-bold text-lg">MockAPI</span>
          <span className="text-[10px] text-ink-muted font-sans font-normal ml-1">v0.1</span>
        </Link>

        <div className="px-6 pt-5 pb-2 text-[10px] uppercase tracking-widest text-ink-muted font-mono">
          ─── Workspace
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          <NavItem to="/dashboard" icon={<IconHome />} label="Dashboard" />
          <NavItem to="/createmock" icon={<IconPlus />} label="Create Mock" />
          <NavItem to="/mocks" icon={<IconList />} label="My Mocks" />
          <NavItem to="/logs" icon={<IconActivity />} label="Logs" />
        </nav>

        <div className="border-t border-rule px-3 py-4">
          <NavItem to="/logout" icon={<IconLogout />} label="Logout" />
        </div>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="flex-1 overflow-y-auto relative z-10">

        {/* Mobile top bar */}
        <div className="md:hidden border-b border-rule bg-paper/80 backdrop-blur px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-serif font-bold text-ink">
            <Logo />
            MockAPI
          </Link>
          <Link to="/logout" className="text-sm text-ink-muted">Logout</Link>
        </div>

        {/* Mobile inline nav */}
        <div className="md:hidden border-b border-rule bg-paper/40 px-6 py-3 flex gap-5 overflow-x-auto text-xs uppercase tracking-widest">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-brick font-medium" : "text-ink-muted"}>Dashboard</NavLink>
          <NavLink to="/createmock" className={({ isActive }) => isActive ? "text-brick font-medium" : "text-ink-muted"}>Create</NavLink>
          <NavLink to="/mocks" className={({ isActive }) => isActive ? "text-brick font-medium" : "text-ink-muted"}>Mocks</NavLink>
          <NavLink to="/logs" className={({ isActive }) => isActive ? "text-brick font-medium" : "text-ink-muted"}>Logs</NavLink>
        </div>

        {/* Page content */}
        <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">

          {(title || sectionNum) && (
            <div className="mb-8">
              {sectionNum && (
                <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest text-ink-muted">
                  <span className="font-mono">§ {sectionNum}</span>
                  <span className="h-px w-12 bg-dot" />
                </div>
              )}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {title && <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>}
                {action}
              </div>
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-3 py-2 text-sm transition ${
          isActive
            ? "text-brick font-medium"
            : "text-ink hover:bg-paper-shade"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-brick" />
          )}
          <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
          {label}
        </>
      )}
    </NavLink>
  );
}

function IconHome() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>; }
function IconPlus() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>; }
function IconList() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>; }
function IconActivity() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>; }
function IconLogout() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>; }
