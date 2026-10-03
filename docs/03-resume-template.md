# Phase 3: Resume Template Component

## Objective
Create `components/ResumeTemplate.tsx`, a purely presentational ("dumb") component that renders an A4-sized resume reflecting the Zustand store data with zero internal state.

---

## Detailed Tasks

### 1. Component Shell & Print Ref Support
- Create `components/ResumeTemplate.tsx`.
- Support ref passing (using `React.forwardRef<HTMLDivElement>`) to allow `react-to-print` to target the root DOM node.
- Mark with `"use client"`.

### 2. Strict Layout & A4 Dimensions
- Apply strict A4 dimensions and styling using Tailwind:
  ```html
  <div
    ref={ref}
    className="w-[210mm] min-h-[297mm] p-10 bg-white text-black shadow-xl mx-auto box-border font-sans print:shadow-none print:w-full print:min-h-0 print:p-8"
  >
    <!-- Template Content -->
  </div>
  ```
- Ensure content remains readable both on-screen and when exported to PDF.

### 3. Store Consumption (Pure Dumb Component)
- Subscribe directly to `useResumeStore`:
  ```typescript
  const { personalInfo, experience, education, skills } = useResumeStore();
  ```
- **Constraint Check:**
  - DO NOT use `useState`, `useReducer`, or local draft states inside this component.
  - The component must strictly be a direct mirror of `useResumeStore`.

### 4. Layout Sections & Visual Hierarchy
- **Header Section:**
  - Candidate Name (prominent bold title).
  - Contact row: Email, Phone, LinkedIn, and GitHub links/handles with subtle icons or bullet dividers.
  - Fallback placeholder text or conditional rendering when fields are empty.
- **Divider:** Clean horizontal rule or section borders.
- **Experience Section:**
  - Section title ("EXPERIENCE" / "WORK HISTORY").
  - Map over `experience`: Role title, company name, dates (aligned right or subtitle), and bullet-separated or paragraph descriptions.
- **Education Section:**
  - Section title ("EDUCATION").
  - Map over `education`: Degree, institution name, and dates attended.
- **Skills Section:**
  - Section title ("SKILLS").
  - Render skill tags or comma-separated inline list.

---

## Acceptance Criteria
- [ ] Rendered element maintains strict A4 aspect ratio (`210mm x 297mm`).
- [ ] No local `useState` is used for template data.
- [ ] Changes in Zustand store reflect in the template instantly.
- [ ] Supports ref forwarding cleanly for printing.
