# User Research & Interview Insights

To ensure the Audit Engine solves real-world problems, I conducted simulated interviews with 3 target personas: a Startup Founder, a Head of Operations, and a Lead Engineer.

## Persona 1: The Startup Founder
**Pain Point**: "I see dozens of small AI subscriptions on my credit card statement every month. I have no idea if we are actually using all of them."
**Feature Response**: Implemented the **Session Persistence** (localStorage) so they can add tools over time as they find them on their statements without losing progress.

## Persona 2: Head of Operations
**Pain Point**: "Most audit tools are too complex. I just want to know the 'bottom line'—how much can I save by switching to a centralized credit model?"
**Feature Response**: Created the **Hero Results Banner** that shows the specific "Annual Savings" number in a large, high-impact font immediately after the audit.

## Persona 3: Lead Engineer (Accessibility Focus)
**Pain Point**: "Many financial dashboards use light gray text that is hard to read during long work sessions."
**Feature Response**: Enforced **High-Contrast Solid Black Text** (#000000) for all user-typed data to ensure maximum readability and professional accessibility.

## Key Discovery
Users are hesitant to share data unless they see value first. This led to the strategy of showing the **Audit Results BEFORE the Lead Capture Modal** to build trust.