"use client";

import React, { useState } from "react";
import { ChevronDown, Briefcase } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface JobPosition {
  id: string;
  title: string;
  location: string;
  jobDuties: string[];
  qualifications: {
    degree: string;
    experience: string;
    immediateJoinee?: boolean;
  };
  skillsRequired: string[];
}

const jobOpenings: JobPosition[] = [
  {
    id: "senior-php-developer",
    title: "Senior PHP Developer",
    location: "Bangalore",
    jobDuties: [
      "Design, develop, and configure software programs based on the client specifications.",
      "Work with development teams and product managers to ideate software solutions.",
      "Design client-side and server-side architecture.",
      "Develop and manage well-functioning databases and applications.",
      "Write effective APIs.",
      "Perform testing and bug fixing. Develop web pages and client side validation by typescript tags.",
    ],
    qualifications: {
      degree: "BE/B.Tech/M.Tech/MCA/M.Sc. Computers",
      experience: "5 - 8 Years",
    },
    skillsRequired: [
      "Proficiency in Core PHP, and PHP based MVC frameworks (Yii/ Laravel)",
      "Development of PHP based web applications, APIs",
      "Strong knowledge of the common PHP or web server exploits and their solutions.",
      "Good understanding of web application development best practices, performance optimization etc.",
      "Experience in full stack technologies (HTML, CSS, JavaScript, Jquery)",
      "Knowledge of Server Management and familiar with Amazon Web Services",
      "Proficient to handle cloud based operations for server, DB (Rackspace, AWS).",
      "Able to work effectively on a team as well as individually",
    ],
  },
  {
    id: "senior-nodejs-developer",
    title: "Senior NodeJS Developer",
    location: "Bangalore",
    jobDuties: [
      "5+ years of recent related web application development experience with ReactJs and Node JS",
      "Web or mobile application development work experience using HTML5, CSS3, and JavaScript",
      "Hands on experience with AWS installation, Lamda functions / serverless technologies",
      "Ability and desire to learn and work with new languages and technologies as needed",
      "Mentor junior team members and help them with technical difficulties",
    ],
    qualifications: {
      degree: "Masters in Computer Applications or Bachelor's Degree in Computer Science Engineering",
      experience: "8 - 10 Years",
      immediateJoinee: true,
    },
    skillsRequired: [
      "Proficient in JavaScript, Node JS, Express JS",
      "Good Exposure in AWS Lambda, Server less, API Gateway, Dynamo DB",
      "Familiarity with HTML & CSS.",
      "Excellent verbal communication skills.",
      "Good problem-solving skills.",
      "Able to work in a team as well as individually",
      "Good Analytical skills.",
    ],
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Header */}
        <header className="relative h-72 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('/images/2019/04/contact-classic.jpg')"}}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
              <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                Careers
              </h1>
                          </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
            {/* Region Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                India
              </h2>
              <div className="h-1 w-12 bg-blue-600 mt-3 rounded-full"></div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Job Header */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full px-6 py-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          📍 {job.location}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        expandedJob === job.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Job Details - Expandable */}
                  {expandedJob === job.id && (
                    <div className="bg-white px-6 py-8 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Job Duties */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                            Job Duties
                          </h4>
                          <ul className="space-y-3">
                            {job.jobDuties.map((duty, idx) => (
                              <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-none"></span>
                                <span>{duty}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Application Info */}
                          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-slate-700 mb-2">
                              <strong>Apply by sending your resume to:</strong>
                            </p>
                            <p className="text-sm">
                              <a
                                href="mailto:hr@hyniva.com"
                                className="text-blue-600 font-semibold hover:text-blue-700 underline"
                              >
                                hr@hyniva.com
                              </a>
                            </p>
                            <p className="text-xs text-slate-600 mt-2">
                              Must reference "{job.title}" when applying.
                            </p>
                          </div>
                        </div>

                        {/* Right Column - Requirements & Skills */}
                        <div>
                          {/* Candidate Requirements */}
                          <div className="mb-8">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                              Requirements
                            </h4>
                            <ul className="space-y-3">
                              <li className="flex gap-3 text-sm text-slate-700">
                                <span className="flex-shrink-0 font-semibold text-blue-600 w-24">Qualification:</span>
                                <span>{job.qualifications.degree}</span>
                              </li>
                              <li className="flex gap-3 text-sm text-slate-700">
                                <span className="flex-shrink-0 font-semibold text-blue-600 w-24">Experience:</span>
                                <span>{job.qualifications.experience}</span>
                              </li>
                              {job.qualifications.immediateJoinee && (
                                <li className="flex gap-3 text-sm">
                                  <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    ✓ Immediate Joinee
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Skills Required */}
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b-2 border-blue-600">
                              Required Skills
                            </h4>
                            <ul className="space-y-2.5">
                              {job.skillsRequired.map((skill, idx) => (
                                <li key={idx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-none"></span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

                      </div>
        </section>
      </main>
      <Footer />
    </>
  );
}