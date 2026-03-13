import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    /* We use a wrapper div that forces full screen regardless of global settings */
    <div style={styles.fullPageWrapper}>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.logo}>
            MockAPI <span style={styles.vLogo}>V</span>
          </div>
          <Link to="/login" style={styles.navLink}>Sign In</Link>
        </nav>

        <main style={styles.hero}>
          <h1 style={styles.title}>
            Stop Waiting for the <span style={styles.highlight}>Backend</span>
          </h1>
          <p style={styles.subtitle}>
            Create realistic REST endpoints in seconds. Generate mock data, 
            and keep your frontend momentum without writing a single line of server code.
          </p>

          <div style={styles.buttonGroup}>
            <Link to="/login" style={styles.primaryBtn}>Get Started for Free</Link>
          </div>

          <div style={styles.features}>
            <div style={styles.featureCard}>
              <h3 style={styles.cardTitle}>🚀 Instant Endpoints</h3>
              <p style={styles.cardText}>GET, POST, PUT, DELETE ready in clicks.</p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.cardTitle}>🛠️ Dynamic Data</h3>
              <p style={styles.cardText}>Use JSON templates for realistic responses.</p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.cardTitle}>🔗 Webhook Catcher</h3>
              <p style={styles.cardText}>Debug incoming requests in real-time.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  // This is the "Magic" part. It forces THIS page to be full screen 
  // without needing to change your global index.css
  fullPageWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#0f172a',
    zIndex: 1000, // Ensures it sits on top of any other global layouts
  },
  container: { 
    fontFamily: "'Segoe UI', Roboto, sans-serif", 
    color: '#f8fafc', 
    minHeight: '100%', 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '20px 5%', 
    alignItems: 'center',
    borderBottom: '1px solid #1e293b',
  },
  logo: { fontSize: '24px', fontWeight: '800', color: '#38bdf8' },
  vLogo: { 
    color: '#fff', 
    backgroundColor: '#38bdf8', 
    padding: '2px 10px', 
    borderRadius: '6px',
    marginLeft: '4px'
  },
  navLink: { color: '#f8fafc', textDecoration: 'none', fontWeight: '600' },
  hero: { 
    flex: 1,
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center', 
    padding: '60px 5%',
  },
  title: { 
    fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', 
    fontWeight: '900',
    maxWidth: '1100px', 
    marginBottom: '20px',
    lineHeight: '1.1'
  },
  highlight: { color: '#38bdf8' },
  subtitle: { 
    fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
    color: '#94a3b8', 
    maxWidth: '750px', 
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  buttonGroup: { display: 'flex' },
  primaryBtn: { 
    backgroundColor: '#38bdf8', 
    color: '#0f172a', 
    padding: '16px 36px', 
    borderRadius: '10px', 
    textDecoration: 'none', 
    fontWeight: 'bold',
    fontSize: '17px'
  },
  features: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
    gap: '25px', 
    marginTop: '60px', 
    width: '100%',
    maxWidth: '1200px'
  },
  featureCard: { 
    backgroundColor: '#1e293b', 
    padding: '30px', 
    borderRadius: '18px', 
    textAlign: 'left', 
    border: '1px solid #334155' 
  },
  cardTitle: { fontSize: '19px', marginBottom: '12px', color: '#f8fafc' },
  cardText: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }
};