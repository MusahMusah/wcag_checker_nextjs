import React, { useState } from "react";
import { Clock, ChevronDown, Info } from "lucide-react";
import { IIssue } from "@/interfaces/wcag.interface";

type DetectedIssuesProps = {
  issues: IIssue[];
};

const DetectedIssues = ({ issues }: DetectedIssuesProps) => {
  const [openIssues, setOpenIssues] = useState<{ [key: number]: boolean }>(
    Object.fromEntries(issues.map((_, index) => [index, true]))
  );

  const toggleIssue = (index: number) => {
    setOpenIssues((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-4xl bg-white font-sans text-[13px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
        <h2 className="font-medium">Breadcrumbs</h2>
        <div
          className="flex cursor-pointer items-center gap-2"
          aria-live="polite"
        >
          <Clock size={16} />
          {new Date().toLocaleString()}
        </div>
      </div>

      {/* Issues List */}
      {issues.map((issue: IIssue, index: number) => (
        <div key={index} className="border-b border-gray-200">
          <div className="flex items-center gap-2 px-4 py-2">
            <Info className="text-gray-700" size={16} />
            <span className="font-medium">{issue.issue}</span>
          </div>

          <div className="px-10 pb-2">
            <div
              className="mb1 flex cursor-pointer items-center gap-1 bg-gray-100 focus:ring-2 focus:ring-blue-500"
              role="button"
              tabIndex={0}
              aria-expanded={openIssues[index]}
              onClick={() => toggleIssue(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleIssue(index);
              }}
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${openIssues[index] ? "rotate-180" : ""}`}
              />
              <span className="text-gray-700">{`{`}</span>
            </div>

            {openIssues[index] && (
              <div className="bg-gray-100 font-mono text-[13px]">
                <div className="pl-4">
                  <span className="text-red-500">element</span>: {issue.element}
                </div>
                <div className="pl-4">
                  <span className="text-red-500">suggestion</span>:{" "}
                  {issue.suggestion}
                </div>
                <div className="text-gray-700">{`}`}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetectedIssues;
