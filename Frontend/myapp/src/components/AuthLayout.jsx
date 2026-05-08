import { Link } from "react-router-dom";
import Logo from "./Logo";

// Color tokens defined in src/index.css — auto-flip in dark mode.
export default function AuthLayout({ title, subtitle, children, footer, sectionLabel }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-paper text-ink antialiased z-[1000]">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative min-h-screen flex flex-col">

        {/* Logo top-left */}
        <div className="px-6 md:px-10 py-5 max-w-7xl mx-auto w-full">
          <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl text-ink w-fit">
            <Logo />
            MockAPI
            <span className="text-xs text-ink-muted font-sans font-normal ml-1">v0.1</span>
          </Link>
        </div>

        {/* Centered card */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">

            {sectionLabel && (
              <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-widest text-ink-muted">
                <span className="h-px w-12 bg-dot" />
                <span className="font-mono">{sectionLabel}</span>
                <span className="h-px flex-1 bg-dot" />
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-2">{title}</h1>
              {subtitle && <p className="text-ink-muted">{subtitle}</p>}
            </div>

            {/* Card with corner brackets */}
            <div className="relative">
              <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-brick z-10" />
              <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-brick z-10" />
              <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-brick z-10" />
              <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-brick z-10" />

              <div className="border border-rule bg-card p-8">
                {children}
              </div>
            </div>

            {footer && (
              <div className="text-center mt-6 text-sm text-ink-muted">{footer}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
