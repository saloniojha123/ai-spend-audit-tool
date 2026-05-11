# AI Collaboration & Engineering Process (Claude/Gemini)

This document outlines the strategic partnership between the human lead and AI assistants used to develop the Credex Audit Engine.

## 1. Development Methodology
I utilized AI as a **Pair Programmer** and **Business Strategist**. Rather than requesting a single "finished app," I broke the project into 7 modular days:
- **Phase 1**: Environment Setup & State Persistence.
- **Phase 2**: Financial Logic Engine (30% Arbitrage Rule).
- **Phase 3**: UI/UX Refinement & Accessibility Audits.
- **Phase 4**: Conversion Funnel & Lead Capture.

## 2. Strategic Prompt Engineering
To ensure the code met production standards, I guided the AI with specific constraints:
- **Type Safety**: Enforced TypeScript throughout the component tree.
- **Component Lifecycle**: Directed the fix for Next.js hydration errors by wrapping `localStorage` in `useEffect`.
- **Accessibility**: Corrected contrast ratios for input fields to ensure high-visibility solid black text.

## 3. Crisis Management
During Day 2, a Git upstream conflict (`fetch first`) occurred. I worked with the AI to resolve this via `rebase` and manual merging, ensuring the repository's integrity remained intact without losing documentation progress.

## 4. Business Logic Guardrails
I provided the business context of **Credex's Credit Arbitrage model** to ensure the AI generated relevant "Founder-focused" documentation (GTM.md, ECONOMICS.md) rather than generic tech stubs.

---
*This project serves as a case study in high-velocity development using human-led AI collaboration.*