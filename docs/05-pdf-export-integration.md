# Phase 5: PDF Export Integration

## Objective
Implement PDF export functionality using `react-to-print`, connect it to the `<ResumeTemplate />` ref, and trigger an automatic wipe of the Zustand store upon print completion.

---

## Detailed Tasks

### 1. Export Button Component (`components/ExportButton.tsx`)
- Mark with `"use client"`.
- Import `useReactToPrint` from `react-to-print`.
- Accept `contentRef: React.RefObject<HTMLDivElement | null>` as a prop.
- Access `resetStore` from `useResumeStore`.

### 2. Configure `react-to-print` Hook
```typescript
const handlePrint = useReactToPrint({
  contentRef: contentRef,
  documentTitle: personalInfo.name ? `${personalInfo.name.replace(/\s+/g, '_')}_Resume` : 'Resume',
  onAfterPrint: () => {
    // Immediate session data wipe required by specification
    resetStore();
  },
});
```

### 3. Print Polish & Styling
- Add print-specific CSS rules to ensure exact A4 page matching:
  - Background color and graphics preservation:
    `-webkit-print-color-adjust: exact; print-color-adjust: exact;`
  - Zero out print margins (`@page { margin: 0; }`) to prevent browser headers and footers from corrupting layout.
  - Hide all non-resume UI (`.no-print` or `@media print` rules) during print invocation.

### 4. Layout Placement
- Place `<ExportButton />` fixed/sticky at the top of the right preview column (`top-4 z-20`).
- Include intuitive icon (e.g. `Download` or `Printer` from `lucide-react`) and hover/active states.

---

## Acceptance Criteria
- [ ] Clicking "Export PDF" opens the browser's native print / save-as-PDF dialog.
- [ ] Exported document mirrors the A4 styling of `<ResumeTemplate />`.
- [ ] When printing finishes or the dialog closes (`onAfterPrint`), `resetStore()` triggers immediately.
- [ ] Both the left-hand form and right-hand preview become completely blank instantly following the print action.
