# Phase 4: Form Controls & Live Preview Layout

## Objective
Create the interactive editor form (`components/ResumeForm.tsx`) and assemble the split-pane desktop view in `app/page.tsx` for real-time live previewing.

---

## Detailed Tasks

### 1. Form Component (`components/ResumeForm.tsx`)
- Mark with `"use client"`.
- Connect to `useResumeStore`:
  ```typescript
  const {
    personalInfo,
    experience,
    education,
    skills,
    updateField,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
  } = useResumeStore();
  ```
- **Section 1: Personal Information**
  - Inputs for: Full Name, Email, Phone, LinkedIn, and GitHub.
  - Bound via `onChange={(e) => updateField('personalInfo', 'name', e.target.value)}`.
- **Section 2: Experience**
  - List of dynamic items. Each item includes:
    - Company input
    - Role / Position input
    - Dates input (e.g. `2022 - Present`)
    - Description textarea
    - "Delete" button (calls `removeExperience(item.id)`)
  - "+ Add Experience" button to append a new item.
- **Section 3: Education**
  - List of dynamic items. Each item includes:
    - School / University input
    - Degree input
    - Dates input
    - "Delete" button (calls `removeEducation(item.id)`)
  - "+ Add Education" button.
- **Section 4: Skills**
  - Text input with "Add" button (or Enter key trigger) to add a skill tag.
  - Interactive skill pill badges with 'x' button to remove individual skills.

### 2. Split-Pane Layout (`app/page.tsx`)
- Layout constraints:
  - Screen-filling viewport: `h-screen w-screen overflow-hidden flex flex-col md:flex-row`.
  - **Left Column (`w-full md:w-1/3`):**
    - Scrollable independent container (`h-full overflow-y-auto p-6 bg-white border-r border-gray-200`).
    - Renders `<ResumeForm />`.
  - **Right Column (`w-full md:w-2/3`):**
    - Scrollable independent container (`h-full overflow-y-auto bg-gray-100 p-8 flex flex-col items-center relative`).
    - Top floating bar with `<ExportButton />`.
    - Centered preview container holding `<ResumeTemplate ref={resumeRef} />`.

---

## Acceptance Criteria
- [ ] Left column is `w-1/3` and right column is `w-2/3` on desktop screens.
- [ ] Left column scrolls independently from the right column.
- [ ] Typing into any input updates the right-hand preview instantly without latency or page reload.
- [ ] Items in Experience, Education, and Skills can be added and removed dynamically.
