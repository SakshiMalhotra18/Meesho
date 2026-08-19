'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Bot,
  Scale,
  ChevronDown,
  Truck,
  PackageCheck,
  UserCheck,
  Building2,
  RefreshCw,
  Search,
} from 'lucide-react';

interface Hub {
  id: string;
  name: string;
  role: string;
  weight: string;
  status: 'normal' | 'anomaly' | 'dispatch' | 'delivery';
  x: number; // percentage along path
  y: number;
  description: string;
}

const HUBS: Hub[] = [
  {
    id: 'surat',
    name: 'Surat (Origin)',
    role: 'Rakesh Fashions Warehouse',
    weight: '642 g',
    status: 'dispatch',
    x: 10,
    y: 50,
    description: 'Seller Rakesh packs women\'s embroidered blue kurta. Dispatch weight 642g recorded with intact seal.',
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad Hub',
    role: 'Intermediate Transit Hub',
    weight: '642 g',
    status: 'normal',
    x: 35,
    y: 35,
    description: 'Parcel scanned at transit hub. Seal intact, weight 642g matches seller dispatch telemetry.',
  },
  {
    id: 'jaipur',
    name: 'Jaipur Hub ⚠️',
    role: 'Logistics Anomaly Hub',
    weight: '511 g (-131g drop)',
    status: 'anomaly',
    x: 65,
    y: 65,
    description: 'ANOMALY DETECTED: Weight drops by 131g during hub transfer. Package outer tape shows signs of re-sealing.',
  },
  {
    id: 'delhi',
    name: 'Delhi (Destination)',
    role: 'Ananya Customer Delivery',
    weight: '511 g',
    status: 'delivery',
    x: 90,
    y: 50,
    description: 'Delivery partner Imran completes last-mile delivery. Customer Ananya receives package and reports wrong item.',
  },
];

export default function InteractiveLanding() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHub, setActiveHub] = useState<Hub>(HUBS[0]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / (totalScroll || 1)));
      setScrollProgress(progress);

      // Auto update active hub based on scroll progress
      if (progress < 0.25) setActiveHub(HUBS[0]);
      else if (progress < 0.45) setActiveHub(HUBS[1]);
      else if (progress < 0.70) setActiveHub(HUBS[2]);
      else setActiveHub(HUBS[3]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute position of scooter along the curve based on scroll progress
  const scooterX = Math.min(92, Math.max(8, 8 + scrollProgress * 84));
  // Sine curve interpolation for path y
  const scooterY = 50 + Math.sin(scrollProgress * Math.PI * 2) * 15;

  return (
    <div style={{ background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      {/* Fixed Header Navbar */}
      <header
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1000px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px 8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: 'var(--color-ai)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Zap size={16} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>ResolveAI</span>
            <span className="badge badge-ai" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>
              Concept Prototype
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/control-tower"
            className="btn btn-ghost btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '0.8125rem' }}
          >
            Control Tower
          </Link>
          <Link
            href="/cases/MR-39281"
            className="btn btn-ai btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 18px', fontSize: '0.8125rem' }}
          >
            Start Investigation <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Top Scroll Indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--color-ai), var(--color-accent))',
          width: `${scrollProgress * 100}%`,
          zIndex: 1001,
          transition: 'width 0.1s linear',
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '140px 24px 60px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="badge badge-accent"
          style={{ marginBottom: '20px', padding: '6px 16px', fontSize: '0.8125rem' }}
        >
          Autonomous Marketplace Operations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-2xl"
          style={{ maxWidth: '850px', margin: '0 auto 24px' }}
        >
          What happened to <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>this package</span>?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="body-lg"
          style={{ color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto 40px' }}
        >
          One order. Three stories. Five AI agents. Reconstructing the ground truth behind e-commerce disputes.
        </motion.p>

        {/* Hero Visual Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '700px',
            height: '180px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '24px',
            margin: '0 auto 40px',
          }}
        >
          {/* Seller Rakesh */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>👨‍💼</div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Rakesh (Seller)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Surat • Dispatch 642g</div>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--color-ai)' }}>➔</div>

          {/* Rider Imran */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🛵📦</div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Imran (Rider)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-warning-dark)' }}>Jaipur Hub Anomaly</div>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--color-ai)' }}>➔</div>

          {/* Customer Ananya */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>👩‍🦱</div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Ananya (Customer)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}>Delhi • Claim ₹1,299</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--color-text-tertiary)', fontSize: '0.8125rem' }}
        >
          <span>Scroll to drive parcel telemetry</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Sticky Interactive Logistics Map Section */}
      <section style={{ padding: '60px 24px 120px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '32px', background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-logistics" style={{ marginBottom: '6px' }}>Interactive Logistics Network</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Scroll-Linked Parcel Track & Telemetry</h2>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              Click any hub node to inspect scan evidence
            </div>
          </div>

          {/* Interactive SVG Network Map */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              background: 'var(--color-canvas)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              padding: '20px',
            }}
          >
            {/* SVG Path */}
            <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
              {/* Dotted Base Path */}
              <path
                d="M 100 150 Q 350 80, 650 200 T 900 150"
                fill="none"
                stroke="var(--color-border-strong)"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
              {/* Highlighted Progress Path */}
              <path
                d="M 100 150 Q 350 80, 650 200 T 900 150"
                fill="none"
                stroke="var(--color-ai)"
                strokeWidth="5"
                strokeDasharray="1000"
                strokeDashoffset={1000 - scrollProgress * 1000}
              />
            </svg>

            {/* Scooter / Parcel Animation Marker */}
            <div
              style={{
                position: 'absolute',
                left: `${scooterX}%`,
                top: `${scooterY}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                transition: 'all 0.1s linear',
              }}
            >
              <div
                style={{
                  background: 'var(--color-ai)',
                  color: 'white',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(118,87,246,0.4)',
                  border: '2px solid white',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>🛵</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Parcel {activeHub.weight}</span>
              </div>
            </div>

            {/* Interactive Hub Nodes */}
            {HUBS.map(hub => {
              const isSelected = activeHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  style={{
                    position: 'absolute',
                    left: `${hub.x}%`,
                    top: `${hub.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Pulse Ring for Jaipur Anomaly */}
                  {hub.status === 'anomaly' && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--color-danger)',
                        opacity: 0.3,
                        animation: 'pulse-ring 1.8s infinite',
                      }}
                    />
                  )}

                  <div
                    style={{
                      width: isSelected ? '40px' : '32px',
                      height: isSelected ? '40px' : '32px',
                      borderRadius: '50%',
                      background: hub.status === 'anomaly' ? 'var(--color-danger)' : hub.status === 'dispatch' ? 'var(--color-success)' : 'var(--color-surface)',
                      border: `3px solid ${isSelected ? 'var(--color-ai)' : hub.status === 'anomaly' ? 'var(--color-danger-dark)' : 'var(--color-border-strong)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: hub.status === 'anomaly' || hub.status === 'dispatch' ? 'white' : 'var(--color-text-primary)',
                      boxShadow: isSelected ? '0 0 16px var(--color-ai)' : 'var(--shadow-sm)',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {hub.status === 'dispatch' ? <Building2 size={16} /> : hub.status === 'anomaly' ? <AlertTriangle size={18} /> : hub.status === 'delivery' ? <UserCheck size={16} /> : <Truck size={14} />}
                  </div>

                  <span
                    style={{
                      marginTop: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: hub.status === 'anomaly' ? 'var(--color-danger)' : 'var(--color-text-primary)',
                      background: 'rgba(255,255,255,0.9)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    {hub.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Active Hub Telemetry Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '20px',
                padding: '20px',
                background: activeHub.status === 'anomaly' ? 'var(--color-warning-light)' : 'var(--color-canvas)',
                border: `1px solid ${activeHub.status === 'anomaly' ? 'var(--color-warning)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${activeHub.status === 'anomaly' ? 'badge-red' : activeHub.status === 'dispatch' ? 'badge-green' : 'badge-logistics'}`}>
                    {activeHub.role}
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Weight Scan: {activeHub.weight}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '6px' }}>{activeHub.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '4px', maxWidth: '700px' }}>
                  {activeHub.description}
                </p>
              </div>

              {activeHub.status === 'anomaly' && (
                <div style={{ background: 'var(--color-danger)', color: 'white', padding: '10px 18px', borderRadius: 'var(--radius-lg)', fontWeight: 700, fontSize: '0.875rem' }}>
                  ⚠️ Weight Drop: -131g
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Scene: Delivery Partner Imran & Customer Complaint Scene */}
      <section style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Imran Rider Card */}
          <div className="card" style={{ padding: '28px', background: 'white', borderRadius: 'var(--radius-2xl)' }}>
            <div className="badge badge-logistics" style={{ marginBottom: '12px' }}>Last-Mile Delivery Partner</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-logistics-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                🛵
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Imran (Delivery Partner)</h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>Delhi Courier Hub • OTP Verified 8742</div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Delivered parcel to Ananya at 12:41 PM. OTP verification completed successfully. Package outer tape was sealed upon delivery.
            </p>
          </div>

          {/* Ananya Customer Claim Card */}
          <div className="card" style={{ padding: '28px', background: 'white', borderRadius: 'var(--radius-2xl)' }}>
            <div className="badge badge-accent" style={{ marginBottom: '12px' }}>Customer Return Claim</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                👩‍🦱
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Ananya Sharma</h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>Delhi • Claim Amount: ₹1,299</div>
              </div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--color-danger-light)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-danger-dark)', fontWeight: 600 }}>
              &quot;I opened the package and received a plain white dupatta instead of the blue kurta I ordered.&quot;
            </div>
          </div>
        </div>
      </section>

      {/* Mira & Multi-Agent Network Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div className="badge badge-ai" style={{ marginBottom: '16px', padding: '6px 16px', fontSize: '0.8125rem' }}>
          Mira AI Orchestration Layer
        </div>

        <h2 className="display-lg" style={{ marginBottom: '16px' }}>
          5 Agents Reconstruct the Ground Truth
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 48px', fontSize: '1rem' }}>
          Autonomous AI agents examine dispatch images, package telemetry, historical risk signals, and policy rules in seconds.
        </p>

        {/* 5 Agents Interactive Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #20A176' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#20A176', textTransform: 'uppercase' }}>Tara • Evidence</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', margin: '6px 0' }}>Product Mismatch: 96%</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Dispatch image matches SKU. Return item photo confirms wrong product.
            </div>
          </div>

          <div className="card" style={{ padding: '20px', borderTop: '4px solid #4D78FF' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4D78FF', textTransform: 'uppercase' }}>Raahi • Logistics</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', margin: '6px 0' }}>131g Weight Loss</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Anomaly localized to Jaipur Hub transfer segment.
            </div>
          </div>

          <div className="card" style={{ padding: '20px', borderTop: '4px solid #F2A63B' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F2A63B', textTransform: 'uppercase' }}>Kavach • Risk</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', margin: '6px 0' }}>Logistics Risk: 84%</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Customer risk 12% (low), Seller risk 8% (low).
            </div>
          </div>

          <div className="card" style={{ padding: '20px', borderTop: '4px solid #D94B52' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D94B52', textTransform: 'uppercase' }}>Niti • Policy</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', margin: '6px 0' }}>Policy P-014 Applied</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Wrong Product — Logistics Responsible policy matched.
            </div>
          </div>

          <div className="card" style={{ padding: '20px', borderTop: '4px solid var(--color-ai)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ai)', textTransform: 'uppercase' }}>Samadhan • Resolution</div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', margin: '6px 0' }}>Confidence: 94%</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Refund Customer • Protect Seller • Flag Jaipur Hub.
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Call to Action */}
      <section style={{ padding: '100px 24px', background: 'white', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div className="badge badge-green" style={{ marginBottom: '16px', padding: '6px 16px', fontSize: '0.8125rem' }}>
            Case MR-39281 Resolved
          </div>
          <h2 className="display-lg" style={{ marginBottom: '16px' }}>
            94% Confidence Resolution
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '36px', lineHeight: 1.6 }}>
            Customer Ananya refunded (₹1,299) • Seller Rakesh payout protected • Jaipur Hub segment flagged for investigation.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cases/MR-39281" className="btn btn-lg btn-ai" style={{ borderRadius: 'var(--radius-full)', padding: '14px 32px' }}>
              Inspect Case MR-39281 <ArrowRight size={16} />
            </Link>
            <Link href="/control-tower" className="btn btn-lg btn-ghost" style={{ borderRadius: 'var(--radius-full)', padding: '14px 32px' }}>
              Open Operational Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', borderTop: '1px solid var(--color-border)' }}>
        ResolveAI — Independent concept prototype built with synthetic marketplace data. Not affiliated with Meesho.
      </footer>
    </div>
  );
}
