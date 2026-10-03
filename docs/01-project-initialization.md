# Phase 1: Project Initialization

## Objective
Initialize the Next.js application with TypeScript, Tailwind CSS, and essential client-side libraries, followed by cleaning boilerplate code.

---

## Detailed Tasks

### 1. Project Scaffolding
- Execute Next.js creation command in workspace root (`d:\110_days\Project\resume_Builder`):
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes
  ```
- Verify root directory structure (`app/`, `public/`, `package.json`, `tsconfig.json`, `tailwind.config.ts`).

### 2. Dependency Installation
- Install required packages:
  ```bash
  npm install zustand react-to-print lucide-react
  ```
- Package details:
  - `zustand`: Lightweight, unopinionated client-side state store.
  - `react-to-print`: Opens native browser print dialog for a targeted React element ref.
  - `lucide-react`: Clean SVG icon set for contact links and form sections.

### 3. Clean Boilerplate Code
- **`app/globals.css`**:
  - Remove all default Next.js dark mode rules, fonts, and gradient classes.
  - Retain Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
  - Add print specific page rules:
    ```css
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
    ```
- **`app/layout.tsx`**:
  - Clean up fonts if necessary and set concise document title (`Resume Builder - Client Side`).
- **`app/page.tsx`**:
  - Clear boilerplate demo UI; mark as `"use client"` and set up placeholder layout container.

---

## Acceptance Criteria
- [ ] Next.js app compiles without errors (`npm run build` / `npm run dev`).
- [ ] `zustand`, `react-to-print`, and `lucide-react` appear in `package.json` dependencies.
- [ ] No default Next.js boilerplate styles or marketing text remains on the screen.
