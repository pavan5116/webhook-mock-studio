import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

// Color tokens are defined in src/index.css and auto-flip in dark mode.
//   paper / ink / ink-muted / brick / on-brick / rule / dot / card / code-bg / code-fg

export default function Home() {
  return (
    // position: fixed escapes any leftover body styles
    <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto bg-paper text-ink antialiased z-[1000]">

      {/* Dot grid background — like graph paper */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative">

        {/* ========== NAV ========== */}
        <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl text-ink">
            <Logo />
            MockAPI
            <span className="text-xs text-ink-muted font-sans font-normal ml-1">v0.1</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-ink-muted">
            <a href="#features" className="hover:text-ink transition">Features</a>
            <a href="#how" className="hover:text-ink transition">How</a>
            <a href="#cta" className="hover:text-ink transition">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-ink hover:underline underline-offset-4">Sign in</Link>
            <Link to="/register" className="text-sm bg-brick text-on-brick px-4 py-2 rounded-sm font-medium hover:bg-brick-dark transition">
              Get started →
            </Link>
          </div>
        </nav>

        {/* ========== HERO ========== */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-20">

          <SectionMarker num="01" label="Introduction" />

          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05] max-w-4xl">
            Mock APIs<br />
            <span className="italic text-brick">in seconds.</span><br />
            Ship faster.
          </h1>

          <p className="text-lg text-ink-muted max-w-xl mb-10 leading-relaxed">
            Stop waiting for the backend. Define endpoints, shape responses, capture webhooks — without writing server code.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link to="/register" className="bg-brick text-on-brick px-6 py-3 rounded-sm font-medium hover:bg-brick-dark transition">
              Start building free →
            </Link>
            <a href="#features" className="border border-rule bg-card px-6 py-3 rounded-sm font-medium hover:bg-paper-shade transition text-ink">
              Read the docs
            </a>
          </div>

          <p className="text-xs text-ink-muted font-mono mt-8 tracking-wider">
            ─── No credit card required · Free for personal use
          </p>
        </section>

        {/* ========== CODE PREVIEW (corner-bracketed) ========== */}
        <section className="max-w-3xl mx-auto px-6 md:px-10 mb-24">
          <CornerBrackets>
            {/* Code blocks intentionally stay dark in both light and dark modes */}
            <div className="bg-code-bg text-code-fg p-6 font-mono text-sm overflow-x-auto">
              <div className="text-ink-muted text-xs mb-3 uppercase tracking-widest"># GET /users/list</div>
              <pre className="whitespace-pre">
<span className="text-brick">$</span> curl https://api.mockstudio.dev/users/list
<span className="text-emerald-400">{`{
  "users": [
    { "id": 1, "name": "Ada Lovelace" },
    { "id": 2, "name": "Alan Turing" }
  ],
  "total": 2
}`}</span>
              </pre>
            </div>
          </CornerBrackets>
        </section>

        {/* ========== FEATURES ========== */}
        <section id="features" className="max-w-6xl mx-auto px-6 md:px-10 py-20">

          <SectionMarker num="02" label="Features" />

          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-12 max-w-2xl">
            Everything you need <span className="italic text-brick">to mock</span>
          </h2>

          {/* Grid uses 1px gap on a tan bg to draw rules between cards (notebook feel) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dot border border-dot">
            <FeatureCard num="01" title="Instant Endpoints" text="GET, POST, PUT, DELETE in seconds. No server, no config." />
            <FeatureCard num="02" title="Realistic Responses" text="Any JSON, any status, any headers. Match your real backend exactly." />
            <FeatureCard num="03" title="Webhook Catcher" text="Capture incoming requests in real-time. Debug without deploying." />
            <FeatureCard num="04" title="Request Logs" text="Every request that hits your mocks — method, status, time, payload." />
            <FeatureCard num="05" title="Private by Default" text="Mocks are isolated and authenticated. No accidental sharing." />
            <FeatureCard num="06" title="Built for Speed" text="Sub-100ms response times. No cold starts. No surprises." />
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section id="how" className="max-w-3xl mx-auto px-6 md:px-10 py-20">

          <SectionMarker num="03" label="How it works" />

          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Three steps. <span className="italic text-brick">That's it.</span>
          </h2>

          <ol className="space-y-0">
            <Step n="1" title="Sign up" text="Account in 10 seconds. No credit card." />
            <Step n="2" title="Define your endpoint" text="Pick the path, method, body, and status code." />
            <Step n="3" title="Use the URL" text="Copy the generated URL and drop it into your frontend." />
          </ol>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section id="cta" className="max-w-3xl mx-auto px-6 md:px-10 py-20">
          <CornerBrackets>
            <div className="bg-card p-12 md:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to <span className="italic text-brick">ship faster?</span>
              </h2>
              <p className="text-ink-muted mb-8 max-w-md mx-auto">Join developers using MockAPI to build frontends without waiting for backends.</p>
              <Link to="/register" className="inline-block bg-brick text-on-brick px-6 py-3 rounded-sm font-medium hover:bg-brick-dark transition">
                Start building free →
              </Link>
            </div>
          </CornerBrackets>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="border-t border-rule mt-12">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-muted">

            <div className="font-mono">MockAPI · 2026</div>

            <div className="flex items-center gap-6 uppercase tracking-widest">
              <a href="#" className="hover:text-ink transition">Privacy</a>
              <a href="#" className="hover:text-ink transition">Terms</a>
              <a href="#" className="hover:text-ink transition">Docs</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// --- Reusable pieces ---

function SectionMarker({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-widest text-ink-muted">
      <span className="font-mono">§ {num}</span>
      <span className="h-px w-12 bg-dot" />
      <span>{label}</span>
    </div>
  );
}

function CornerBrackets({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-brick z-10" />
      <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-brick z-10" />
      <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-brick z-10" />
      <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-brick z-10" />
      {children}
    </div>
  );
}

function FeatureCard({ num, title, text }) {
  return (
    <div className="bg-paper p-8 hover:bg-card transition">
      <div className="font-mono text-xs text-brick mb-4 tracking-widest">§ {num}</div>
      <h3 className="font-serif text-2xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <li className="flex gap-6 items-start border-b border-rule py-6 last:border-b-0 first:pt-0">
      <div className="font-serif text-5xl font-bold text-brick w-12 shrink-0 leading-none">
        {n}.
      </div>
      <div>
        <h3 className="font-serif text-xl font-bold mb-1">{title}</h3>
        <p className="text-ink-muted">{text}</p>
      </div>
    </li>
  );
}
