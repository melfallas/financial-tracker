---
description: Helps to setup the Angular Stack environment
---

# Project Stack Setup

## Resultado Final

Proyecto configurado con dependencias instaladas.

---

## Paso 1: Crear y Configurar Proyecto

_(No es necesario para este proyecto)_

```
Crea y configura el proyecto.
Debes primero verificar la instalación y proceder en caso de que no esté creado en el root.
```

```bash
No es necesario para este proyecto.
```

---

## Paso 2: Configurar Tailwind & PrimeNG

**Prompt para la IA:**

```
Estoy configurando un proyecto Angular y TypeScript.
Necesito integrar Tailwind CSS v4, PrimeNG & NgRx. Procede con la instalación y config.
Debes primero verificar la instalación y proceder en caso de que no esté instalado.

Requisitos:
- Actualizar src/styles.scss con el import de Tailwind

Utiliza los comandos proveídos en caso de aplicar.
Dame los archivos modificados.
```

```bash
# Install Tailwind CSS and its peer dependencies
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Install PrimeNG (UI Library) and PrimeIcons
pnpm add primeng primeicons
# Install NgRx Signal Store for State Management
pnpm add @ngrx/signals
```

---

## Paso 3: Configurar Testing

**Prompt para la IA:**

```
Instala y configura Vitest para testing de componentes.
Debes primero verificar la instalación y proceder en caso de que no esté instalado.

Requisitos:
- Usar jsdom como environment
- Configurar setupFiles para jest-dom
- Agregar scripts en package.json: "test", "test:run", "test:coverage"

El proyecto usa Angular + TypeScript.
Utiliza los comandos proveídos en caso de aplicar.
```

```bash
# Install Vitest for high-performance Unit Testing (replacing Jasmine/Karma)
pnpm add -D vitest @analogjs/vitest-angular
# Vites for Angular 21+
pnpm install -D vitest @angular/platform-browser-dynamic jsdom @vitest/coverage-v8 @testing-library/angular @testing-library/dom
```

**Verificar**:

```bash
pnpm test
```

---

## Paso 3.1: Configurar tsconfig para Build (IMPORTANTE)

**Prompt para la IA:**

```
Necesito excluir los archivos de test del build de producción en TypeScript.

El problema: cuando hago pnpm build, TSC intenta compilar archivos .test.ts
y .test.tsx que usan globals de Vitest (describe, it, expect).

Modifica tsconfig.app.json para excluir estos archivos del build.
```

---

## Paso 3.2: Configurar Playwright

```
Instala Playwright para los test E2E.
Debes primero verificar la instalación y proceder en caso de que no esté instalado.
```

```bash
# Install Playwright for E2E Testing
pnpm add -D @playwright/test
npx playwright install
```

## Paso 4: Estructura de Carpetas (The Scope Rule)

### Concepto: La Regla del Scope

Organizamos el código siguiendo el mismo concepto de **scope** de JavaScript:

```javascript
// Global Scope - disponible en toda la app
let globalVariable = 'Available everywhere';

// Local Scope - solo disponible en su contexto
function localContext() {
  let localVariable = 'Available only here';
}
```

**Aplicado a la arquitectura:**

| Tipo             | Ubicación             | Visibilidad       | Ejemplos                           |
| ---------------- | --------------------- | ----------------- | ---------------------------------- |
| **Global Scope** | `src/app/shared/`     | Toda la app       | Button, Modal, formatPrice, types  |
| **Local Scope**  | `src/app/features/X/` | Solo en feature X | ProductCard, CartItem, CartService |

**Beneficios:**

- 🧩 **Modularidad**: Cada feature es independiente
- ♻️ **Reuso eficiente**: Componentes globales sin redundancia
- ⚡ **Lazy loading**: Features locales se cargan solo cuando se necesitan
- 🔍 **Claridad**: Sabes dónde buscar cada cosa

---

**Prompt para la IA:**

```
Crea la estructura de carpetas en caso de que no existan, siguiendo la "Scope Rule":

GLOBAL SCOPE (src/app/shared/) - Disponible en toda la app:
- types/       → Tipos TypeScript compartidos
- utils/       → Funciones de utilidad (formatPrice, etc.)
- constants/   → Constantes de negocio
- components/  → Componentes UI genéricos (Button, Modal, Skeleton)

LOCAL SCOPE (src/app/features/) - Específico de cada funcionalidad

INFRAESTRUCTURA:
- src/app/infrastructure/  → Servicios externos (Sentry, API clients)
- src/app/test/           → Configuración de tests

Crea archivos index.ts vacíos donde sea necesario para los exports.
```

### Estructura Resultante

```
src/app/
├── shared/                    # 🌍 GLOBAL SCOPE
│   ├── types/
│   │   └── index.ts          # Product, CartItem
│   ├── utils/
│   │   └── index.ts          # formatPrice, calculateSubtotal
│   ├── constants/
│   │   └── business-rules.ts  # Reglas de negocio
│   ├── components/
│   │   └── index.ts          # Button, Skeleton, Toast
│
├── infrastructure/            # 🔧 SERVICIOS EXTERNOS
│   └── infra.ts
│
└── test/                      # 🧪 CONFIG DE TESTS
    └── setup.ts
```

### Regla Simple para Decidir

> **¿Lo usa más de una feature?** → `shared/` (Global Scope)
>
> **¿Solo lo usa una feature?** → `features/X/` (Local Scope)

---

**Verificar**:

```bash
pnpm dev
# Abrir http://localhost:5173
```

---

## Paso 7: Verificación Final

```bash
# Ejecutar TODOS estos comandos - todos deben pasar
pnpm test:run      # Tests unitarios
pnpm build         # Build exitoso (verifica que tsconfig excluye tests)
```

---

## Checkpoint

Al final del setup se tiene:

- ✅ Proyecto Angular + TypeScript
- ✅ Tailwind CSS funcionando
- ✅ Vitest + Testing Library configurado
- ✅ tsconfig.app.json excluyendo archivos de test
- ✅ Estructura de carpetas lista
- ✅ Build exitoso
