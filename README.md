# 🏗️ Trust Infra — Enterprise Construction Management & AI Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

> **Trust Infra** is an enterprise-grade construction management and AI collaboration platform that brings every stakeholder—from customers and architects to engineers, suppliers, site supervisors, and field workers—into a unified, real-time intelligent ecosystem.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Stakeholder Portals & RBAC](#-stakeholder-portals--rbac)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Role-Based Access Demo](#-role-based-access-demo)
- [Contributing & License](#-contributing--license)

---

## 🌟 Overview

Traditional construction projects suffer from fragmented communication, delayed material procurement, inaccurate cost forecasting, and opaque progress tracking.

**Trust Infra** eliminates these bottlenecks by offering:

- **Centralized Project Lifecycle**: Complete tracking from land survey and blueprint approval to handover.
- **AI-Driven Intelligence**: Instant BOQ (Bill of Quantities) estimation, material forecasting, and structural risk calculations.
- **Role-Based Workspaces**: Tailored user experiences designed specifically for 9 key industry roles.
- **Real-Time Collaboration**: Site activity feeds, team chat, geo-tagged attendance, and digital approval chains.

---

## 🚀 Key Features

### 🤖 AI Assistant & Construction Intelligence

- **Smart BOQ Generation**: Calculate quantities and estimates across earthwork, concrete, masonry, steel, plumbing, and electricals in seconds.
- **Timeline & Risk Prediction**: Detect project delays, weather risks, and budget deviations proactively.
- **Interactive Project Context Chat**: Ask contextual questions regarding site documents, drawings, and financial metrics.

### 📊 Real-Time Operations & Monitoring

- **Interactive Site Feed**: High-resolution photo updates, milestone progress logs, and collaborative comment threads.
- **Direct & Group Messaging**: Dedicated communication channels for project leads, contractors, and clients.
- **GPS-Tagged Attendance**: Field worker check-in/out logging with geo-coordinates and shift auditing.
- **Smart Team Builder**: Assemble verified contractors and specialized crews based on ratings and project requirements.

### 💰 Finance & Material Marketplace

- **Quotation Comparison Engine**: Post material requests and compare dealer bids with price-per-unit metrics.
- **Automated Milestone Billing**: Escrow-style payment release milestones tied to verified phase completions.
- **Downloadable Reporting**: One-click PDF/Excel export for daily site logs, weekly executive briefings, and financial audits.

---

## 👥 Stakeholder Portals & RBAC

Trust Infra features a granular Role-Based Access Control (RBAC) matrix serving 9 distinct construction personas:

| Role                  | Portal Route       | Primary Capabilities                                                       |
| :-------------------- | :----------------- | :------------------------------------------------------------------------- |
| **Admin**             | `/admin`           | System health, organization analytics, audit logs, user management         |
| **Architect**         | `/architect`       | Blueprint revisions, 2D/3D CAD model uploads, elevation approvals          |
| **Customer**          | `/customer`        | Progress monitoring, milestone payments, live site gallery, document vault |
| **Dealer / Supplier** | `/dealer`          | Material inventory showcase, quotation bids, logistics delivery tracking   |
| **Civil Engineer**    | `/engineer`        | Structural reviews, BOQ validation, technical checklists, quality control  |
| **Finance Team**      | `/finance`         | Cashflow analytics, vendor payouts, invoice verification, tax reports      |
| **Project Manager**   | `/project-manager` | Master Gantt schedules, resource allocation, critical path monitoring      |
| **Site Supervisor**   | `/supervisor`      | Daily labor logs, material dispatch inspections, on-site safety audits     |
| **Field Worker**      | `/worker`          | Daily task lists, attendance check-in, shift assignments, wage tracking    |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript 5.6](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion & Transitions**: [Framer Motion 11](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Visualizations**: [Recharts](https://recharts.org/)
- **Code Standards**: ESLint & Prettier with Tailwind class sorting

---

## 📁 Project Structure

```bash
trustinfra/
├── .vscode/               # VS Code debug configurations
├── src/
│   ├── app/               # Next.js App Router routes
│   │   ├── (auth)/        # Authentication group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verify-otp/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/   # Role-based dashboard sub-apps
│   │   │   ├── admin/
│   │   │   ├── architect/
│   │   │   ├── customer/
│   │   │   ├── dealer/
│   │   │   ├── engineer/
│   │   │   ├── finance/
│   │   │   ├── project-manager/
│   │   │   ├── supervisor/
│   │   │   └── worker/
│   │   ├── ai-assistant/  # AI Intelligence & BOQ tools
│   │   ├── chat/          # Real-time direct & team messaging
│   │   ├── feed/          # Site progress social feed
│   │   ├── notifications/ # Activity alerts & approvals
│   │   ├── reports/       # Report generator & analytics
│   │   ├── team-builder/  # Contractor & worker matchmaking
│   │   ├── globals.css    # Global CSS & Tailwind theme utilities
│   │   ├── layout.tsx     # Root HTML document & font setup
│   │   └── page.tsx       # Marketing landing page
│   ├── components/        # Reusable component library
│   │   └── layout/        # Shell layout, TopBar, and Sidebar
│   ├── lib/               # Utilities & business logic
│   │   ├── constants.ts   # System-wide static parameters & labels
│   │   ├── rbac.ts        # Role-based permissions matrix
│   │   └── utils.ts       # Utility helper functions
│   ├── stores/            # Zustand reactive state stores
│   └── types/             # Domain TypeScript declarations & schemas
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Code formatting standards
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS processor config
├── tailwind.config.ts     # Tailwind theme extensions & tokens
└── tsconfig.json          # TypeScript compiler configuration
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm** or **yarn** / **pnpm** / **bun**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samjerish/TrustInfra-website.git
   cd TrustInfra-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Script                 | Description                                                |
| :--------------------- | :--------------------------------------------------------- |
| `npm run dev`          | Starts local Next.js dev server on port 3000               |
| `npm run build`        | Compiles optimized production bundle                       |
| `npm run start`        | Boots the compiled Next.js production server               |
| `npm run lint`         | Runs Next.js ESLint verification                           |
| `npm run typecheck`    | Checks TypeScript types without emitting code              |
| `npm run format`       | Auto-formats code with Prettier and sorts Tailwind classes |
| `npm run format:check` | Validates formatting compliance without editing            |

---

## 🎭 Role-Based Access Demo

You can explore the different stakeholder views directly by navigating to their corresponding paths or logging in with the demo account:

- **Customer Dashboard**: `/customer`
- **Architect Workspace**: `/architect`
- **Engineer Portal**: `/engineer`
- **Dealer Management**: `/dealer`
- **Site Supervisor Log**: `/supervisor`
- **Field Worker View**: `/worker`
- **Project Manager Board**: `/project-manager`
- **Finance Ledger**: `/finance`
- **Admin Control Center**: `/admin`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
