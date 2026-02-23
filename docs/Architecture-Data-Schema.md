# 🏗️ Architectural Detail: Interaction Logging & Analytics Schema (US1.5)
> **Financial Tracker** · **Role:** Winston (Architect) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Technical Specification Ready · **Context:** Behavioral Data for Sales Intelligence

---

## 🎯 Purpose & Strategy

To enable "Data-Driven Sales," the application must record how users manipulate the financial models. This allows advisors to identify specific pain points (e.g., a user repeatedly checking high inflation or early retirement) and tailor their consultation calls.

> **Execution Strategy:** We use **IndexedDB** for local storage due to its structured nature and high capacity for temporal data (logs). We capture a **Full State Snapshot** every time an interaction finishes, providing the advisor with the complete context of what the user was seeing. Syncing happens silently in the background whenever a lead session is active.

---

## 🗄️ Data Schema (IndexedDB)

The database `FinancialTrackerDB` will contain an Object Store named `interaction_logs`.

### `InteractionLog` Interface (The Snapshot)
```typescript
interface InteractionLog {
  /** RFC4122 UUID for the log entry */
  id: string;
  
  /** ISO-8601 timestamp of the event */
  timestamp: string;
  
  /** The specific input that triggered the change (e.g., 'inflation_slider') */
  triggerSource: string;

  /** 
   * FULL STATE SNAPSHOT 
   * Captain's log of all relevant calculator signals at the moment of change.
   */
  stateSnapshot: {
    initialCapital: number;
    monthlyContribution: number;
    expectedReturn: number;
    inflationRate: number;
    currentAge: number;
    targetRetirementAge: number;
    currency: string;
  };

  /** System-level metadata */
  metadata: {
    sessionId: string;
    userAgent: string;
    screenResolution: string;
    syncStatus: 'pending' | 'synced';
  };
}
```

---

## ⚙️ Logic & Lifecycle

### 1. Trigger Mechanics (US1.5.1)
- **Frequency:** Logs are generated on `mouseup` (for sliders) or `blur` (for numeric inputs). 
- **Implementation:** The `home-page.ts` container listens for the completion of any signal update and invokes the `LoggingService.recordSnapshot(trigger)`.

### 2. Synchronization Strategy (US1.5.4)
- **Silent Background Sync:** 
  - If a `leadEmail` exists in LocalStorage (meaning the user is a known lead), the `SyncService` attempts to push pending logs to the backend (Supabase/API) every 60 seconds or on specific high-value transitions (e.g., clicking "Agendar").
  - If the user is anonymous, logs stay strictly in IndexedDB.
- **Payload Optimization:** Multi-log entries are bundled into a single JSON array to minimize HTTP overhead.

### 3. Lifecycle in Local Storage
- **Retention:** Logs are kept for a maximum of 30 days locally to prevent storage bloat.
- **Clean-up:** The `LoggingService` runs a cleanup routine on application bootstrap, deleting entries older than the `LOG_RETENTION_TTL`.

---

## 📡 Infrastructure Architecture (Winston's Blueprint)

```typescript
// src/app/infrastructure/repositories/indexed-db-interaction.repository.ts

@Injectable({ providedIn: 'root' })
export class InteractionRepository implements IInteractionRepository {
  private dbPromise = openDB('FinancialTrackerDB', 1, {
    upgrade(db) {
      db.createObjectStore('interaction_logs', { keyPath: 'id' });
    }
  });

  async saveLog(log: InteractionLog): Promise<void> {
    const db = await this.dbPromise;
    await db.put('interaction_logs', log);
  }

  async getPendingLogs(): Promise<InteractionLog[]> {
     // Queries IndexedDB for entries with syncStatus === 'pending'
  }
}
```

---

## ⚖️ Privacy & Compliance
- **Local-First:** Data is stored on the user's device.
- **Anonymity:** No Personal Identifiable Information (PII) is stored in the `interaction_logs` store itself; it is only linked to a `leadId` during the synchronization phase via the `metadata.sessionId`.
- **Transparency:** The Privacy Policy must state that calculator interactions are recorded to improve service quality and advisor consultations.

---

*— Winston, Architect · Financial Tracker · BMAD v4 · 2026-02-23*
