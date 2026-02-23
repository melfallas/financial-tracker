# US6.1: Wishlist Board (Organism)

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P2 (Medium)

## Description
**As a user,** I want to create a gamified "Wishlist" of financial dreams (House, Travel, Car) and see the immediate monthly effort required to achieve each goal.

## Acceptance Criteria
- [ ] Implement the **Wishlist Board** grid (§Organisms-Wishlist-Board):
    - Premium white cards with `shadow-premium`.
    - Emoji icons for each goal.
    - Title, Goal Amount ($), and Timeframe (Years).
    - **Monthly Effort Badge:** Large Emerald Green highlight showing `Goal / (Years * 12)`.
- [ ] **Interaction Physics:**
    - "Add New Dream" card triggers an inline form/modal.
    - Confetti burst when a new wish is added.
    - Hover lift effect (4px) on cards.
- [ ] **Persistence:** Save wishes to `IInteractionRepository` (IndexedDB) for session retention.
- [ ] **Empty State:** Provide 3 inspiring "Example Dreams" for first-time users.
- [ ] Storybook stories for `WishCard` components.

## Technical Details

### Component Location
`src/app/features/wishlist-board/`.

### Business Logic
- `Monthly_Effort = amount / (years * 12)`.
- (Simple calculation: Ignored interest/inflation to keep the "Sandbox" fast and simple).

### Steps to Complete:
1. Create the grid layout with Tailwind.
2. Implement the `WishCard` atom as a standalone component.
3. Build the "Add Wish" inline form using Reactive Forms.
4. Hook into IndexedDB for CRUD operations.
5. Integrate `canvas-confetti` (reusable from US3.2).

## Non-Functional Requirements
- **Engagement:** This section should be "light" and "fun" to contrast with the serious math above it.
- **Dopamine:** The monthly effort number should be formatted to look achievable (e.g., "$138.80 / mo" instead of "$1,665 / yr").
