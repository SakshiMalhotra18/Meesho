# ResolveAI — Marketplace Dispute Intelligence

> **ResolveAI turns every marketplace dispute into an evidence-backed story that autonomous AI agents can investigate, explain, and resolve safely.**

![ResolveAI Banner](https://img.shields.io/badge/Status-Prototype-7657F6?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## 📌 Executive Summary

**ResolveAI** is an Agentic AI system designed to investigate and resolve e-commerce return, refund, fraud, and logistics disputes. It models a marketplace where disputes involve customers, sellers, logistics networks, shipment evidence, return evidence, policies, fraud signals, and human operations teams.

---

## 🗺️ Application Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | **Cinematic Landing** | Visual narrative following parcel journey, Jaipur weight anomaly, and AI resolution |
| `/control-tower` | **Control Tower** | Real-time dispute queue, live agent activity stream, and primary operational metrics |
| `/cases` | **Dispute Case Queue** | Searchable & filterable dispute queue with Green / Amber / Red autonomy tiers |
| `/cases/[caseId]` | **Investigation Workspace** | Interactive parcel inspector, weight timeline, evidence board, and resolution bar |
| `/agents` | **Agent Control Room** | Visual multi-agent orchestration graph with interactive replay mode |
| `/network` | **Logistics Network** | Synthetic SVG topology graph with hub anomaly inspection |
| `/insights` | **Insights & AI Metrics** | Automation rate, resolution time comparison, and prevented fraud metrics |

---

## 🤖 Agent Architecture

- **Mira** — *Supervisor Agent*: Coordinates investigation and human escalation triggers.
- **Tara** — *Evidence Agent*: Examines product imagery, dispatch evidence, and return item consistency.
- **Raahi** — *Logistics Agent*: Reconstructs parcel journey across hubs and flags weight variances.
- **Kavach** — *Risk Agent*: Evaluates customer, seller, and logistics risk history and fraud patterns.
- **Niti** — *Policy Agent*: Matches explicit marketplace policies without LLM hallucination.
- **Samadhan** — *Resolution Agent*: Assembles evidence and policy to produce confidence-scored resolution.

---

## 🚀 Local Setup & Running

```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript type check
npm run type-check

# 3. Run production build
npm run build

# 4. Start local production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚠️ Disclaimer

*ResolveAI is an independent concept prototype built using synthetic marketplace data and is not affiliated with Meesho.*
