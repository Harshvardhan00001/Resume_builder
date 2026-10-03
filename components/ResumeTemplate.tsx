"use client";

import React, { forwardRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Mail, Phone, Globe, GitBranch } from "lucide-react";

export interface ResumeTemplateProps {
  className?: string;
}

export const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ className = "" }, ref) => {
    // Pure Zustand store consumption - ZERO local useState
    const { personalInfo, experience, education, skills } = useResumeStore();

    const hasContact =
      Boolean(personalInfo.email) ||
      Boolean(personalInfo.phone) ||
      Boolean(personalInfo.linkedin) ||
      Boolean(personalInfo.github);

    const hasExperience = experience.some(
      (exp) => exp.company || exp.role || exp.description || exp.dates
    );

    const hasEducation = education.some(
      (edu) => edu.school || edu.degree || edu.dates
    );

    const hasSkills = skills.length > 0;

    return (
      <div
        ref={ref}
        className={`w-[210mm] min-h-[297mm] p-10 bg-white text-black shadow-lg mx-auto box-border font-sans print:shadow-none print:w-full print:min-h-0 print:p-8 ${className}`}
        style={{ boxSizing: "border-box" }}
      >
        {/* Header Section */}
        {personalInfo.name && (
          <header className="border-b-2 border-gray-900 pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900">
              {personalInfo.name}
            </h1>
            {hasContact && (
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-gray-700">
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-600" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-600" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-gray-600" />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-gray-600" />
                    <span>{personalInfo.github}</span>
                  </div>
                )}
              </div>
            )}
          </header>
        )}

        {/* Work Experience Section */}
        {hasExperience && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((item) => {
                if (!item.company && !item.role && !item.description && !item.dates) {
                  return null;
                }
                return (
                  <div key={item.id} className="text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-gray-900">
                        {item.role || "Role"}
                        {item.company && (
                          <span className="font-normal text-gray-600">
                            {" "}
                            — {item.company}
                          </span>
                        )}
                      </span>
                      {item.dates && (
                        <span className="text-xs text-gray-500 font-medium">
                          {item.dates}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-1.5 text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education Section */}
        {hasEducation && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((item) => {
                if (!item.school && !item.degree && !item.dates) {
                  return null;
                }
                return (
                  <div key={item.id} className="text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-gray-900">
                        {item.degree || "Degree"}
                        {item.school && (
                          <span className="font-normal text-gray-600">
                            {" "}
                            — {item.school}
                          </span>
                        )}
                      </span>
                      {item.dates && (
                        <span className="text-xs text-gray-500 font-medium">
                          {item.dates}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {hasSkills && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-1 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-0.5 text-xs bg-gray-100 text-gray-800 rounded border border-gray-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate";
