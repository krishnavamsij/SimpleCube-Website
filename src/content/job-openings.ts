export interface JobPosition {
  id: string;
  requestId?: string;
  title: string;
  location: string;
  type?: string;
  description?: string;
  jobDuties: string[];
  qualifications: {
    degree: string;
    experience: string;
    immediateJoinee?: boolean;
  };
  skillsRequired: string[];
  region?: string;
  howToApply?: string;
}

export const jobOpenings: JobPosition[] = [
  {
    id: "salesforce-developer",
    requestId: "12477",
    title: "Salesforce Developer",
    location: "San Antonio, TX",
    type: "Full-Time",
    description:
      "SimpleCube LLC, a San Antonio, TX based IT services firm, is recruiting for a Salesforce Developer. Salary ranges between $127,733.00 – $130,000.00/year. Equal Opportunity Employer.",
    jobDuties: [
      "Assist in the design, configuration, and development of Salesforce applications and basic custom solutions using Apex, Visualforce, Lightning Web Components (LWC), and standard Salesforce declarative tools under supervision.",
      "Support integration activities within Salesforce using built-in API features and configuration options following established guidelines.",
      "Help create and update automation processes using Flow Builder, Process Builder, and Approval Processes to streamline routine business functions.",
      "Perform day-to-day Salesforce administrative tasks, including user setup, roles, profiles, permission sets, and basic data management activities.",
      "Help generate dashboards and reports using standard Salesforce reporting tools or Einstein Analytics and ensure data accuracy and consistency in assigned areas.",
      "Participate in testing, deployment, and documentation activities during different stages of the Salesforce development lifecycle (SDLC).",
      "Support data quality, security, and compliance practices within Salesforce environments, following organizational policies and standards.",
      "Stay informed about new Salesforce and AI features introduced in platform updates and participate in team discussions about possible improvements.",
      "Provide basic user assistance and training materials under the direction of senior Salesforce team members.",
    ],
    qualifications: {
      degree: "Master's degree in CS, IT, Engineering, or related field",
      experience:
        "Travel and relocation to various unanticipated client locations throughout the United States may be required",
    },
    skillsRequired: [],
    howToApply: "Send resume to kvjadapolu@simplecube.co including JOB ID 12477",
    region: "us",
  },
  {
    id: "senior-salesforce-developer",
    requestId: "12478",
    title: "Senior Salesforce Developer",
    location: "San Antonio, TX",
    type: "Full-Time",
    description:
      "SimpleCube LLC, a San Antonio, TX based IT services firm, is recruiting for a Senior Salesforce Developer. Salary ranges between $148,866.00 – $150,000.00/year. Equal Opportunity Employer.",
    jobDuties: [
      "Design, configure, and develop Salesforce applications and basic custom solutions using Apex, Visualforce, Lightning Web Components (LWC), and standard Salesforce declarative tools under supervision.",
      "Support integration activities within Salesforce using built-in API features and configuration options following established guidelines.",
      "Create and update automation processes using Flow Builder, Process Builder, and Approval Processes to streamline routine business functions.",
      "Perform day-to-day Salesforce administrative tasks, including user setup, roles, profiles, permission sets, and basic data management activities.",
      "Generate dashboards and reports using standard Salesforce reporting tools or Einstein Analytics and ensure data accuracy and consistency in assigned areas.",
      "Participate in testing, deployment, and documentation activities during different stages of the Salesforce development lifecycle (SDLC).",
      "Support data quality, security, and compliance practices within Salesforce environments, following organizational policies and standards.",
      "Stay informed about new Salesforce and AI features introduced in platform updates and participate in team discussions about possible improvements.",
      "Provide user assistance and training materials under the direction of senior Salesforce team members.",
    ],
    qualifications: {
      degree:
        "Bachelor's degree in CS, IT, Engineering, or related field with at least 60 months (5 years) of experience",
      experience:
        "Travel and relocation to various unanticipated client locations throughout the United States may be required",
    },
    skillsRequired: [],
    howToApply: "Send resume to kvjadapolu@simplecube.co including JOB ID 12478",
    region: "us",
  },
];
