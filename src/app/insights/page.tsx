"use client";
import React from "react";
import { ArrowLeft, BadgeInfo, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import DetectedIssues from "@/app/insights/components/detected-issues";
import { LocalStorageHelper } from "@utils/local.storage";
import { IWCAGData } from "@/interfaces/wcag.interface";

const Page = () => {
  const router = useRouter();
  const getAnalytics = () =>
      LocalStorageHelper.get("wcag_analysis") as IWCAGData;

  const handleBackButtonClick = () => {
    LocalStorageHelper.remove("wcag_analysis");
    router.back();
  };

  return (
      <div className="mx-auto my-5 max-w-4xl px-4 py-2">
        <div
            className="flex w-fit cursor-pointer items-center gap-x-2 text-slate-500 focus:ring-2 focus:ring-blue-500"
            role="button"
            tabIndex={0}
            onClick={handleBackButtonClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleBackButtonClick();
            }}
        >
          <ArrowLeft className="size-4 text-slate-700"/>
          <span>Back</span>
        </div>

        <h1 className="text-left text-2xl font-bold leading-8 text-slate-800">
          Insights
        </h1>

        <section
            className="mt-4 grid w-full grid-cols-1 gap-2 border-b border-gray-200 pb-5 lg:grid-cols-2"
            aria-labelledby="wcag-metrics"
        >
          <h2 id="wcag-metrics" className="sr-only">WCAG Analysis Metrics</h2>

          {/* Score Card */}
          <div
              role="group"
              aria-labelledby="score-title"
              aria-describedby="score-value"
              className="flex w-full cursor-pointer items-center rounded-lg border bg-white p-6 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") alert(`Accessibility Score: ${getAnalytics().accessibility_score}%`);
              }}
          >
            <div className="flex flex-1 flex-col gap-1">
              <div id="score-title" className="text-xs font-medium uppercase text-slate-500">
                Scores
              </div>
              <div id="score-value" className="text-xl font-medium text-slate-800">
                {`${getAnalytics().accessibility_score}%`}
              </div>
            </div>
            <div>
              <Percent className="size-4 text-slate-500" strokeWidth={1.5}/>
            </div>
          </div>

          {/* Issues Card */}
          <div
              role="group"
              aria-labelledby="issues-title"
              aria-describedby="issues-value"
              className="flex w-full cursor-pointer items-center rounded-lg border bg-white p-6 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") alert(`Detected Issues: ${getAnalytics().issues.length}`);
              }}
          >
            <div className="flex flex-1 flex-col gap-1">
              <div id="issues-title" className="text-xs font-medium uppercase text-slate-500">
                Issues
              </div>
              <div id="issues-value" className="text-xl font-medium text-slate-800">
                {getAnalytics().issues.length}
              </div>
            </div>
            <div>
              <BadgeInfo className="size-4 text-slate-500" strokeWidth={1.5}/>
            </div>
          </div>
        </section>

        <section className="my-5" aria-labelledby="issue-highlights">
          <h2 id="issue-highlights" className="text-left text-2xl font-bold leading-8 text-slate-800">
            Visual Highlights of Detected Issues
          </h2>
          <DetectedIssues issues={getAnalytics().issues}/>
        </section>
      </div>
  );
};

export default Page;
