# Section 2: Resume Import & Multi-Format Parsing

## Overview
The application includes a dedicated second section for importing existing resumes in multiple formats, extracting the content 100% client-side, and populating all text inputs so users can edit and update any part of their resume before exporting.

---

## Supported File Formats

| Format | Extension | Parser Implementation | Privacy & Execution |
|---|---|---|---|
| **PDF** | `.pdf` | `pdfjs-dist` (dynamic client-side canvas/text stream) | 100% Client-Side |
| **Microsoft Word** | `.docx` | `mammoth` (client-side raw XML extraction) | 100% Client-Side |
| **JSON Resume** | `.json` | Native `JSON.parse` with schema normalization | 100% Client-Side |
| **Plain Text** | `.txt` / pasted | Heuristic regex parser (regex for email, phone, links, sections) | 100% Client-Side |

---

## Webpage Layout & Divided Sections

1. **Top Segmented Navigation:**
   - **`1. Edit Inputs`**: Displays the structured form fields divided into clean cards:
     - Personal Information (Name, Email, Phone, LinkedIn, GitHub)
     - Work Experience (dynamic items: Role, Company, Dates, Description)
     - Education (dynamic items: Degree, School, Dates)
     - Skills (Tag-based badges with text entry)
   - **`2. Import Resume`**: Drag-and-drop file upload, accepted format badges, raw text paste textarea, "Parse & Load into Inputs" action, and "Save as JSON" backup action.

2. **Bidirectional Editing Flow:**
   - User imports a resume file (PDF, Word, or JSON).
   - The parser normalizes the fields and updates the Zustand store (`importResume`).
   - The application automatically switches to `1. Edit Inputs`.
   - All extracted fields are rendered as editable text inputs.
   - Any modifications update the live A4 preview on the right pane in real-time.
