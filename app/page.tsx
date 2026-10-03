"use client";

import React, { useRef, useState } from "react";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumeTemplate } from "@/components/ResumeTemplate";
import { ExportButton } from "@/components/ExportButton";
import { ImportResume } from "@/components/ImportResume";
import { Edit3, Upload } from "lucide-react";

export default function Home() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "import">("edit");

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-gray-100 font-sans">
      {/* Left Column: Form Controls & Import Section (w-1/3, scrollable) */}
      <div className="w-full md:w-1/3 h-full overflow-y-auto bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Navigation Bar dividing the section */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 pt-4 pb-2">
          <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === "edit"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>1. Edit Inputs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("import")}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === "import"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>2. Import Resume</span>
            </button>
          </div>
        </div>

        {/* Content Pane for the Active Section */}
        <div className="p-6 flex-1">
          {activeTab === "edit" ? (
            <ResumeForm onOpenImport={() => setActiveTab("import")} />
          ) : (
            <ImportResume onImportSuccess={() => setActiveTab("edit")} />
          )}
        </div>
      </div>

      {/* Right Column: Live Preview (w-2/3, gray background, scrollable, centered) */}
      <div className="w-full md:w-2/3 h-full overflow-y-auto bg-gray-200 relative flex flex-col items-center">
        {/* Sticky top toolbar */}
        <header className="sticky top-0 z-30 w-full bg-gray-200/90 backdrop-blur-sm border-b border-gray-300/80 px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Live Preview (A4)
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              Auto-Synced
            </span>
          </div>
          <ExportButton contentRef={resumeRef} />
        </header>

        {/* Centered Resume Canvas */}
        <main className="py-8 px-4 flex justify-center w-full">
          <ResumeTemplate ref={resumeRef} />
        </main>
      </div>
    </div>
  );
}
