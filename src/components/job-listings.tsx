"use client";

import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import type { JobPosition } from "@/content/job-openings";

type JobListingsProps = {
  jobs: JobPosition[];
  expandedJob: string | null;
  onToggleJob: (jobId: string) => void;
  onApply: (jobTitle: string) => void;
  showHeading?: boolean;
};

export function JobListings({
  jobs,
  expandedJob,
  onToggleJob,
  onApply,
  showHeading = true,
}: JobListingsProps) {
  return (
    <div>
      {showHeading && (
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2F52] mb-6">
          Current Openings
        </h2>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => onToggleJob(job.id)}
              className="w-full px-4 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-[#0A2F52] mb-3 group-hover:text-[#1e6fff] transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {job.requestId && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e6fff]/[0.05] text-[#1e6fff]">
                      <span className="font-semibold">Job ID:</span> {job.requestId}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1e6fff]/[0.05] text-[#1e6fff]">
                    <Briefcase className="w-3 h-3" />
                    {job.type || "Full-Time"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  expandedJob === job.id
                    ? "bg-[#1e6fff] text-white shadow-lg shadow-[#1e6fff]/20"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-500 ${
                    expandedJob === job.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {expandedJob === job.id && (
              <div className="bg-white px-4 sm:px-8 py-6 sm:py-8 border-t border-gray-200">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#135498]">
                      About the Role
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {job.description ||
                        "We are looking for talented professionals to join our team. This role offers excellent growth opportunities and the chance to work on exciting projects."}
                    </p>
                  </div>

                  {job.jobDuties.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#135498]">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {job.jobDuties.map((duty, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#135498] mt-2 flex-none" />
                            <span>{duty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#135498]">
                      Requirements
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex gap-4 text-sm text-slate-700 items-baseline">
                        <span className="flex-shrink-0 font-bold text-[#1e6fff] w-28 uppercase tracking-wide text-[10px]">
                          Qualification
                        </span>
                        <span className="font-medium text-slate-900">{job.qualifications.degree}</span>
                      </li>
                      <li className="flex gap-4 text-sm text-slate-700 items-baseline">
                        <span className="flex-shrink-0 font-bold text-[#1e6fff] w-28 uppercase tracking-wide text-[10px]">
                          Experience
                        </span>
                        <span className="font-medium text-slate-900">{job.qualifications.experience}</span>
                      </li>
                      {job.qualifications.immediateJoinee && (
                        <li className="pt-2">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Immediate Hiring
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {job.skillsRequired.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#135498]">
                        Required Skills
                      </h4>
                      <ul className="space-y-2.5">
                        {job.skillsRequired.map((skill, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#135498] mt-2 flex-none" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.howToApply && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-[#135498]">
                        Application Requirements
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3 font-semibold text-slate-800">
                        Please share suitable profiles with:
                      </p>
                      <ul className="space-y-2">
                        {job.howToApply.split("\n").map((req, idx) => (
                          <li key={idx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#135498] mt-2 flex-none" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-8 mt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onApply(job.title)}
                      className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#1e6fff] text-white font-bold rounded-xl hover:bg-[#1a5fe0] transition-all duration-300 shadow-lg shadow-[#1e6fff]/20 hover:shadow-[#1e6fff]/30 hover:-translate-y-0.5"
                    >
                      Apply for this Position
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
