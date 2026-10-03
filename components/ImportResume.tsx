"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  extractTextFromDocx,
  extractTextFromPdf,
  parseRawResumeText,
} from "@/lib/documentParser";
import {
  Upload,
  FileCode,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
  Sparkles,
  Loader2,
  FileType,
} from "lucide-react";

interface ImportResumeProps {
  onImportSuccess?: () => void;
}

export const ImportResume: React.FC<ImportResumeProps> = ({ onImportSuccess }) => {
  const { importResume, personalInfo, experience, education, skills } =
    useResumeStore();

  const [rawInput, setRawInput] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleProcessImport = () => {
    try {
      setStatusMessage(null);
      const parsedData = parseRawResumeText(rawInput);
      importResume(parsedData);
      setStatusMessage({
        type: "success",
        text: `Resume imported successfully! All fields have been loaded into the text inputs.`,
      });

      if (onImportSuccess) {
        setTimeout(() => {
          onImportSuccess();
        }, 1200);
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to parse resume data. Check the format.",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      let extractedText = "";
      const lowerName = file.name.toLowerCase();

      if (lowerName.endsWith(".pdf")) {
        extractedText = await extractTextFromPdf(file);
      } else if (lowerName.endsWith(".docx")) {
        extractedText = await extractTextFromDocx(file);
      } else if (lowerName.endsWith(".json") || lowerName.endsWith(".txt")) {
        extractedText = await file.text();
      } else {
        // Fallback text read
        extractedText = await file.text();
      }

      setRawInput(extractedText);
      const parsedData = parseRawResumeText(extractedText);
      importResume(parsedData);

      setStatusMessage({
        type: "success",
        text: `Successfully extracted from "${file.name}"! Switching to text editor to customize details...`,
      });

      if (onImportSuccess) {
        setTimeout(() => {
          onImportSuccess();
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: `Error parsing "${file.name}": ${err.message || "Could not extract text"}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportJSON = () => {
    const dataToExport = {
      personalInfo,
      experience,
      education,
      skills,
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = personalInfo.name
      ? `${personalInfo.name.replace(/\s+/g, "_")}_resume.json`
      : "resume_backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadExampleJSON = () => {
    const example = {
      personalInfo: {
        name: "Samantha Wright",
        email: "samantha.wright@example.com",
        phone: "+1 (555) 987-6543",
        linkedin: "linkedin.com/in/samanthawright",
        github: "github.com/swright-dev",
      },
      experience: [
        {
          id: "exp-imported-1",
          company: "CloudScale Systems",
          role: "Full Stack Engineer",
          dates: "2023 - Present",
          description:
            "Implemented real-time client-side dashboards using Next.js and Tailwind CSS. Reduced data transfer by 40% with client-side caching.",
        },
      ],
      education: [
        {
          id: "edu-imported-1",
          school: "Stanford University",
          degree: "B.S. in Software Engineering",
          dates: "2019 - 2023",
        },
      ],
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    };
    setRawInput(JSON.stringify(example, null, 2));
    setFileName("sample_resume.json");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          Import Resume
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Import your resume from PDF, Word (.docx), JSON, or plain text. The extracted
          data will populate the text inputs so you can update anything.
        </p>

        {/* Accepted Formats Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
            <FileType className="w-3 h-3" /> PDF (.pdf)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <FileType className="w-3 h-3" /> Word (.docx)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileCode className="w-3 h-3" /> JSON (.json)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-50 text-gray-700 border border-gray-200">
            <FileText className="w-3 h-3" /> Text (.txt)
          </span>
        </div>
      </div>

      {/* File Upload Drop Area */}
      <div className="border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-lg p-6 text-center transition-colors bg-gray-50/50 relative">
        <input
          type="file"
          id="resume-file-input"
          accept=".pdf,.docx,.json,.txt"
          onChange={handleFileUpload}
          disabled={isProcessing}
          className="hidden"
        />
        <label
          htmlFor="resume-file-input"
          className={`flex flex-col items-center justify-center space-y-2 ${
            isProcessing ? "opacity-50 cursor-wait" : "cursor-pointer"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              {isProcessing
                ? "Extracting resume data client-side..."
                : "Choose PDF, Word (.docx), or JSON file"}
            </span>
            <span className="text-xs text-gray-500 block mt-0.5">
              100% private & client-side extraction in your browser
            </span>
          </div>
          {fileName && !isProcessing && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 mt-2 shadow-xs">
              <FileCode className="w-3.5 h-3.5 text-indigo-500" />
              {fileName}
            </span>
          )}
        </label>
      </div>

      {/* Direct Text / JSON Paste Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            Or Paste Resume Text / JSON
          </label>
          <button
            type="button"
            onClick={loadExampleJSON}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Insert Sample JSON
          </button>
        </div>

        <textarea
          rows={6}
          placeholder={`Paste text or JSON here. Example:
John Doe
john@example.com | +1 555-123-4567 | linkedin.com/in/johndoe
Skills: React, Next.js, TypeScript, Tailwind`}
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          disabled={isProcessing}
          className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleProcessImport}
          disabled={isProcessing || !rawInput.trim()}
          className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Parse & Load into Inputs</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleExportJSON}
          className="py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          title="Download current resume data as a JSON backup file"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Save as JSON</span>
        </button>
      </div>

      {/* Feedback Message */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
};
