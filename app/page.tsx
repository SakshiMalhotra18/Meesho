'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle2, ShieldAlert, FileText, Bot, Scale, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / (totalScroll || 1)));
      setScrollProgress(progress);

      if (progress < 0.15) setActiveStep(0); // Hero
      else if (progress < 0.35) setActiveStep(1); // Seller
      else if (progress < 0.55) setActiveStep(2); // Transit Anomaly
      else if (progress < 0.75) setActiveStep(3); // Customer Complaint
      else setActiveStep(4); // AI Resolution
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100vh', color: 'var(--color-text-primary)', fontFamily: 'var(--font-inter)' }}>
      {/* Top Floating Nav */}
      <header
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1100px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          padding: '10px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 24, height: 24, background: 'var(--color-ai)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={13} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.02em' }}>ResolveAI</span>
          <span className="badge badge-ai" style={{ fontSize: '0.625rem' }}>Concept Prototype</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/control-tower" className="btn btn-sm btn-ghost">
            Enter Control Tower
          </Link>
          <Link href="/cases/MR-39281" className="btn btn-sm btn-ai">
            Start Investigation <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* Progress Bar Top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'var(--color-ai)',
          width: `${scrollProgress * 100}%`,
          zIndex: 101,
          transition: 'width 0.1s linear',
        }}
      />

      {/* Scene 1 — Hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '120px 24px 60px',
          position: 'relative',
        }}
      >
        <div className="badge badge-accent" style={{ marginBottom: '16px', padding: '6px 14px', fontSize: '0.75rem' }}>
          Agentic AI Marketplace Intelligence
        </div>

        <h1 className="display-2xl" style={{ maxWidth: '900px', margin: '0 auto 24px' }}>
          What happened to <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>this package</span>?
        </h1>

        <p className="body-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
          One order. Three stories. Five AI agents. Reconstructing the truth behind e-commerce disputes.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/cases/MR-39281" className="btn btn-lg btn-ai" style={{ fontSize: '1rem', padding: '14px 28px' }}>
            Start Investigation <ArrowRight size={16} />
          </Link>
          <Link href="/control-tower" className="btn btn-lg btn-ghost" style={{ fontSize: '1rem', padding: '14px 28px' }}>
            Enter Control Tower
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.75rem', gap: '4px' }}>
          <span>Scroll to follow parcel journey</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* Scene 2 — Seller Scene */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '40px', background: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <div className="badge badge-neutral" style={{ marginBottom: '12px' }}>Scene 1 • Dispatch</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Rakesh Fashions (Surat)</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Rakesh packs an embroidered blue kurta (₹1,299). Dispatch weight is recorded at 642g with unbroken tamper-evident seal.
            </p>
            <div style={{ padding: '12px 16px', background: 'var(--color-canvas)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontFamily: 'monospace' }}>
              Order: MR-39281 | Weight: 642g | Seal: Intact
            </div>
          </div>
          <div style={{ background: 'var(--color-canvas)', height: '220px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
            📦✨
          </div>
        </div>
      </section>

      {/* Scene 3 & 4 — Logistics Transit & Jaipur Anomaly */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '40px', background: 'white' }}>
          <div className="badge badge-logistics" style={{ marginBottom: '12px' }}>Scene 2 • Transit Anomaly</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '20px' }}>Parcel In Transit (Jaipur Hub)</h2>

          <div style={{ padding: '24px', background: 'var(--color-warning-light)', border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-lg)', margin: '20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-warning-dark)', fontWeight: 700, fontSize: '1.125rem' }}>
              <ShieldAlert size={20} /> Weight Mismatch Anomaly Detected
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-danger)', margin: '12px 0' }}>
              642 g → 511 g (-131g drop)
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Weight recorded at Jaipur Hub drops by 131g. Automated alert flagged potential parcel tampering during hub transfer.
            </p>
          </div>
        </div>
      </section>

      {/* Scene 5 & 6 — Customer Delivery & Complaint */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '40px', background: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div style={{ background: 'var(--color-canvas)', height: '220px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
            🛍️❓
          </div>
          <div>
            <div className="badge badge-accent" style={{ marginBottom: '12px' }}>Scene 3 • Complaint</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>Ananya (Delhi)</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Ananya receives the parcel and files a return claim: &quot;I received a plain white dupatta instead of the blue kurta I ordered.&quot;
            </p>
            <div style={{ padding: '12px 16px', background: 'var(--color-danger-light)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-danger-dark)', fontWeight: 600 }}>
              Claim: Wrong Item Received (₹1,299)
            </div>
          </div>
        </div>
      </section>

      {/* Scene 7 & 8 — Mira & Multi-Agent Investigation */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div className="badge badge-ai" style={{ marginBottom: '16px', padding: '6px 14px' }}>
          Scene 4 • Autonomous Investigation
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '16px' }}>Mira & Agent Network Activated</h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '550px', margin: '0 auto 40px' }}>
          5 specialized AI agents analyze dispatch images, weight delta history, party risk metrics, and policies.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', textAlign: 'left' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, color: '#20A176', marginBottom: '4px' }}>Tara — Evidence Agent</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Confirmed product mismatch. Dispatch photo matches SKU; return item photo shows white dupatta. (96% conf)
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, color: '#4D78FF', marginBottom: '4px' }}>Raahi — Logistics Agent</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Identified 131g weight drop at Jaipur Hub. Jaipur hub anomaly rate (2.8%) is 4x network baseline.
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, color: '#F2A63B', marginBottom: '4px' }}>Kavach — Risk Agent</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Customer risk low (12%), Seller risk low (8%), Logistics segment risk high (84%).
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, color: '#D94B52', marginBottom: '4px' }}>Niti — Policy Agent</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Applied Policy P-014 (Wrong Product — Logistics Responsible).
            </div>
          </div>
        </div>
      </section>

      {/* Scene 9 — Final Resolution Call to Action */}
      <section style={{ padding: '100px 24px', background: 'white', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Resolution Delivered with 94% Confidence
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
            Full refund for Ananya • Protected payout for Rakesh • Logistics investigation opened for Jaipur Hub.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cases/MR-39281" className="btn btn-lg btn-ai" style={{ fontSize: '1rem', padding: '16px 32px' }}>
              Explore Case MR-39281 <ArrowRight size={16} />
            </Link>
            <Link href="/control-tower" className="btn btn-lg btn-ghost" style={{ fontSize: '1rem', padding: '16px 32px' }}>
              Open Operational Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', borderTop: '1px solid var(--color-border)' }}>
        ResolveAI — Independent concept prototype built with synthetic marketplace data. Not affiliated with Meesho.
      </footer>
    </div>
  );
}
