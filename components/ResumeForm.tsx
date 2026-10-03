"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  User,
  Mail,
  Phone,
  Globe,
  GitBranch,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  FileText,
} from "lucide-react";

export interface ResumeFormProps {
  onOpenImport?: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ onOpenImport }) => {
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
    resetStore,
    loadSampleData,
  } = useResumeStore();

  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Fast Actions */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Editor Inputs
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Live updates right preview as you type
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onOpenImport && (
              <button
                type="button"
                onClick={onOpenImport}
                className="text-xs font-semibold px-2.5 py-1.5 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                title="Import resume from file or text"
              >
                Import Resume
              </button>
            )}
            <button
              type="button"
              onClick={loadSampleData}
              className="text-xs font-medium px-2.5 py-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              title="Fill form with sample data"
            >
              Sample Data
            </button>
            <button
              type="button"
              onClick={resetStore}
              className="text-xs font-medium px-2.5 py-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex items-center gap-1"
              title="Clear all fields"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Personal Info */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          Personal Information
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              value={personalInfo.name}
              onChange={(e) => updateField("personalInfo", "name", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-gray-400" />
                Email
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={personalInfo.email}
                onChange={(e) => updateField("personalInfo", "email", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-gray-400" />
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={personalInfo.phone}
                onChange={(e) => updateField("personalInfo", "phone", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-gray-400" />
                LinkedIn / Website
              </label>
              <input
                type="text"
                placeholder="linkedin.com/in/janedoe"
                value={personalInfo.linkedin}
                onChange={(e) => updateField("personalInfo", "linkedin", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-gray-400" />
                GitHub / Portfolio
              </label>
              <input
                type="text"
                placeholder="github.com/janedoe"
                value={personalInfo.github}
                onChange={(e) => updateField("personalInfo", "github", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            Work Experience
          </h3>
          <button
            type="button"
            onClick={() => addExperience()}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Experience
          </button>
        </div>

        {experience.length === 0 ? (
          <div className="text-center py-6 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-xs text-gray-500">No experience entries added yet.</p>
            <button
              type="button"
              onClick={() => addExperience()}
              className="mt-2 text-xs text-blue-600 hover:underline font-medium"
            >
              + Add Work Experience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3 relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">
                    Position #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(item.id)}
                    className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Engineer"
                      value={item.role}
                      onChange={(e) =>
                        updateField("experience", item.id, { role: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tech Corp"
                      value={item.company}
                      onChange={(e) =>
                        updateField("experience", item.id, { company: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2022 - Present"
                    value={item.dates}
                    onChange={(e) =>
                      updateField("experience", item.id, { dates: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Key achievements, technologies used, responsibilities..."
                    value={item.description}
                    onChange={(e) =>
                      updateField("experience", item.id, { description: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            Education
          </h3>
          <button
            type="button"
            onClick={() => addEducation()}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Education
          </button>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-6 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-xs text-gray-500">No education entries added yet.</p>
            <button
              type="button"
              onClick={() => addEducation()}
              className="mt-2 text-xs text-blue-600 hover:underline font-medium"
            >
              + Add Education
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((item, index) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3 relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500">
                    Degree #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(item.id)}
                    className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                    title="Remove education"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Degree / Program
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B.S. in Computer Science"
                      value={item.degree}
                      onChange={(e) =>
                        updateField("education", item.id, { degree: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      School / University
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UC Berkeley"
                      value={item.school}
                      onChange={(e) =>
                        updateField("education", item.id, { school: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2016 - 2020"
                    value={item.dates}
                    onChange={(e) =>
                      updateField("education", item.id, { dates: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Skills */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-500" />
          Skills
        </h3>

        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter (e.g. TypeScript)..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </form>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded-md border border-gray-200"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                  title="Remove skill"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
