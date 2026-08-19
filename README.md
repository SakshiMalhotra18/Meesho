# 🛍️ ResolveAI — Autonomous Marketplace Dispute Intelligence

> **ResolveAI turns complex e-commerce disputes into evidence-backed, multi-party stories — automatically investigated, explained, and resolved by specialized AI agents.**
> Designed with **Meesho's brand identity** (Jamuni & Aam palette) and built for scale across high-volume marketplace networks.

🔗 **Live Production Demo**: [https://resolveai-ops.vercel.app/]
💻 **GitHub Repository**: [https://github.com/SakshiMalhotra18/Meesho](https://github.com/SakshiMalhotra18/Meesho)

---

## 📌 Executive Summary & The Core Problem

In multi-billion dollar Indian e-commerce platforms, **dispute resolution is broken**:
1. **Buyers** report receiving wrong/damaged items and demand immediate refunds.
2. **Sellers** claim they dispatched pristine goods and lose money on fraudulent returns.
3. **Logistics Networks** process millions of parcels across sortation hubs where transit tampering or weight drops occur unnoticed.

**ResolveAI** solves this by reconstructing ground truth from parcel scale telemetry, dispatch CCTV/photos, buyer/seller risk profiles, and deterministic policy rules — replacing slow manual ticketing with an autonomous 5-agent AI swarm.

---

## 🎨 Meesho Brand Design System

ResolveAI is styled using Meesho's refreshed brand identity:
- **Jamuni (plum/berry gradient `#4A0D36 → #9F2B68`)**: Dominant canvas background & navigation highlights.
- **Aam (mango orange `#FF9900`)**: Accent highlight color for high-confidence metrics, active buttons & CTA buttons.
- **Glassmorphism & Light Contrast**: Frosted glass cards on gradient canvases + warm blush (`#F9F6FA`) light content containers.

---

## 📦 Featured Case Study: MR-39281 (The Jaipur Anomaly)

The flagship demo traces **Case MR-39281**:
- 📦 **Rakesh Patel (Seller in Surat)** packs a Women's Embroidered Kurta (*642g, Sealed, CCTV verified*).
- 🛵 **Imran (Transit Rider)** transports the package through Gujarat to Rajasthan.
- ⚠️ **Jaipur Sortation Hub**: Inter-hub scale scan records a **131g weight drop** (*642g ➔ 511g*) and re-taping.
- 🛍️ **Ananya Sharma (Buyer in Delhi)** opens the package and receives a plain white dupatta, filing a "Wrong Product" claim for ₹1,299.

### 🤖 How the Multi-Agent Swarm Resolves It
1. **Mira (Supervisor)** coordinates the parallel agent execution.
2. **Tara (Evidence Agent)** verifies dispatch photo vs return photo → 96% pattern mismatch.
3. **Raahi (Logistics Telemetry Agent)** pinpoints the exact 131g weight drop at Jaipur Hub.
4. **Kavach (Risk Agent)** scores Buyer (12% low risk) and Seller (8% low risk) → flags Jaipur Hub (84% risk).
5. **Niti (Deterministic Policy Engine)** matches Policy **P-014** (*Wrong Product — Logistics Responsible*).
6. **Samadhan (Resolution Synthesizer)** proposes:
   - ✅ **Refund Buyer Ananya** (₹1,299)
   - ✅ **Protect Seller Rakesh** (Payout guaranteed)
   - 🚩 **Flag Jaipur Hub Segment** for operational audit

---

## 🤖 Multi-Agent Orchestration Architecture

```
                               ┌─────────────┐
                               │    Mira     │
                               │ Supervisor  │
                               └──────┬──────┘
                                      │
         ┌──────────────────┬─────────┴─────────┬──────────────────┐
         ▼                  ▼                   ▼                  ▼
   ┌───────────┐      ┌───────────┐       ┌───────────┐      ┌───────────┐
   │   Tara    │      │   Raahi   │       │  Kavach   │      │   Niti    │
   │ Evidence  │      │ Logistics │       │   Risk    │      │ Policy    │
   └─────┬─────┘      └─────┬─────┘       └─────┬─────┘      └─────┬─────┘
         │                  │                   │                  │
         └──────────────────┴─────────┬─────────┴──────────────────┘
                                      ▼
                               ┌─────────────┐
                               │  Samadhan   │
                               │ Resolution  │
                               └─────────────┘
```

| Agent | Icon | Role & Responsibility |
|-------|------|-----------------------|
| **Mira** | 👑 | **Supervisor & Orchestrator**: Manages sub-agent runs and triggers human escalation. |
| **Tara** | 🔍 | **Product & Evidence Specialist**: Computer vision heuristics on dispatch vs return photos. |
| **Raahi** | 🚚 | **Logistics Telemetry Analyst**: Analyzes parcel scale weights across transit hubs. |
| **Kavach** | 🛡️ | **Fraud & Risk Evaluator**: Computes historical return rates, buyer/seller risk scores. |
| **Niti** | 📜 | **Deterministic Policy Engine**: Evaluates strict business rules (P-001 to P-014) with zero hallucination. |
| **Samadhan** | ⚖️ | **Final Resolution Synthesizer**: Formulates payout, refund, and hub action with confidence score. |

---

## 🚥 Tiered Autonomy Framework

- 🟢 **Green Tier (Auto-Resolve)**: High confidence (>90%) + low financial exposure → Instant automated payout/refund.
- 🟡 **Amber Tier (Human Approval)**: High confidence (>85%) + medium exposure → Proposed resolution sent to analyst dashboard for 1-click approval.
- 🔴 **Red Tier (Human Escalation)**: High-risk customer/seller fraud signal or high value (>₹5,000) → Mandatory human investigation.

---

## 🗺️ Application Structure

| Route | Page | Key Features |
|-------|------|--------------|
| `/` | **Cinematic Landing** | Mouse-driven interactive scooter map, real India coordinates, 3-party story card & live telemetry ticker. |
| `/control-tower` | **Control Tower** | Real-time queue, metric trend sparkbars, online agent indicators, and live activity stream. |
| `/cases` | **Dispute Case Queue** | Clean filterable dispute table with tier badges (Green, Amber, Red) and risk indicators. |
| `/cases/[caseId]` | **Investigation Workspace** | Jamuni-gradient header, 3D stage inspector, weight variance meter, interactive evidence zoom board. |
| `/agents` | **Agent Control Room** | Jamuni-Aam ambient gradient mesh, interactive waving 👋 agent cards, popover tool inspect, DAG execution replay. |
| `/network` | **Logistics Network** | Interactive SVG network topology with hub anomaly rings and live node telemetry. |
| `/insights` | **Insights & AI Metrics** | Resolution speed vs manual baseline, prevented fraud statistics, and policy hit distribution. |

---

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5.0 (Strict mode)
- **Styling**: Tailwind CSS v4 + Inline CSS Variables (Meesho Jamuni & Aam Tokens)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Deployment**: Vercel (Auto-CI/CD from `main`)

---

## 🛠️ Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/SakshiMalhotra18/Meesho.git
cd Meesho

# 2. Add Node v22.16 to PATH (Windows PowerShell)
$env:PATH = "C:\Users\saksh\AppData\Local\nodejs\node-v22.16.0-win-x64;" + $env:PATH

# 3. Install dependencies
npm install

# 4. Run TypeScript check
npm run type-check

# 5. Build production bundle
npm run build

# 6. Start local server
npm start
```

---

## ⚠️ Disclaimer

*ResolveAI is an independent concept prototype built using synthetic marketplace data for demonstration purposes. It is not officially affiliated with Meesho.*
