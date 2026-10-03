"use client";

import React from "react";
import { useReactToPrint } from "react-to-print";
import { useResumeStore } from "@/store/useResumeStore";
import { Download } from "lucide-react";

export interface ExportButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  contentRef,
  className = "",
}) => {
  const { personalInfo, resetStore } = useResumeStore();

  const handlePrint = useReactToPrint({
    contentRef: contentRef as React.RefObject<Element>,
    documentTitle: personalInfo.name
      ? `${personalInfo.name.trim().replace(/\s+/g, "_")}_Resume`
      : "Resume",
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          background: #ffffff !important;
        }
      }
    `,
    onAfterPrint: () => {
      // Clear all user session data immediately upon print completion
      resetStore();
    },
  });

  return (
    <button
      type="button"
      onClick={() => handlePrint()}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all cursor-pointer ${className}`}
      title="Export resume as PDF (clears data after download)"
    >
      <Download className="w-4 h-4" />
      <span>Export PDF</span>
    </button>
  );
};
