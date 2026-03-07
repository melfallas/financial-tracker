# US-MVP1.7 — Wealth Gap Chart Fixes

> **Epic:** MVP1 — Bug Fixes
> **Sprint:** Sprint 4
> **Priority:** P1 (Fix — Medium)
> **Size:** L
> **Owner:** Angi (Dev) + Architecture guidance (Winston) for defaults service
> **Status:** 📂 TODO

---

## User Story

**As a** user,
**I want** the Wealth Gap Chart to be compact enough to fit a medium screen, have precisely-stepped sliders, load sensible defaults from a configurable service, always show a filled track on sliders, and render charts correctly,
**so that** the tool is usable, accurate, and visually polished.

---

## Background

Five distinct issues have been identified in the Wealth Gap Chart section that affect usability, visual consistency, and architectural extensibility.

---

## Acceptance Criteria

### Sub-Issue 1: Compact Vertical Layout

| #     | Criterion                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC1.1 | The complete Wealth Gap section (Diagnóstico, Erosión Total, Parámetros, Chart) is **fully visible on a 1024px-height viewport** without vertical scrolling. |
| AC1.2 | Reduce vertical padding, margin, and gap in section containers using Tailwind utilities first; component CSS for precise adjustments.                        |
| AC1.3 | Font sizes for labels and values may be reduced slightly (e.g., from `text-lg` to `text-base`) if needed for compactness.                                    |
| AC1.4 | Changes must not break layout at desktop-large (≥ 1280px) or mobile (< 768px).                                                                               |

### Sub-Issue 2: Slider Graduation (Step & Range)

Each slider must be re-configured to the following specs:

| Slider          | Min  | Max     | Step | Default |
| --------------- | ---- | ------- | ---- | ------- |
| Capital Inicial | $500 | $20,000 | $500 | $1,000  |
| Aporte Mensual  | $0   | $3,000  | $100 | $0      |
| Retorno Anual   | 1%   | 20%     | 1%   | 15%     |
| Inflación Anual | 1%   | 15%     | 1%   | 6%      |
| Años            | 5    | 40      | 1    | 20      |

- AC2.1 Steps apply to `[min]`, `[max]`, `[step]` attributes of PrimeNG `Slider` components.
- AC2.2 Default values come from the Simulator Config Service (Sub-Issue 3).

### Sub-Issue 3: Default Values via Configurable Service

**Interface (core/interfaces/simulator-config.interface.ts):**

```typescript
export interface WealthGapDefaults {
  capitalInicial: number;
  aportesMensuales: number;
  retornoAnual: number;
  inflacionAnual: number;
  anos: number;
}
export interface SimulatorDefaults {
  wealthGapChart: WealthGapDefaults;
  // extensible for other simulators
}
export interface ISimulatorConfigRepository {
  loadDefaults(): Observable<SimulatorDefaults>;
}
```

**JSON File (src/assets/config/simulator-defaults.json):**

```json
{
  "version": "1.0.0",
  "wealth_gap_chart": {
    "capital_inicial": 1000,
    "aportes_mensuales": 0,
    "retorno_anual": 15,
    "inflacion_anual": 6,
    "anos": 20
  },
  "retirement_simulator": {
    "edad_actual": null,
    "edad_retiro": 65,
    "ahorros_liquidos": null,
    "aporte_mensual": 0,
    "retorno_anual": 10,
    "inflacion_anual": 6
  },
  "cost_of_waiting": {
    "si_tienes": 1000,
    "plazo_anos": 10,
    "inflacion_anual": 6
  }
}
```

**Service (core/services/simulator-config.service.ts):**

- Phase 1: reads from `assets/config/simulator-defaults.json` via `HttpClient.get()`.
- Phase 2: reads from an API endpoint — only the service implementation changes; component code unchanged.
- Provided in `root`.

| AC3.x | Criteria                                                                                                                    |
| ----- | --------------------------------------------------------------------------------------------------------------------------- |
| AC3.1 | Interface `ISimulatorConfigRepository` defined and exported from `core/interfaces/`.                                        |
| AC3.2 | JSON file at `src/assets/config/simulator-defaults.json` with approved structure.                                           |
| AC3.3 | `SimulatorConfigService` in `core/services/` reads JSON via `HttpClient`, provides defaults as `Signal<SimulatorDefaults>`. |
| AC3.4 | Wealth Gap Chart consumes defaults from service on component init.                                                          |
| AC3.5 | Unit test verifying defaults are loaded and applied on component render.                                                    |

### Sub-Issue 4: Slider Track Fill (Left of Thumb — CSS)

| #     | Criterion                                                                                                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC4.1 | On **initial page load**, the left side of each slider thumb is filled with Emerald Green (`#00C853`).                                                                            |
| AC4.2 | Fill updates in real-time as user drags the slider thumb.                                                                                                                         |
| AC4.3 | Fill updates when the slider value changes **externally** (from Retirement Simulator, Cost of Waiting, or any other source).                                                      |
| AC4.4 | The **right side** of the thumb (and full track on initial load before interaction) is gray/unfilled.                                                                             |
| AC4.5 | Mechanism: Angular `effect()` subscribes to each slider signal and updates a CSS custom property or inline `background` style using `(value - min) / (max - min) * 100%` formula. |
| AC4.6 | This rule must hold even when values are set programmatically (not by user drag).                                                                                                 |

### Sub-Issue 5: Chart.js Scale Registration Error Fix

| #     | Criterion                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC5.1 | Fix `ERROR: "category" is not a registered scale`.                                                                                                                                   |
| AC5.2 | In `app.config.ts` (or a dedicated `chart-setup.ts` imported early), register all required Chart.js scale and element types.                                                         |
| AC5.3 | Use `provideCharts(withDefaultRegisterables())` from `ng2-charts` if available in current project version; otherwise manually call `Chart.register(...)` with all required elements. |
| AC5.4 | All Chart.js charts in the application render correctly after the fix.                                                                                                               |
| AC5.5 | No `console.error` output related to unregistered scales on app start.                                                                                                               |

---

## Technical Notes

- **Defaults service pattern:** Follows Repository Pattern already established in the project (US1.5). `ISimulatorConfigRepository` is an abstraction analogous to `ILeadRepository`.
- **Track fill mechanism:** PrimeNG Slider does not natively support colored track fill. Must be applied via Angular effect + CSS `linear-gradient` on the native input range or a custom overlay element.
- **Chart.js version:** Check `package.json` for current `chart.js` version. For v3+, registration is mandatory.

---

## Definition of Done

- [ ] Wealth Gap section fits on 1024px height without scroll.
- [ ] All sliders have correct min/max/step values.
- [ ] `simulator-defaults.json` created and service reads from it.
- [ ] Slider track fill works on load and on programmatic changes.
- [ ] Chart.js error resolved; charts render.
- [ ] Unit tests for defaults service.
- [ ] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-06_
