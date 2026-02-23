# US1.5: Repository Pattern & Local Persistence

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want an abstracted persistence layer using the Repository Pattern.

## Acceptance Criteria
- [ ] `ILeadRepository` interface in `core/interfaces/` with `saveLead()` and `getLeads()`.
- [ ] `Lead` interface in `shared/types/` with:
    - `id`
    - `firstName`
    - `lastName`
    - `email`
    - `createdAt`
    - `source`
    - `engagement_stats`
- [ ] `LocalLeadRepository` implemented in `infrastructure/` using `IndexedDB`.
- [ ] Dependency Injection provider configured in `app.config.ts` for abstraction, ensuring an easy swap for `Supabase` later in development.
- [ ] **TDD Mandatory:** Tests for save and retrieve operations.

## Architecture Guidelines
`Architecture-Data-Schema.md` specifies IndexedDB for technical infrastructure, storing User Interactions (Lead state and wishlist engagement) via Full State Snapshots for local memory before remote synchronization.
