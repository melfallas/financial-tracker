# 📘 KB: FIN-TRACKER GLOBAL MVP (Spanish Version)

Como **Winston (Architect)** (🏗️), procedo a activar el **KB-Mode (Knowledge Base Mode)**. He consolidado todo el conocimiento técnico, las reglas de negocio y los activos de diseño generados durante nuestras iteraciones en este repositorio estructurado de información.

Este documento sirve como la **Única Fuente de Verdad (SSOT)** para la implementación del proyecto.

#### 1. Core Architecture (Angular 21 + Signals)

- **State Management:** Uso estricto de `Signals` para reactividad granular. Se evita `RxJS` para estados simples, reservándolo únicamente para flujos de datos asíncronos (HTTP, Supabase).
- **Methodology:** Arquitectura **BMAD** (Base, Modals, Assets, Data) con componentes planos (sin sufijo `.component`).
- **Dependency Injection:** Inyección de servicios mediante la función `inject()` para un código más limpio y moderno.

#### 2. Design System & UX (Sally's Rules)

- **Mobile-First:** Diseño responsivo estricto. Layouts `flex-col` por defecto, escalando a `md:flex-row`.
- **Color Palette (80/15/5):**
- **80% (Base):** `Deep Blue (#1A237E)`, `Cloud Gray (#ECEFF1)`, `Charcoal (#37474F)`.
- **15% (Success/Feedback):** `Emerald Green (#00C853)`, `Teal Bright (#009688)`.
- **5% (Action):** `CTA Orange (#F57C00)`, `Golden Amber (#FFB300)`.

- **Psychology:** Uso de **Skeletons** para reducir la carga cognitiva y **Soft Red** para alertas de inflación crítica.

#### 3. Financial Engine (Inflation-Adjusted)

- **Currency Engine:** Soporte nativo para **USD, EUR y Divisas de LATAM**.
- **Inflation Gap:** Cálculo dinámico del "Wealth Gap" (Brecha de Riqueza) que resta el impacto inflacionario anual al rendimiento nominal del interés compuesto.
- **Data Source:** Prevista para conexión con APIs de mercado y almacenamiento en Supabase.

#### 4. Infrastructure & Integration

- **Persistence:** Patrón Repository (`ILeadRepository`). Implementación inicial en `LocalStorage`, lista para migrar a **Supabase** (Fase 2).
- **i18n (Localization):** Sistema bilingüe (**Español/Inglés**) mediante archivos de traducción JSON. El idioma afecta formatos de moneda y leyendas.
- **Automation:** Generación de PDF local con resumen de inversión y envío de email de bienvenida (Resend/SendGrid logic).

---

### 📋 Technical Blueprint Summary (Snapshot)

| Componente      | Lógica Clave                  | UI/UX Feature               |
| --------------- | ----------------------------- | --------------------------- |
| `LeadForm`      | Signal-based Validation       | Success Feedback (Emerald)  |
| `Calculator`    | `calculateAdvancedProjection` | Multi-currency Slider       |
| `MarketStatus`  | `fearGreedValue()` Signal     | Responsive Grid             |
| `InflationDash` | `INFLATION_DATA` Lookup       | High-Volatility Alert (Red) |

---

### 🛡️ Saved Constraints (Memory Bank)

1. **Language:** Conversación en Español / Código y Comentarios en Inglés.
2. **Naming:** No use of `.component.ts` or `.component.html` suffixes.
3. **Units:** All math done in USD internally; converted to local currency for Display Only.
4. **Testing:** Every feature must have a corresponding Storybook story with mobile viewport testing.
