# Phase 6: Verification & Testing Guide

## Objective
Verify all requirements, edge cases, responsiveness, and state lifecycle behaviors across the client-side Resume Builder application.

---

## Verification Test Cases

### 1. Dev Server & Build Check
- [ ] Run `npm run dev` and ensure application boots with 0 compiler errors or hydration mismatches.
- [ ] Run `npm run build` to confirm strict TypeScript types and client-side packaging.

### 2. Live Synchronization Verification
- [ ] In the **Personal Info** section, type into Name, Email, Phone, LinkedIn, and GitHub.
  - **Expected:** Right-hand A4 template updates synchronously with zero delay or page reloads.
- [ ] In the **Experience** section:
  - Add multiple experience entries.
  - Fill out company, role, dates, description.
  - Remove an experience entry in the middle.
  - **Expected:** Experience list in template dynamically updates without data corruption.
- [ ] In the **Education** section:
  - Add and delete education entries.
  - **Expected:** Template reflects only existing entries.
- [ ] In the **Skills** section:
  - Add skill tags and remove individual tags using delete buttons.
  - **Expected:** Template skill badges synchronize immediately.

### 3. Split-Pane Layout & Visual Quality
- [ ] Verify left column takes `w-1/3` and right column takes `w-2/3` on desktop screens.
- [ ] Verify each pane has its own independent vertical scrolling.
- [ ] Verify `<ResumeTemplate />` maintains strict A4 aspect ratio (`210mm x 297mm`) with a clean shadow effect.

### 4. PDF Export & Post-Export Session Reset
- [ ] Click the **Export PDF** button.
- [ ] Confirm print preview dialog opens displaying exact A4 formatting without clipping.
- [ ] Complete or close the print dialog.
- [ ] **Expected:** `onAfterPrint` fires -> `resetStore()` is executed -> all input fields in the form and all preview text in the template instantly reset to blank.

### 5. Architectural Constraints Check
- [ ] Ensure **zero** backend API routes exist under `app/api`.
- [ ] Ensure **zero** database connections or schemas exist.
- [ ] Ensure **zero** server actions are defined.
- [ ] Confirm all components are 100% client-side.
