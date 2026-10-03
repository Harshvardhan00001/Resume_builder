import mammoth from "mammoth";

export interface ParsedResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    dates: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    dates: string;
  }>;
  skills: string[];
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Extracts plain text from a Word (.docx) file client-side using mammoth.
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value || "";
}

/**
 * Extracts text from a PDF file client-side by dynamically loading PDF.js.
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  if (typeof window === "undefined") {
    throw new Error("PDF parsing is only supported in browser environment.");
  }

  // Load PDF.js from reliable CDN if not already loaded on window
  if (!(window as any).pdfjsLib) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        try {
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      script.onerror = () =>
        reject(new Error("Unable to load PDF parser library in browser."));
      document.head.appendChild(script);
    });
  }

  const pdfjsLib = (window as any).pdfjsLib;
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageStrings = content.items.map((item: any) => item.str || "");
    fullText += pageStrings.join(" ") + "\n";
  }

  return fullText;
}

/**
 * Smart heuristic parser for raw resume text.
 */
export function parseRawResumeText(text: string): ParsedResumeData {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("No text found in file or input.");
  }

  // Check if it is JSON format
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        personalInfo: {
          name: parsed.personalInfo?.name || parsed.name || "",
          email: parsed.personalInfo?.email || parsed.email || "",
          phone: parsed.personalInfo?.phone || parsed.phone || "",
          linkedin: parsed.personalInfo?.linkedin || parsed.linkedin || "",
          github: parsed.personalInfo?.github || parsed.github || "",
        },
        experience: Array.isArray(parsed.experience)
          ? parsed.experience.map((e: any) => ({
              id: e.id || generateId(),
              company: e.company || "",
              role: e.role || "",
              dates: e.dates || "",
              description: e.description || "",
            }))
          : [],
        education: Array.isArray(parsed.education)
          ? parsed.education.map((e: any) => ({
              id: e.id || generateId(),
              school: e.school || "",
              degree: e.degree || "",
              dates: e.dates || "",
            }))
          : [],
        skills: Array.isArray(parsed.skills)
          ? parsed.skills.map((s: any) => (typeof s === "string" ? s : s.name || ""))
          : [],
      };
    } catch {
      // Fall through to text heuristics
    }
  }

  const lines = trimmed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  // Extract contact info with regex
  const emailMatch = trimmed.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const phoneMatch = trimmed.match(
    /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
  );
  const linkedinMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in\/)?([a-zA-Z0-9_-]+)/i
  );
  const githubMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i
  );

  // Find candidate name (first line that is not an email/phone/url or title like "Resume")
  let name = "";
  for (const line of lines) {
    if (
      !line.includes("@") &&
      !line.toLowerCase().includes("resume") &&
      !line.toLowerCase().includes("curriculum vitae") &&
      !line.match(/\d{4}/) &&
      line.length >= 2 &&
      line.length <= 40
    ) {
      name = line;
      break;
    }
  }

  // Detect Sections
  const experience: ParsedResumeData["experience"] = [];
  const education: ParsedResumeData["education"] = [];
  let skills: string[] = [];

  let currentSection: "unknown" | "experience" | "education" | "skills" = "unknown";
  let sectionLines: string[] = [];

  const flushSection = (sec: typeof currentSection, rawLines: string[]) => {
    if (sec === "skills") {
      const combined = rawLines.join(" ");
      const items = combined
        .split(/[,|•·;\n]/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ""))
        .filter((s) => s.length > 1 && s.length < 35);
      skills.push(...items);
    } else if (sec === "experience") {
      // Group experience lines
      let currentItem: Partial<ParsedResumeData["experience"][0]> | null = null;
      for (const line of rawLines) {
        const dateMatch = line.match(
          /(?:\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?\b\d{4}\b\s*(?:-|–|to)\s*(?:Present|\b\d{4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b)/i
        );

        if (dateMatch || !currentItem) {
          if (currentItem) {
            experience.push({
              id: generateId(),
              company: currentItem.company || "",
              role: currentItem.role || "",
              dates: currentItem.dates || "",
              description: currentItem.description || "",
            });
          }
          currentItem = {
            id: generateId(),
            dates: dateMatch ? dateMatch[0] : "",
            role: line.replace(dateMatch ? dateMatch[0] : "", "").trim(),
            company: "",
            description: "",
          };
        } else {
          if (!currentItem.company && line.length < 50) {
            currentItem.company = line;
          } else {
            currentItem.description = currentItem.description
              ? `${currentItem.description}\n${line}`
              : line;
          }
        }
      }
      if (currentItem) {
        experience.push({
          id: generateId(),
          company: currentItem.company || "",
          role: currentItem.role || "",
          dates: currentItem.dates || "",
          description: currentItem.description || "",
        });
      }
    } else if (sec === "education") {
      let currentItem: Partial<ParsedResumeData["education"][0]> | null = null;
      for (const line of rawLines) {
        const dateMatch = line.match(/\b\d{4}\b\s*(?:-|–|to)\s*(?:\b\d{4}\b|Present)/i);
        if (dateMatch || !currentItem) {
          if (currentItem) {
            education.push({
              id: generateId(),
              school: currentItem.school || "",
              degree: currentItem.degree || "",
              dates: currentItem.dates || "",
            });
          }
          currentItem = {
            id: generateId(),
            dates: dateMatch ? dateMatch[0] : "",
            degree: line.replace(dateMatch ? dateMatch[0] : "", "").trim(),
            school: "",
          };
        } else {
          if (!currentItem.school) {
            currentItem.school = line;
          }
        }
      }
      if (currentItem) {
        education.push({
          id: generateId(),
          school: currentItem.school || "",
          degree: currentItem.degree || "",
          dates: currentItem.dates || "",
        });
      }
    }
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      lower.includes("experience") ||
      lower.includes("employment") ||
      lower.includes("work history")
    ) {
      flushSection(currentSection, sectionLines);
      currentSection = "experience";
      sectionLines = [];
    } else if (
      lower.includes("education") ||
      lower.includes("academic") ||
      lower.includes("qualification")
    ) {
      flushSection(currentSection, sectionLines);
      currentSection = "education";
      sectionLines = [];
    } else if (
      lower.includes("skills") ||
      lower.includes("technologies") ||
      lower.includes("proficiencies")
    ) {
      flushSection(currentSection, sectionLines);
      currentSection = "skills";
      sectionLines = [];
    } else {
      if (currentSection !== "unknown") {
        sectionLines.push(line);
      }
    }
  }
  flushSection(currentSection, sectionLines);

  // Deduplicate skills
  const uniqueSkills = Array.from(new Set(skills));

  return {
    personalInfo: {
      name,
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0] : "",
      linkedin: linkedinMatch ? linkedinMatch[0] : "",
      github: githubMatch ? githubMatch[0] : "",
    },
    experience,
    education,
    skills: uniqueSkills,
  };
}
