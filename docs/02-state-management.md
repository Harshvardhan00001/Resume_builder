# Phase 2: State Management Setup

## Objective
Create the single source of truth for resume data using Zustand in `store/useResumeStore.ts`. Ensure strict type safety and zero server-side or persistent storage requirements.

---

## Data Schema & Types

```typescript
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  dates: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  dates: string;
}

export interface ResumeStoreState {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];

  // Core required actions
  updateField: (
    section: 'personalInfo' | 'experience' | 'education' | 'skills',
    fieldOrIndex?: string | number,
    value?: any
  ) => void;
  resetStore: () => void;

  // Ergonomic helper actions
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
}
```

---

## Detailed Tasks

### 1. Store File Creation
- Create `store/useResumeStore.ts`.
- Define initial state with sensible clean defaults:
  - `personalInfo`: empty strings for all 5 fields.
  - `experience`: empty array (or 1 starter item with empty strings).
  - `education`: empty array (or 1 starter item with empty strings).
  - `skills`: empty array `[]`.

### 2. Action Implementation
- **`updateField(section, fieldOrIndex, value)`**:
  - If `section === 'personalInfo'`: updates `state.personalInfo[field] = value`.
  - If `section === 'experience'`: updates specific experience entry by ID/index or updates array.
  - If `section === 'education'`: updates specific education entry by ID/index or updates array.
  - If `section === 'skills'`: updates entire skills array or updates skill at index.
- **Array operations**:
  - `addExperience`: Appends a new `{ id: crypto.randomUUID(), company: '', role: '', dates: '', description: '' }`.
  - `removeExperience(id)`: Filters out the entry with matching ID.
  - `addEducation`: Appends `{ id: crypto.randomUUID(), school: '', degree: '', dates: '' }`.
  - `removeEducation(id)`: Filters out matching ID.
  - `addSkill(skill)`: Trims and appends skill string if non-empty.
  - `removeSkill(index)`: Removes skill at index.
- **`resetStore()`**:
  - Immediately resets `personalInfo`, `experience`, `education`, and `skills` back to their initial empty states.

---

## Acceptance Criteria
- [ ] TypeScript types compile without `any` regressions.
- [ ] Updates to any field mutate the Zustand store immutably.
- [ ] Calling `resetStore()` instantly clears all state back to initial values.
