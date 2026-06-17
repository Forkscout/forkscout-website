# Forkscout Portal Website (Next.js Application)

This sub-directory contains the frontend codebase for the **Forkscout Brand Portal and sub-product simulators**, designed using a premium Swiss editorial style inspired by `codegotech.com`.

---

## Project Information

### Purpose
To serve as a high-fidelity, interactive, and visually stunning organization portal for the Forkscout brand, displaying its products (Forkpay, Forksea, Forkweb3, Forkagent) in a cohesive design system.

### Goals
- Present the brand's layout with bold editorial typography, heavy borders, marquee tickers, and light/dark theme toggles.
- Provide fully interactive and functional mockups for each sub-product so visitors can test the capabilities in real-time.
- Ensure high performance, accessibility (WCAG compliant contrast, alt tags, and keyboard focus), and responsive mobile designs.

### Scope
- **Forkscout Homepage**: Hero sections, Gantt timelines, comparison charts, and FAQs.
- **P.01 Forkpay**: Neo-bank debit card customizer (names, colors, networks) and stablecoin deposit panel.
- **P.02 Forksea**: NFT minting simulator (with generative artwork previews) and live bidding tracker.
- **P.03 Forkweb3**: DEX trading bots configuration panel and ticking trade logs terminal.
- **P.04 Forkagent**: AI Agent conversation terminal with detailed cognitive trace logs and execution metrics.

---

## Architecture

### System Design
The application is structured using Next.js App Router. Each product folder under `src/app/` contains its page layout and components, keeping the codebase modular and cleanly separated.

### Tech Stack
- **Framework**: Next.js v16 (React 19)
- **Runtime**: Bun
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: CSS Marquees & Custom Transitions
- **Theme**: Client-side context ThemeProvider (persisting selections in LocalStorage and dynamically toggling the `.dark` class).

### Data Flow
1. **User Action**: The user edits inputs (e.g., cardholder name, bid value, or bot strategy parameters).
2. **State Transition**: Local states capture updates, trigger progress bars/spinners, and simulate blockchain or AI reasoning latency.
3. **Trace Append**: Success actions append transactions to scrolling log ledgers (trade feeds, contract events, or agent memory logs).

---

## Setup & Installation

### Prerequisite
Ensure you have **Bun** (v1.3+) or Node.js (v20+) installed on your machine.

### Installation
From the `forkscout-website/` directory, install packages:
```bash
bun install
```

### Run Local Dev Server
Start the development server:
```bash
bun run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the portal.

### Build Production Bundle
Build the app:
```bash
bun run build
```

---

## Progress Tracking

- **Completed**:
  - [x] Initialized Next.js project core folders via non-interactive create-next-app.
  - [x] Set up Google Fonts (`Inter Tight` / `JetBrains Mono` / `Inter`) and global CSS variables for dark/light themes in `globals.css`.
  - [x] Implemented client-side Theme Context provider for theme persistence.
  - [x] Created common layout components (`Nav.tsx`, `Ticker.tsx`, `Footer.tsx`).
  - [x] Designed homepage in Swiss editorial style (`page.tsx`) with timelines and FAQ accordions.
  - [x] Built **Forkpay** route and Debit Card Customizer + Stablecoin Payment Simulator.
  - [x] Built **Forksea** route and NFT Minting Studio + Auction Bidding Simulator.
  - [x] Built **Forkweb3** route and Algorithmic Bot Deployer + DEX Trading log stream.
  - [x] Built **Forkagent** route and AI Agent Prompt Console + Background trace logger.
- **In Progress**:
  - [ ] Running and testing dev servers to verify compilation.
- **Planned**:
  - [ ] Deploying to static servers.

---

## Decision Log

- **CSS Variables for Theme Strategy**: Instead of Tailwind's class utility variables, we defined custom properties directly inside `.dark` and `:root` inside `globals.css`. This is clean, matches standard CSS, and automatically propagates when class toggling occurs.
- **Next.js App Router Structure**: Sub-products are placed directly in route directories (`src/app/forkpay`, `src/app/forksea`, etc.). This isolates all components and sub-assets in their respective folder structure so they can be extracted as separate sub-repos with zero code refactoring.
