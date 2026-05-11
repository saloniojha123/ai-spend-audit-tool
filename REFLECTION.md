# Project Reflection & Critical Analysis

## 1. Challenges Overcome
The most significant hurdle was the technical integration of client-side state with Next.js hydration. Initially, I encountered errors where the UI would mismatch with the `localStorage` data on reload. I resolved this by implementing a `typeof window` check and a `useEffect` safety wrapper, ensuring the app remains stable in a production SSR environment.

## 2. Technical Debt & Trade-offs
Due to the 7-day timeline, I prioritized **Core Funnel Logic** (Audit -> Results -> Lead Capture) over a backend database. 
- **The Trade-off**: I used `localStorage` for persistence instead of a managed database like Supabase or PostgreSQL.
- **The Future Fix**: In a real-world version, I would implement a server-side database to ensure user data is synchronized across different devices and browsers.

## 3. Pivot Points
Initially, the UI used lower contrast ratios for input fields. After a simulated "User Interview" phase, I realized the data entry experience was difficult for users in low-light environments. I pivoted the design system to **High-Contrast Solid Black (#000000)** for all user-typed data to maximize accessibility.

## 4. Key Learnings
This project taught me that "Done is better than Perfect," but "Professional is better than Done." Building a tool that actually captures value for a company (Credex) requires more than just code; it requires a deep understanding of the user's pain points and the company's business model.

## 5. What I'd Do With More Time
1. **API Integration**: Connect the Audit Engine to real SaaS billing APIs (like Stripe or Plaid) to automate data entry.
2. **Advanced Analytics**: Add a dashboard for Credex admins to see the "Total Potential Savings" across all captured leads.
3. **Unit Testing**: Implement Jest or Cypress tests for the math logic to ensure 100% accuracy as the arbitrage model evolves.