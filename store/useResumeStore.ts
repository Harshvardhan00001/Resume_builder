import { create } from "zustand";

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

export interface ResumeState {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];

  // Core required actions
  updateField: (
    section: "personalInfo" | "experience" | "education" | "skills",
    field: string | number,
    value: any
  ) => void;
  resetStore: () => void;

  // List management helpers
  addExperience: (item?: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: (item?: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  setSkills: (skills: string[]) => void;
  loadSampleData: () => void;
  importResume: (data: Partial<ResumeState> | any) => void;
}

const initialPersonalInfo: PersonalInfo = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
};

const initialEmptyState = {
  personalInfo: initialPersonalInfo,
  experience: [] as ExperienceItem[],
  education: [] as EducationItem[],
  skills: [] as string[],
};

const sampleData = {
  personalInfo: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
  },
  experience: [
    {
      id: "exp-sample-1",
      company: "TechNova Solutions",
      role: "Senior Frontend Engineer",
      dates: "2022 - Present",
      description:
        "Architected and deployed responsive Next.js applications serving over 1M monthly active users. Reduced bundle size by 35% through dynamic imports and image optimization.",
    },
    {
      id: "exp-sample-2",
      company: "PixelCraft Studios",
      role: "Software Developer",
      dates: "2020 - 2022",
      description:
        "Engineered scalable UI component libraries with TypeScript and Tailwind CSS. Collaborated with cross-functional design and product teams to deliver 12 high-impact features.",
    },
  ],
  education: [
    {
      id: "edu-sample-1",
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      dates: "2016 - 2020",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "Node.js",
    "Git",
    "REST & GraphQL",
  ],
};

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const useResumeStore = create<ResumeState>((set) => ({
  ...initialEmptyState,

  updateField: (section, field, value) =>
    set((state) => {
      if (section === "personalInfo") {
        return {
          personalInfo: {
            ...state.personalInfo,
            [field as keyof PersonalInfo]: value,
          },
        };
      }

      if (section === "experience") {
        // field can be an ID or index, or if field === 'all', value is the array
        if (field === "all" && Array.isArray(value)) {
          return { experience: value };
        }
        const updated = state.experience.map((item, idx) => {
          if (item.id === field || idx === field) {
            if (typeof value === "object" && value !== null) {
              return { ...item, ...value };
            }
            return item;
          }
          return item;
        });
        return { experience: updated };
      }

      if (section === "education") {
        if (field === "all" && Array.isArray(value)) {
          return { education: value };
        }
        const updated = state.education.map((item, idx) => {
          if (item.id === field || idx === field) {
            if (typeof value === "object" && value !== null) {
              return { ...item, ...value };
            }
            return item;
          }
          return item;
        });
        return { education: updated };
      }

      if (section === "skills") {
        if (Array.isArray(value)) {
          return { skills: value };
        }
        if (typeof field === "number") {
          const newSkills = [...state.skills];
          newSkills[field] = String(value);
          return { skills: newSkills };
        }
      }

      return state;
    }),

  resetStore: () =>
    set({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
      },
      experience: [],
      education: [],
      skills: [],
    }),

  addExperience: (item) =>
    set((state) => ({
      experience: [
        ...state.experience,
        {
          id: generateId(),
          company: item?.company ?? "",
          role: item?.role ?? "",
          dates: item?.dates ?? "",
          description: item?.description ?? "",
        },
      ],
    })),

  removeExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((exp) => exp.id !== id),
    })),

  addEducation: (item) =>
    set((state) => ({
      education: [
        ...state.education,
        {
          id: generateId(),
          school: item?.school ?? "",
          degree: item?.degree ?? "",
          dates: item?.dates ?? "",
        },
      ],
    })),

  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  addSkill: (skill) =>
    set((state) => {
      const trimmed = skill.trim();
      if (!trimmed || state.skills.includes(trimmed)) return state;
      return { skills: [...state.skills, trimmed] };
    }),

  removeSkill: (index) =>
    set((state) => ({
      skills: state.skills.filter((_, idx) => idx !== index),
    })),

  setSkills: (skills) => set({ skills }),

  loadSampleData: () => set({ ...sampleData }),

  importResume: (data) =>
    set((state) => {
      if (!data || typeof data !== "object") return state;

      const rawPersonal = data.personalInfo || {};
      const newPersonalInfo: PersonalInfo = {
        name: rawPersonal.name || data.name || state.personalInfo.name || "",
        email: rawPersonal.email || data.email || state.personalInfo.email || "",
        phone: rawPersonal.phone || data.phone || state.personalInfo.phone || "",
        linkedin: rawPersonal.linkedin || data.linkedin || state.personalInfo.linkedin || "",
        github: rawPersonal.github || data.github || state.personalInfo.github || "",
      };

      const rawExp = Array.isArray(data.experience)
        ? data.experience
        : Array.isArray(data.work)
        ? data.work
        : [];

      const newExperience: ExperienceItem[] = rawExp.map((item: any) => ({
        id: item.id || generateId(),
        company: item.company || item.employer || item.organization || "",
        role: item.role || item.position || item.title || "",
        dates: item.dates || item.date || item.period || item.duration || "",
        description: item.description || item.summary || item.details || "",
      }));

      const rawEdu = Array.isArray(data.education) ? data.education : [];
      const newEducation: EducationItem[] = rawEdu.map((item: any) => ({
        id: item.id || generateId(),
        school: item.school || item.institution || item.university || "",
        degree: item.degree || item.program || item.field || "",
        dates: item.dates || item.date || item.period || item.year || "",
      }));

      let newSkills: string[] = [];
      if (Array.isArray(data.skills)) {
        newSkills = data.skills.map((s: any) => (typeof s === "string" ? s : s.name || "")).filter(Boolean);
      } else if (typeof data.skills === "string") {
        newSkills = data.skills
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }

      return {
        personalInfo: newPersonalInfo,
        experience: newExperience.length > 0 ? newExperience : state.experience,
        education: newEducation.length > 0 ? newEducation : state.education,
        skills: newSkills.length > 0 ? newSkills : state.skills,
      };
    }),
}));

