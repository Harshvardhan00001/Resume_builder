# Client-Side Next.js Resume Builder

A modern, high-performance, **100% client-side** web application for crafting, editing, importing, and exporting professional A4 resumes. Built with Next.js (App Router), TypeScript, Tailwind CSS, Zustand, `react-to-print`, `mammoth`, and `lucide-react`.

---

## ✨ Features

- **🔒 100% Client-Side Privacy:** No database, no backend API routes, and no external server tracking. All your resume data remains entirely in your browser memory.
- **⚡ Split-Pane Live Preview:** Real-time synchronized editing. Typing in the input pane updates the A4 resume preview on the right instantly without page reloads.
- **📄 Multi-Format Resume Import:**
  - **PDF (.pdf):** Extracts text client-side in the browser.
  - **Microsoft Word (.docx):** Extracts raw XML text with `mammoth`.
  - **JSON Resume (.json):** Instant schema normalization and load.
  - **Plain Text / Paste:** Heuristic parser that identifies contact information, skills, experience, and education blocks.
- **🖨️ Pixel-Perfect A4 PDF Export:** Strict `210mm x 297mm` A4 layout with print styles (`@page { size: A4; margin: 0; }`).
- **🧹 Immediate Session Wipe on Export:** In compliance with security and privacy best practices, session state is cleared immediately after printing completes (`onAfterPrint`).
- **💾 JSON Backup & Restore:** Export your current resume data to a JSON backup file anytime, and re-import it whenever you need to make updates.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Printing / PDF:** [`react-to-print`](https://github.com/gregnb/react-to-print)
- **Document Parsing:** [`mammoth`](https://github.com/mwilliamson/mammoth.js), PDF.js
- **Icons:** [`lucide-react`](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+` (tested on Node v22)
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/Harshvardhan00001/Resume_builder.git
cd Resume_builder

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css         # Tailwind directives & @page print styling
│   ├── layout.tsx          # Root layout & metadata
│   └── page.tsx            # Split-pane layout & section switcher
├── components/
│   ├── ExportButton.tsx    # PDF generation & post-export reset
│   ├── ImportResume.tsx    # Multi-format resume importer
│   ├── ResumeForm.tsx      # Reactive input fields wired to Zustand
│   └── ResumeTemplate.tsx  # Pure presentation A4 template
├── docs/                   # Implementation specifications & phase guides
├── lib/
│   └── documentParser.ts   # Client-side PDF, Word, and text parser
├── store/
│   └── useResumeStore.ts   # Zustand state store & actions
└── types/
    └── mammoth.d.ts        # TypeScript declarations
```

---

## 👤 Author

**Harshvardhan Singh Negi** ([@Harshvardhan00001](https://github.com/Harshvardhan00001))
