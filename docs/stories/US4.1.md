# US4.1: Hero Section & Navbar (Organism)

**Epic:** Epic 4 (Market Intelligence & Awareness Widgets)
**Priority:** P0 (MVP)

## Description
**As a visitor,** I want a premium, fast-loading Hero section that immediately communicates the value proposition and allows me to start my financial diagnosis with a single click.

## Acceptance Criteria
- [ ] Implement a **Headroom Navbar** (§Organisms-Hero-And-Navbar):
    - Transitions: Transparent at top -> Hide on scroll down -> White bg/Sticky on scroll up.
    - Includes Logo, Language switcher (ES/EN), Currency switcher (CRC/USD), and "Schedule" Ghost Button.
- [ ] Implement a **Clean & Split Hero Area**:
    - Right-column/Top-mobile: Premium growth-themed graphic.
    - Left-column/Bottom-mobile: H1 Headline with Emerald Green highlight ("Libertad Financiera").
- [ ] **Interaction Physics:**
    - **Fade-In-Up Entry:** 600ms CSS transform on page load (Optimized for LCP).
    - **Smooth Scroll CTA:** Massive Emerald Green button (#00C853) that scrolls to the Wealth Gap section.
- [ ] **Accessibility:** Pass initial WCAG AA check on text contrast and keyboard navigation.

## Technical Details

### Component Location
`src/app/features/hero/hero.ts` and `src/app/features/navbar/navbar.ts`.

### Headroom Logic
Use `HostListener('window:scroll')` with a `lastScrollTop` signal to detect scroll direction and set `isNavbarVisible` / `isNavbarSticky`.

### Steps to Complete:
1. Create both components as standalone.
2. Setup the "Clean & Split" Tailwind grid (50/50 desktop, stacked mobile).
3. Apply the `animate-hero` CSS class to the main wrapper.
4. Implement the Headroom logic in the Navbar component.
5. Create the smooth scroll utility function.
6. Verify mobile responsiveness.

## Non-Functional Requirements
- **Authority:** Typography must use `Inter` at high weights to project institutional trust.
- **LCP:** Ensure the Hero graphic is optimized and the fade-in animation doesn't delay meaningful paint.
