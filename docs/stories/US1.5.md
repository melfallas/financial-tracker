# US1.5: Repository Pattern & Local Persistence

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want an abstracted persistence layer using the Repository Pattern to support a "Local-First" MVP that can migrate to Supabase.

## Acceptance Criteria
- [ ] `ILeadRepository` interface defined in `core/interfaces/i-lead-repository.ts`.
- [ ] `IInteractionRepository` interface defined in `core/interfaces/i-interaction-repository.ts`.
- [ ] `LocalLeadRepository` implemented using **LocalStorage** (Small volume).
- [ ] `LocalInteractionRepository` implemented using **IndexedDB** (High volume logs).
- [ ] Repository providers configured in `app.config.ts` using DI.
- [ ] **TDD Mandatory:** Unit tests for both local repositories.

## Technical Details

### Repository Selection Logic (§7.2 Architecture):
- **Leads:** LocalStorage (simple CRUD, few records).
- **Interactions:** IndexedDB (non-blocking, high-volume event logs for aggregation).
- **User Preferences:** LocalStorage (synchronous hydration).

### Data Models (`src/app/shared/types/index.ts`):
```typescript
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  source: 'landing-page' | 'booking';
  engagementStats?: any;
}

export interface InteractionLog {
  id: string;
  session_id: string;
  widget_id: string;
  interaction_type: string;
  value?: number;
  duration_ms: number;
  timestamp: string;
}
```

### Steps to Complete:
1. Define interfaces in `src/app/core/interfaces/`.
2. Implement `LocalLeadRepository` in `src/app/infrastructure/`.
3. Implement `LocalInteractionRepository` in `src/app/infrastructure/` (use `idb` or native wrapper).
4. Configure providers in `app.config.ts`.
5. Create tests in `infrastructure/` folder.

## Non-Functional Requirements
- **Efficiency:** IndexedDB writes must not block the UI thread.
- **Portability:** Ensure the repository interfaces are completely technology-agnostic.
