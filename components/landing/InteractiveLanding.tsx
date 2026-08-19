'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Truck,
  UserCheck,
  Building2,
  Camera,
  Sparkles,
  ChevronDown,
  MousePointer,
  Play,
  RotateCcw,
} from 'lucide-react';

interface HubDetail {
  id: string;
  name: string;
  role: string;
  city: string;
  timestamp: string;
  weight: string;
  expectedWeight: string;
  status: 'dispatch' | 'normal' | 'anomaly' | 'delivery';
  operatorId: string;
  sealStatus: string;
  cctvStatus: string;
  x: number; // percentage across curve
  y: number;
  description: string;
  telemetry: { label: string; value: string; alert?: boolean }[];
}

const HUBS_DATA: HubDetail[] = [
  {
    id: 'surat',
    name: 'Surat Dispatch',
    role: 'Seller Warehouse — Rakesh Fashions',
    city: 'Surat, Gujarat',
    timestamp: '11 Aug • 14:30',
    weight: '642 g',
    expectedWeight: '620 g',
    status: 'dispatch',
    operatorId: 'SELL-2291',
    sealStatus: 'Intact (Tamper Tape #SR-889)',
    cctvStatus: 'Verified (Camera #04)',
    x: 12,
    y: 50,
    description: 'Seller Rakesh Patel packed women\'s embroidered blue kurta. Package sealed and weighed on calibrated scale.',
    telemetry: [
      { label: 'Dispatch Weight', value: '642 g' },
      { label: 'Expected Weight', value: '620 g' },
      { label: 'Tamper Seal', value: 'Verified' },
      { label: 'CCTV Packing', value: 'Recorded' },
    ],
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad Hub',
    role: 'Regional Sortation Facility',
    city: 'Ahmedabad, Gujarat',
    timestamp: '12 Aug • 06:15',
    weight: '642 g',
    expectedWeight: '642 g',
    status: 'normal',
    operatorId: 'OP-4412',
    sealStatus: 'Intact',
    cctvStatus: 'Normal Pass-through',
    x: 38,
    y: 30,
    description: 'Parcel scanned at sortation belt #3. Package weight 642g matches seller dispatch telemetry perfectly.',
    telemetry: [
      { label: 'Inbound Scan', value: '642 g' },
      { label: 'Outbound Scan', value: '642 g' },
      { label: 'Weight Variance', value: '0 g' },
      { label: 'Scanner ID', value: 'AHM-BELT-03' },
    ],
  },
  {
    id: 'jaipur',
    name: 'Jaipur Hub ⚠️',
    role: 'Inter-State Transit Facility',
    city: 'Jaipur, Rajasthan',
    timestamp: '13 Aug • 04:20',
    weight: '511 g (-131g drop)',
    expectedWeight: '642 g',
    status: 'anomaly',
    operatorId: 'OP-9901',
    sealStatus: 'Altered / Re-taped',
    cctvStatus: 'Under Review',
    x: 65,
    y: 70,
    description: 'CRITICAL ANOMALY: Weight dropped by 131g during inter-hub transfer. Outer packaging shows re-sealing signs.',
    telemetry: [
      { label: 'Previous Scan', value: '642 g' },
      { label: 'Jaipur Scan', value: '511 g', alert: true },
      { label: 'Weight Drop', value: '-131 g', alert: true },
      { label: 'Hub Anomaly Rate', value: '2.8% (High)', alert: true },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi Last-Mile',
    role: 'Destination Delivery Station',
    city: 'Delhi NCR',
    timestamp: '14 Aug • 12:41',
    weight: '511 g',
    expectedWeight: '642 g',
    status: 'delivery',
    operatorId: 'RIDER-IMRAN',
    sealStatus: 'Delivered Sealed',
    cctvStatus: 'OTP Verified 8742',
    x: 88,
    y: 45,
    description: 'Delivery partner Imran completed doorstep delivery. Customer Ananya received package and reported wrong item.',
    telemetry: [
      { label: 'Delivery Time', value: '12:41 PM' },
      { label: 'OTP Verification', value: '8742 Verified' },
      { label: 'Delivered Weight', value: '511 g' },
      { label: 'Claim Filed', value: 'Wrong Product', alert: true },
    ],
  },
];

export default function InteractiveLanding() {
  const [trackProgress, setTrackProgress] = useState(0.12); // 0 to 1
  const [selectedHub, setSelectedHub] = useState<HubDetail>(HUBS_DATA[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mouse Movement tracking over map canvas!
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const progress = Math.min(1, Math.max(0, mouseX / rect.width));
    setTrackProgress(progress);

    // Auto select nearest hub based on mouse position
    if (progress < 0.25) setSelectedHub(HUBS_DATA[0]);
    else if (progress < 0.50) setSelectedHub(HUBS_DATA[1]);
    else if (progress < 0.75) setSelectedHub(HUBS_DATA[2]);
    else setSelectedHub(HUBS_DATA[3]);
  };

  // Compute Scooter Position
  const scooterX = Math.min(90, Math.max(10, 10 + trackProgress * 80));
  const scooterY = 50 + Math.sin(trackProgress * Math.PI * 2) * 16;

  return (
    <div style={{ background: '#F7F6F2', color: '#181817', overflowX: 'hidden', minHeight: '100vh' }}>
      {/* Top Header Pill Navbar */}
      <header
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '920px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(24, 24, 23, 0.12)',
          borderRadius: '9999px',
          padding: '8px 16px 8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(24, 24, 23, 0.08)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: '#7657F6',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(118, 87, 246, 0.3)',
            }}
          >
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.025em', color: '#181817' }}>
              ResolveAI
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                color: '#7657F6',
                background: '#EEE9FF',
                padding: '2px 8px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
              }}
            >
              Prototype
            </span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Link
            href="/control-tower"
            className="btn"
            style={{
              background: 'transparent',
              color: '#6D6964',
              border: '1px solid rgba(24,24,23,0.12)',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Control Tower
          </Link>
          <Link
            href="/cases/MR-39281"
            className="btn"
            style={{
              background: '#7657F6',
              color: 'white',
              borderRadius: '9999px',
              padding: '6px 18px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(118,87,246,0.3)',
            }}
          >
            Start Investigation <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '130px 24px 30px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FCE9F1',
            color: '#D83A73',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} /> Autonomous Marketplace Operations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            margin: '0 auto 20px',
          }}
        >
          What happened to <span style={{ color: '#D83A73', fontStyle: 'italic' }}>this package</span>?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.125rem', color: '#6D6964', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}
        >
          One order. Three stories. Five AI agents. Reconstructing the ground truth behind e-commerce disputes.
        </motion.p>

        {/* Visual 3-Party Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '780px',
            background: 'white',
            border: '1px solid rgba(24, 24, 23, 0.12)',
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(24, 24, 23, 0.08)',
            padding: '24px',
            margin: '0 auto 24px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.2fr auto 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '12px', background: '#F7F6F2', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>📦</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Rakesh (Seller)</div>
              <div style={{ fontSize: '0.75rem', color: '#20A176', fontWeight: 600 }}>Surat • 642g Sealed</div>
            </div>

            <div style={{ color: '#7657F6', fontWeight: 'bold', fontSize: '1.25rem' }}>➔</div>

            <div style={{ textAlign: 'center', padding: '12px', background: '#FEF4E5', border: '1px solid #F2A63B', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🛵</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#D4861C' }}>Imran (Transit Rider)</div>
              <div style={{ fontSize: '0.75rem', color: '#D94B52', fontWeight: 700 }}>Jaipur Hub (-131g)</div>
            </div>

            <div style={{ color: '#7657F6', fontWeight: 'bold', fontSize: '1.25rem' }}>➔</div>

            <div style={{ textAlign: 'center', padding: '12px', background: '#F7F6F2', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🛍️</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Ananya (Customer)</div>
              <div style={{ fontSize: '0.75rem', color: '#D94B52', fontWeight: 600 }}>Delhi • Claim ₹1,299</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE MOUSE-TRACKING LOGISTICS MAP & DRAWER SECTION */}
      <section style={{ padding: '20px 24px 80px', maxWidth: '1150px', margin: '0 auto' }}>
        <div
          style={{
            background: 'white',
            borderRadius: '28px',
            border: '1px solid rgba(24, 24, 23, 0.12)',
            boxShadow: '0 16px 48px rgba(24, 24, 23, 0.10)',
            padding: '32px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4D78FF', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MousePointer size={14} /> Interactive Mouse-Drive & Live Inspector
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#181817', margin: '4px 0 0' }}>
                Move mouse over map to drive scooter & inspect hubs
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setTrackProgress(0.12)}
                className="btn btn-sm"
                style={{ background: '#F7F6F2', border: '1px solid rgba(24,24,23,0.15)', borderRadius: '9999px', fontSize: '0.75rem' }}
              >
                <RotateCcw size={12} /> Reset to Surat
              </button>
              <button
                onClick={() => setTrackProgress(0.65)}
                className="btn btn-sm"
                style={{ background: '#FCE9EA', color: '#D94B52', border: '1px solid #D94B52', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}
              >
                ⚠️ Jump to Jaipur Anomaly
              </button>
            </div>
          </div>

          {/* Map + Right-Side Inspection Drawer Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
            {/* Left: Mouse-Tracking Animated Vector Map Canvas */}
            <div
              ref={mapRef}
              onMouseMove={handleMouseMove}
              style={{
                position: 'relative',
                height: '380px',
                background: 'linear-gradient(135deg, #181817 0%, #1e1b2e 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                padding: '24px',
                cursor: 'crosshair',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Mouse hover instruction badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 25,
                }}
              >
                <MousePointer size={13} /> Hover mouse across map to steer scooter 🛵
              </div>

              {/* Background Grid Pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.8,
                }}
              />

              {/* Vector Dotted Connection Curve */}
              <svg width="100%" height="100%" viewBox="0 0 1000 320" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                <path
                  d="M 120 160 Q 380 70, 650 220 T 880 140"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                />
                <path
                  d="M 120 160 Q 380 70, 650 220 T 880 140"
                  fill="none"
                  stroke="#7657F6"
                  strokeWidth="5"
                  strokeDasharray="1000"
                  strokeDashoffset={1000 - trackProgress * 1000}
                />
              </svg>

              {/* Scooter Rider Animation Icon */}
              <div
                style={{
                  position: 'absolute',
                  left: `${scooterX}%`,
                  top: `${scooterY}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  transition: 'all 0.08s ease-out',
                }}
              >
                <div
                  style={{
                    background: '#7657F6',
                    color: 'white',
                    borderRadius: '9999px',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 24px rgba(118,87,246,0.9)',
                    border: '2px solid white',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🛵</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{selectedHub.weight}</span>
                </div>
              </div>

              {/* Interactive Hub Map Nodes */}
              {HUBS_DATA.map(hub => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub)}
                    style={{
                      position: 'absolute',
                      left: `${hub.x}%`,
                      top: `${hub.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 15,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {hub.status === 'anomaly' && (
                      <div
                        style={{
                          position: 'absolute',
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          background: '#D94B52',
                          opacity: 0.4,
                          animation: 'pulse-ring 1.8s infinite',
                        }}
                      />
                    )}

                    <div
                      style={{
                        width: isSelected ? '44px' : '34px',
                        height: isSelected ? '44px' : '34px',
                        borderRadius: '50%',
                        background: hub.status === 'anomaly' ? '#D94B52' : hub.status === 'dispatch' ? '#20A176' : '#FFFFFF',
                        border: `3px solid ${isSelected ? '#7657F6' : hub.status === 'anomaly' ? '#D94B52' : '#FFFFFF'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: hub.status === 'anomaly' || hub.status === 'dispatch' ? 'white' : '#181817',
                        boxShadow: isSelected ? '0 0 20px #7657F6' : '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {hub.status === 'dispatch' ? <Building2 size={18} /> : hub.status === 'anomaly' ? <AlertTriangle size={20} /> : hub.status === 'delivery' ? <UserCheck size={18} /> : <Truck size={16} />}
                    </div>

                    <span
                      style={{
                        marginTop: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.8)',
                        background: isSelected ? '#7657F6' : 'rgba(0,0,0,0.6)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {hub.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Live Interactive Telemetry Inspection Drawer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: selectedHub.status === 'anomaly' ? '#FEF4E5' : '#F7F6F2',
                  border: `1px solid ${selectedHub.status === 'anomaly' ? '#F2A63B' : 'rgba(24, 24, 23, 0.12)'}`,
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        background: selectedHub.status === 'anomaly' ? '#FCE9EA' : selectedHub.status === 'dispatch' ? '#E6F7F2' : '#EEE9FF',
                        color: selectedHub.status === 'anomaly' ? '#D94B52' : selectedHub.status === 'dispatch' ? '#178564' : '#5E43D4',
                      }}
                    >
                      {selectedHub.role}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9E9990', fontWeight: 600 }}>{selectedHub.timestamp}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#181817', marginBottom: '4px' }}>
                    {selectedHub.name}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: '#6D6964', marginBottom: '16px' }}>
                    Location: {selectedHub.city} • Operator: {selectedHub.operatorId}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#181817', lineHeight: 1.5, marginBottom: '20px' }}>
                    {selectedHub.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {selectedHub.telemetry.map(t => (
                      <div
                        key={t.label}
                        style={{
                          padding: '10px',
                          background: t.alert ? '#FCE9EA' : 'white',
                          border: `1px solid ${t.alert ? '#D94B52' : 'rgba(24,24,23,0.08)'}`,
                          borderRadius: '10px',
                        }}
                      >
                        <div style={{ fontSize: '0.6875rem', color: t.alert ? '#B53940' : '#6D6964' }}>{t.label}</div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: t.alert ? '#D94B52' : '#181817', marginTop: '2px' }}>
                          {t.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid rgba(24,24,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6D6964' }}>
                    Tamper Tape: <strong>{selectedHub.sealStatus}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7657F6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Camera size={12} /> {selectedHub.cctvStatus}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FINAL RESOLUTION CTA */}
      <section style={{ padding: '80px 24px 100px', background: 'white', borderTop: '1px solid rgba(24,24,23,0.1)', textAlign: 'center' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#E6F7F2',
              color: '#178564',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={16} /> Case MR-39281 Resolution Delivered
          </div>

          <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, marginBottom: '16px' }}>
            94% Confidence Resolution
          </h2>

          <p style={{ fontSize: '1.0625rem', color: '#6D6964', marginBottom: '36px', lineHeight: 1.6 }}>
            Customer Ananya refunded (₹1,299) • Seller Rakesh payout protected • Jaipur Hub segment flagged for investigation.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/cases/MR-39281"
              className="btn"
              style={{
                background: '#7657F6',
                color: 'white',
                borderRadius: '9999px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(118,87,246,0.35)',
              }}
            >
              Inspect Case MR-39281 <ArrowRight size={16} />
            </Link>
            <Link
              href="/control-tower"
              className="btn"
              style={{
                background: 'transparent',
                color: '#181817',
                border: '1px solid rgba(24,24,23,0.2)',
                borderRadius: '9999px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Open Operational Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', fontSize: '0.8125rem', color: '#9E9990', borderTop: '1px solid rgba(24,24,23,0.1)' }}>
        ResolveAI — Independent concept prototype built with synthetic marketplace data. Not affiliated with Meesho.
      </footer>
    </div>
  );
}
