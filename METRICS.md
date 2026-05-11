# Product Success Metrics (KPIs)

To evaluate the performance of the AI Spend Audit Engine, we track the following:

1. **Conversion Rate (CR)**: 
   - *Goal*: 15% 
   - *Logic*: (Leads Captured / Audits Completed). Measures the effectiveness of the "Claim Savings" CTA.

2. **Average Savings Identified**: 
   - *Goal*: >$1,200/year 
   - *Logic*: Average of the `annualSavings` calculation across all users.

3. **User Retention**: 
   - *Logic*: Tracked via session persistence (`localStorage`). Measures if users return to add more tools to their audit.

4. **Time to Value (TTV)**: 
   - *Goal*: < 60 seconds
   - *Logic*: The time from landing on the page to seeing the "Annual Savings" result.