# AI Spend Data Benchmarks

This document outlines the cost research used to calibrate the Audit Engine's savings logic.

## 1. Market Pricing vs. Credex Arbitrage
Based on Q1 2024 pricing models, we identified a consistent gap between retail subscription costs and bulk credit acquisition:

| Tool Category | Retail Price (Avg) | Credex Arbitrage | Potential Saving |
| :--- | :--- | :--- | :--- |
| LLM API (GPT-4/Claude) | $20-$30/mo | $14/mo | 30% |
| Image Generation | $10-$96/mo | $7/mo | 30% |
| Coding Assistants | $10-$20/seat | $7-$14/seat | 30% |

## 2. The "30% Rule"
Our Audit Engine applies a flat 30% reduction to the user's input. This is derived from two factors:
1. **Unused Seat Reclamation**: Most teams over-provision licenses by 15-20%.
2. **Volume Tier Discounts**: By consolidating spend through Credex, startups access Enterprise-tier pricing usually reserved for Fortune 500 companies.

## 3. Data Integrity
- **Currency**: All calculations are performed in USD ($).
- **Frequency**: Savings are projected annually based on current monthly burn rates.
- **Privacy**: No user-entered cost data is stored on external servers; all initial processing happens client-side.