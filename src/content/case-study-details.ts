export interface CaseStudyMetric {
    icon: string;
    value: string;
    label: string;
    sub?: string;
}

export interface CaseStudySection {
    id: string;
    title: string;
    type: 'text' | 'approach-list' | 'feature-grid' | 'impact-strip' | 'outcome-list' | 'future-tags';
    content: any;
}

export interface CaseStudyDetail {
    slug: string;
    eyebrow: string;
    title: string;
    summary: string;
    metrics: CaseStudyMetric[];
    sections: CaseStudySection[];
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
    "autonomous-lending-experiences": {
        "slug": "autonomous-lending-experiences",
        "eyebrow": "AI-Driven Lending & Agentforce",
        "title": "Autonomous Lending Experience with<br>\n      <em>FinXServe and Agentforce</em>",
        "summary": "Built an AI-powered lending concierge to deliver instant loan processing,\n      streamlining the entire lending lifecycle from application to approval.",
        "metrics": [
            {
                "icon": "🚀",
                "value": "80%",
                "label": "Faster Time-to-Market",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "70%",
                "label": "Faster Loan Processing",
                "sub": ""
            },
            {
                "icon": "💰",
                "value": "50%",
                "label": "Lower Cost of Ownership",
                "sub": ""
            },
            {
                "icon": "🕐",
                "value": "24/7",
                "label": "Always-On Lending",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A leading U.S.-based credit union wanted to deliver a 24/7 digital lending experience without increasing operational headcount or compromising compliance.</p>\n        <p>Despite investing in Salesforce Financial Services Cloud (FSC) and digital channels, loan origination still relied on manual processes, static forms, and agent-assisted conversations. Borrowers often had to switch between web, mobile, and contact center channels to complete applications or check status updates.</p>\n        <p>The institution needed a secure, scalable digital assistant capable of guiding borrowers from initial loan inquiry to application completion within a single seamless journey, while maintaining strict governance and regulatory controls.</p>"
            },
            {
                "id": "solution",
                "title": "Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva implemented Salesforce Agentforce natively within the FinXServe platform, enabling a conversational lending experience orchestrated on Salesforce Financial Services Cloud (FSC).</p>\n        <p>The AI-powered lending assistant guides borrowers through the full loan lifecycle — from product discovery to application completion — within a single conversational interaction.</p>\n        <p>Key capabilities include:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Guided loan product discovery and application initiation",
                            "desc": ""
                        },
                        {
                            "num": "2",
                            "title": "Secure borrower authentication through OTP-based identity verification",
                            "desc": ""
                        },
                        {
                            "num": "3",
                            "title": "Automatic retrieval and continuation of existing loan applications",
                            "desc": ""
                        },
                        {
                            "num": "4",
                            "title": "Conversational data capture for borrower details and required consents",
                            "desc": ""
                        },
                        {
                            "num": "5",
                            "title": "Real-time prequalified loan offers with rates, terms, and payment estimates",
                            "desc": ""
                        },
                        {
                            "num": "6",
                            "title": "Application completion including employment details, autopay setup, and funding selection",
                            "desc": ""
                        },
                        {
                            "num": "7",
                            "title": "Seamless escalation to loan officers when human expertise is required",
                            "desc": ""
                        }
                    ],
                    "footer": "<p>Unlike traditional chatbots that primarily answer questions, this AI-powered lending concierge executes real lending workflows, enabling borrowers to move from intent to prequalified offer within a single guided journey.</p>"
                }
            },
            {
                "id": "implementation",
                "title": "Implementation Approach",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva delivered the solution using a Salesforce-native, low-code/no-code architecture built on FinXServe's experience orchestration framework.</p>\n        <p>Rather than replacing existing banking systems, FinXServe acts as a digital experience layer that sits above core banking and underwriting platforms, orchestrating lending journeys while preserving existing systems of record.</p>\n        <p>Key elements of the approach included:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Low-Code / No-Code Agent Configuration",
                            "desc": "Agentforce capabilities were configured using Salesforce Agent Builder and declarative tools, enabling conversational workflows without heavy custom development."
                        },
                        {
                            "num": "2",
                            "title": "Platform-Native Lending Orchestration",
                            "desc": "FinXServe's managed package architecture and extended FSC data model enable lending journeys to be configured and reused across products."
                        },
                        {
                            "num": "3",
                            "title": "API-Based System Integration",
                            "desc": "Through FinXServe's connector framework, the agent integrates with loan origination systems, credit bureaus, and underwriting platforms in real time."
                        },
                        {
                            "num": "4",
                            "title": "Compliance-First Design",
                            "desc": "Verification gates, consent capture, and audit logging are embedded directly into the lending workflow to ensure regulatory compliance."
                        }
                    ],
                    "footer": "<p>This architecture enables financial institutions to modernize digital lending experiences rapidly while keeping their trusted core systems intact.</p>"
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "outcome-list",
                "content": {
                    "body": "<p>The shift from form-based lending to autonomous conversational lending delivered measurable results:</p>",
                    "items": [
                        "Up to 80% faster time-to-market for new digital lending experiences",
                        "Up to 70% faster product launches using reusable platform components",
                        "Up to 50% lower cost of ownership through FSC-native architecture",
                        "Reduced borrower friction across digital channels",
                        "24/7 loan application capability without increasing staffing"
                    ],
                    "footer": "<p>Borrowers can now move from loan inquiry to prequalified offer within a single guided interaction, significantly improving the digital borrowing experience.</p>"
                }
            },
            {
                "id": "future",
                "title": "Road Ahead",
                "type": "future-tags",
                "content": {
                    "body": "<p>The Agentforce and FinXServe implementation provides a scalable foundation for expanding AI-driven banking experiences. By combining Agentforce's autonomous intelligence with FinXServe's experience orchestration layer, the credit union is positioned to continuously evolve its digital banking capabilities while maintaining operational control and regulatory compliance.</p>\n        <p>Future opportunities include extending conversational AI capabilities to:</p>",
                    "items": [
                        "Account opening and onboarding",
                        "Card servicing and dispute management",
                        "Cross-sell and product recommendations",
                        "Member servicing and collections workflows"
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>By combining Agentforce's autonomous intelligence with FinXServe's experience orchestration layer, the credit union is positioned to continuously evolve its digital banking capabilities while maintaining operational control and regulatory compliance.</p>\n      </div>"
                }
            }
        ]
    },
    "instant-loan-processing": {
        "slug": "instant-loan-processing",
        "eyebrow": "Agentforce Document Intelligence",
        "title": "Accelerate Loan Processing with<br>\n      <em>Agentforce-Powered Document Intelligence</em>",
        "summary": "Built an AI-enabled loan processing engine that automates document extraction, validation,\n      and decision workflows to improve lending efficiency.",
        "metrics": [
            {
                "icon": "📉",
                "value": "70%",
                "label": "Reduction in Manual Reviews",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "< 2 min",
                "label": "Application Completion",
                "sub": ""
            },
            {
                "icon": "✅",
                "value": "5-Step",
                "label": "Automated Verification",
                "sub": ""
            },
            {
                "icon": "🔄",
                "value": "Real-Time",
                "label": "Data Validation",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>Banks and Credit Unions are under pressure to deliver real-time digital lending experiences. Customers expect to apply for a loan as easily as sending a message — from any device, at any time.</p>\n        <p>But document processing remains the bottleneck.</p>\n        <p>During onboarding, customers upload identity documents, income proofs, and financial records in various formats — mobile photos, scanned PDFs, low-light images, rotated files, or partially visible documents.</p>\n        <p>Traditional OCR tools struggle with layout variations and inconsistent image quality. They often misread critical fields or cannot confidently validate extracted data against application records in real time. As a result, operations teams must manually review identity attributes, delaying loan approvals and increasing processing costs.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>FinXServe is Hyniva's Salesforce-native digital banking experience platform that sits as an intelligent experience layer above core banking and underwriting systems. It enables Banks and Credit Unions to modernize lending journeys without replacing their existing core, unifying application intake, document processing, validation, and decisioning into a single, real-time workflow.</p>\n        <p>Within this framework, FinXServe integrates Salesforce Agentforce as its AI-powered document recognition engine embedded directly into the digital lending journey.</p>\n        <p>When a customer uploads a document:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Automatic Document Identification",
                            "desc": "AI vision models detect the document type (e.g., driving license, passport)."
                        },
                        {
                            "num": "2",
                            "title": "Intelligent Field Extraction",
                            "desc": "Key identity attributes — first name, last name, date of birth, address, and document number — are extracted using advanced computer vision and language models."
                        },
                        {
                            "num": "3",
                            "title": "Real-Time Data Validation",
                            "desc": "Extracted values are instantly compared with loan application records inside FinXServe."
                        },
                        {
                            "num": "4",
                            "title": "Straight-Through Verification",
                            "desc": "If the extracted values match the application data, the document is automatically verified. Discrepancies are flagged in an automated review panel with clear match/mismatch indicators."
                        },
                        {
                            "num": "5",
                            "title": "Conversational Exception Handling",
                            "desc": "Agentforce's AI chatbot guides customers to re-upload clearer images, confirm updated information, and correct mismatched fields in real time."
                        }
                    ],
                    "footer": "<p>Most documents move through straight-through processing, while edge cases are intelligently managed — without slowing the entire workflow.</p>"
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "outcome-list",
                "content": {
                    "body": "<p>With AI-driven document intelligence embedded into FinXServe:</p>",
                    "items": [
                        "Up to 70% reduction in manual document reviews",
                        "Significant acceleration in identity verification",
                        "Faster loan approvals and higher conversion rates",
                        "Improved compliance and reduced fraud risk",
                        "Lower operational cost through automation"
                    ],
                    "footer": "<p>Most importantly, customers can complete a digital loan application in under 2 minutes, with immediate validation feedback and minimal friction.</p>\n        <p>This transforms lending from a document-heavy workflow into a real-time digital experience.</p>"
                }
            },
            {
                "id": "future",
                "title": "The Road Ahead",
                "type": "text",
                "content": "<p>FinXServe is expanding its AI-powered document intelligence beyond identity verification to include income and financial documents such as W2 forms, pay stubs, bank statements, and proof-of-address records. The platform is introducing cross-document consistency checks to validate customer information across multiple uploads, ensuring higher data reliability and stronger fraud detection.</p>\n        <p>In parallel, AI-driven fraud and risk scoring will combine extracted document insights with application data to identify potential risks earlier in the onboarding journey. Continuous model learning from agent and customer corrections will further enhance extraction accuracy over time.</p>\n        <p>Together, these advancements position FinXServe as a truly AI-first digital lending platform — delivering faster decisions, stronger compliance, scalable operations, and intelligent growth for modern financial institutions.</p>"
            }
        ]
    },
    "intelligent-ivr-self-service": {
        "slug": "intelligent-ivr-self-service",
        "eyebrow": "Contact Center & IVR",
        "title": "Modernizing Contact Centers with<br>\n      <em>Intelligent IVR Self-Service</em>",
        "summary": "Streamlined IVR and routing systems to reduce call complexity, improve response times,\n      and offload routine queries from agents.",
        "metrics": [
            {
                "icon": "⏱️",
                "value": "1.5 min",
                "label": "Reduced Handle Time",
                "sub": ""
            },
            {
                "icon": "🔀",
                "value": "65%",
                "label": "Routing Simplification",
                "sub": ""
            },
            {
                "icon": "📞",
                "value": "30%",
                "label": "Calls Optimized",
                "sub": ""
            },
            {
                "icon": "🔒",
                "value": "3FA",
                "label": "Secure Verification",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A leading U.S.-based wealth management firm sought to modernize its contact center as a large share of inbound volume consisted of routine service requests. Nearly 60% of calls were suitable for self-service, yet a highly fragmented routing model with 50+ queues led to misrouted calls, longer wait times, and inefficient use of agent capacity. The firm required a secure, scalable IVR solution to streamline routing, increase self-service adoption, and enable agents to focus on complex, high-value interactions.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "text",
                "content": "<p>Hyniva implemented a modern IVR self-service solution focused on security, simplicity, and scalability, delivered through a phased, risk-minimized approach. The engagement began with a detailed analysis of historical call logs to identify high-frequency, simple-service requests and define optimal IVR workflows.</p>\n        <p>Customer-friendly IVR scripts and menu structures were designed to minimize steps and provide clear guidance throughout the self-service journey, built on the firm's Genesys contact center platform to enable scalable flow orchestration and intelligent routing. Strong authentication was embedded using dual-factor verification and voice-based triple-factor authentication, validated through a controlled pilot with a limited user group.</p>\n        <p>Self-service capabilities included account balance checks, document notifications, and work item status tracking. Call routing was streamlined by consolidating 50+ queues into 18 dedicated sales and service queues, significantly reducing routing complexity and improving call flow. Robust exception handling ensured seamless escalation to live agents in cases of authentication failure or system exceptions.</p>\n        <p>To support continuous improvement, performance tracking and analytics were built into the solution, enabling real-time monitoring of IVR containment, authentication success rates, call volume optimization, and customer satisfaction. Insights from the pilot and ongoing metrics informed iterative refinements to workflows, authentication logic, exception handling, and routing prior to and after full deployment.</p>"
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The contact center now operates with greater predictability, speed, and control. Customer demand is handled more evenly across self-service and assisted channels, reducing pressure on agents during peak periods while improving overall service responsiveness. Security is embedded seamlessly into customer interactions, and operational visibility enables teams to actively manage performance rather than react to issues.</p>",
                    "items": [
                        {
                            "value": "1.5 min",
                            "label": "Reduced Handle Time",
                            "desc": "Average Call Handling Time (AHT) reduced by 1.5 minutes"
                        },
                        {
                            "value": "45 sec",
                            "label": "Faster Answer Speed",
                            "desc": "Average speed of answer (ASA) increased by 45 seconds"
                        },
                        {
                            "value": "65%",
                            "label": "Routing Simplification",
                            "desc": "Reduced routing complexity by streamlining fragmented routing"
                        },
                        {
                            "value": "30%",
                            "label": "Calls Optimized",
                            "desc": "10% fully contained, 20% partially contained"
                        },
                        {
                            "value": "2FA/3FA",
                            "label": "Secure Verification",
                            "desc": "Strengthened access security through multi-layer authentication"
                        }
                    ]
                }
            },
            {
                "id": "future",
                "title": "Road Ahead",
                "type": "text",
                "content": "<p>With a scalable IVR foundation in place, the firm is positioned to continuously expand and refine self-service capabilities with minimal effort. The modular design allows new options to be introduced, reordered, or enhanced quickly, enabling the contact center to adapt to evolving customer needs without additional development complexity.</p>\n        <p>Built-in analytics will guide the next phase of optimization by highlighting usage patterns, drop-offs, and containment opportunities. Based on customer feedback and insights, the firm plans to advance toward an IVR 2.0 roadmap — introducing deeper personalization, expanded workflows, and proactive customer messaging — while maintaining strong authentication and seamless agent escalation.</p>"
            }
        ]
    },
    "autonomous-freight-operations": {
        "slug": "autonomous-freight-operations",
        "eyebrow": "Logistics & GenAI Automation",
        "title": "Autonomous Freight Operations<br>\n      <em>with GenAI</em>",
        "summary": "Deployed a GenAI-powered solution to automate freight load creation, enabling near-instant\n      processing, significant cost reduction, and 24/7 autonomous operations.",
        "metrics": [
            {
                "icon": "🚀",
                "value": "98%",
                "label": "Faster Load Creation",
                "sub": ""
            },
            {
                "icon": "💰",
                "value": "99.5%",
                "label": "Cost Reduction",
                "sub": ""
            },
            {
                "icon": "🎯",
                "value": "99.6%",
                "label": "Accuracy",
                "sub": ""
            },
            {
                "icon": "🕐",
                "value": "24/7",
                "label": "Autonomous Processing",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A leading North American logistics provider faced growing operational pressure as shipment volumes surged. While their TMS platform was robust, the load creation process remained manual — requiring dispatchers to extract and input data from rate confirmation documents. As volumes increased, the lead time before a dispatcher could even begin processing a shipment order grew significantly, creating bottlenecks in the order-to-dispatch cycle. Besides delaying load creation, this added strain to back-office teams and impacted fulfillment speed.</p>",
                    "items": [
                        {
                            "icon": "⏱️",
                            "title": "Time-Intensive Workflow",
                            "text": "Creating a single load entry took 15–20 minutes, particularly for complex or multi-page documents."
                        },
                        {
                            "icon": "⚠️",
                            "title": "Frequent Data Entry Errors",
                            "text": "Typos, missing fields, and interpretation mistakes led to incorrect load data, billing issues, and rework."
                        },
                        {
                            "icon": "🔄",
                            "title": "Inconsistent Processing",
                            "text": "Different planners interpreted rate confirmations differently, resulting in inconsistencies across entries."
                        },
                        {
                            "icon": "📦",
                            "title": "Volume-Based Bottlenecks",
                            "text": "Manual processing limited the team's ability to keep up with increased load volumes during peak times, leading to backlogs that delayed dispatch and carrier assignments."
                        },
                        {
                            "icon": "🕐",
                            "title": "Increased Pre-Processing Lead Time",
                            "text": "With high order volumes and limited staff, dispatchers experienced growing delays just to access and queue up orders, increasing unprocessed shipments."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>The lack of automation slowed operations, increased errors, and drove up costs while causing inconsistent shipment records. The company needed a solution that could standardize and accelerate load creation — without adding headcount or compromising accuracy.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>To address these challenges, Hyniva designed and deployed Autonomous Document Intelligence Agent — built specifically to transform how load information is extracted and entered into the TMS. This next-gen solution automates the extraction of shipment data from pager invoices and unstructured documents, instantly converting them into actionable TMS records. By eliminating manual data entry, it accelerates turnaround times, minimizes errors, and empowers teams to focus on strategic, value-driven logistics planning.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Versatile File Handling",
                            "desc": "AI Agent intelligently extracts data from PDFs, images, and handwritten documents with seamless precision."
                        },
                        {
                            "num": "2",
                            "title": "AI-Driven Data Extraction",
                            "desc": "The GenAI engine identifies and extracts 70+ logistics-specific fields with contextual and geographic awareness for accurate, carrier-aware processing."
                        },
                        {
                            "num": "3",
                            "title": "Zero-Touch Load Generation",
                            "desc": "A complete, pre-filled load entry is generated within seconds, requiring only minimal review."
                        },
                        {
                            "num": "4",
                            "title": "Built-In Intelligence",
                            "desc": "Context-aware automation with real-time tracking reduces burnout while enhancing performance and employee satisfaction."
                        }
                    ],
                    "footer": "<p>Manual intervention is now required only for final validation, with the system handling all upstream load creation tasks automatically. Shipment orders no longer sit in queue awaiting manual input — they are processed in real time, improving responsiveness and reducing lead time dramatically.</p>\n        <p>The result is a seamless, zero-touch experience — delivering consistency, accuracy, and operational speed at scale.</p>"
                }
            },
            {
                "id": "benefits",
                "title": "Benefits Realized",
                "type": "impact-strip",
                "content": {
                    "body": "<p>With Hyniva's Autonomous Document Intelligence Agent, the client's TMS operations have evolved from manual and error-prone to intelligent and autonomous. By embedding AI at the core of load creation, they've gained speed, accuracy, and scalability — and positioned themselves for the next wave of logistics innovation.</p>",
                    "items": [
                        {
                            "value": "98%",
                            "label": "Massive Time Savings",
                            "desc": "Load creation reduced from 15–20 minutes to just 10–20 seconds"
                        },
                        {
                            "value": "99.5%",
                            "label": "Cost Efficiency",
                            "desc": "Document handling costs reduced from $5–$10 per document to just $0.02–$0.05"
                        },
                        {
                            "value": "99.6%",
                            "label": "Improved Accuracy",
                            "desc": "Field extraction accuracy minimizing billing errors and client escalations"
                        },
                        {
                            "value": "24/7",
                            "label": "Scalable Operations",
                            "desc": "Processes documents continuously and handles high volumes without performance drops"
                        },
                        {
                            "value": "~0 sec",
                            "label": "Reduced Lead Time",
                            "desc": "Shipment orders no longer wait in queue — near-instant readiness enables faster dispatch planning"
                        }
                    ],
                    "footer": "<blockquote class=\"border-l-4 border-[#1e90ff] pl-6 py-2 my-8 bg-slate-50/50 rounded-r-lg\"><p class=\"text-[19px] italic text-[#1e90ff] font-display\">\"What used to take 20 minutes now takes just 20 seconds — with no compromise in accuracy.\"</p></blockquote>"
                }
            },
            {
                "id": "outcome",
                "title": "Outcome",
                "type": "text",
                "content": "<p>From backlogs and manual bottlenecks to a fully automated, real-time workflow — the logistics provider has redefined its load creation process through Hyniva's GenAI-powered innovation. With document intelligence at the core, shipment data is now extracted, processed, and integrated with speed, accuracy, and zero manual touch.</p>\n        <p>The result: load entries completed in seconds, costs cut by over 99%, and scalable operations that keep pace with demand. This shift not only optimized fulfillment but also positioned the company at the forefront of AI-driven logistics transformation.</p>\n        <p>Hyniva's GenAI solution didn't just improve performance — it changed the game.</p>\n        <blockquote>\"What used to take 20 minutes now takes just 20 seconds — with no compromise in accuracy.\"</blockquote>"
            }
        ]
    },
    "lwr-modernization": {
        "slug": "lwr-modernization",
        "eyebrow": "Salesforce Experience Cloud & LWR",
        "title": "LWR Modernization for<br>\n      <em>High-Performance Experiences</em>",
        "summary": "Migrated legacy Experience Cloud to Lightning Web Runtime, delivering faster,\n      mobile-first, and scalable digital experiences.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "2×",
                "label": "Faster Page Loads",
                "sub": ""
            },
            {
                "icon": "🚀",
                "value": "55%",
                "label": "Performance Gain",
                "sub": ""
            },
            {
                "icon": "📱",
                "value": "100%",
                "label": "Mobile Responsive",
                "sub": ""
            },
            {
                "icon": "🔍",
                "value": "25%",
                "label": "SEO Improvement",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A leading U.S.-based, enterprise-scale credit union relied on its Salesforce Experience Cloud Members portal to support service discovery, product access, and self-service across desktop and mobile channels.</p>\n        <p>As digital usage increased, the existing Aura-based platform began to show performance and scalability limitations, including slow page loads, navigation delays, and inconsistent mobile responsiveness. The architecture also increased maintenance effort, limited scalability, and restricted the adoption of modern Salesforce capabilities.</p>\n        <p>With more than 77 service pages and static navigation that limited personalization, the credit union needed a structured, low-risk modernization approach to improve performance and enable scalable, personalized member experiences, without disrupting ongoing operations.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva led a phased modernization of the Salesforce Experience Cloud platform, migrating the Aura-based Members site to a Lightning Web Runtime (LWR) architecture. The approach combined platform re-architecture, component modernization, and experience enhancements while aligning with the credit union's release governance and quality standards.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Full Site Migration to LWR",
                            "desc": "Migrated 77 service pages to an LWR-based Members experience across desktop and mobile, and refactored 20 Aura components into modular, reusable Lightning Web Components optimized for performance and scalability."
                        },
                        {
                            "num": "2",
                            "title": "Dynamic Product-Aware Navigation",
                            "desc": "A dynamic, product-aware navigation framework was implemented to render menus based on member products, channels, and eligibility, enabling contextual personalization."
                        },
                        {
                            "num": "3",
                            "title": "Performance-First Architecture",
                            "desc": "Applied server-side rendering, intelligent caching, reduced JavaScript payloads, optimized Apex interactions, and responsive UI design with seamless, app-like navigation."
                        },
                        {
                            "num": "4",
                            "title": "Enterprise-Grade Delivery & Governance",
                            "desc": "Included detailed application and component analysis, performance baselining, phased development and testing across multiple environments, and close coordination with stakeholders through regular governance forums. Production readiness was ensured through regression testing, UAT support, compliance reviews, and post-release warranty."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The LWR modernization delivered measurable improvements in performance, scalability, and member experience:</p>",
                    "items": [
                        {
                            "value": "2×",
                            "label": "Faster Page Loads",
                            "desc": "Delivering a noticeably faster and smoother member experience across devices"
                        },
                        {
                            "value": "55%",
                            "label": "Performance Gain",
                            "desc": "Improvement in runtime performance and page-to-page navigation speed"
                        },
                        {
                            "value": "100%",
                            "label": "Mobile Responsive",
                            "desc": "Driven by reduced JavaScript payloads and lighter architecture"
                        },
                        {
                            "value": "25%",
                            "label": "SEO Improvement",
                            "desc": "In SEO, accessibility, and long-term maintainability through cleaner markup and modern web standards"
                        },
                        {
                            "value": "↑",
                            "label": "Personalized Navigation",
                            "desc": "Product-aware navigation improved discoverability and reduced member friction"
                        }
                    ]
                }
            },
            {
                "id": "future",
                "title": "The Road Ahead",
                "type": "text",
                "content": "<p>By migrating from Aura to LWR, the credit union now operates on a future-ready Experience Cloud platform that is faster, more resilient, and easier to maintain. The dynamic header capability enables scalable personalization, while the modular LWC architecture positions the platform to adopt new Salesforce capabilities with minimal refactoring.</p>\n        <p>Hyniva's structured delivery model, deep Salesforce expertise, and close collaboration with client stakeholders ensured a smooth migration with minimal disruption, enabling the credit union to confidently scale its digital member experiences.</p>"
            }
        ]
    },
    "aem-migration": {
        "slug": "aem-migration",
        "eyebrow": "AEM Migration & Digital Transformation",
        "title": "Rapid Reverse-Engineered<br>\n      <em>Website Migration</em>",
        "summary": "Reverse-engineered and migrated a complete website to Adobe Experience Manager in just\n      2 months — without backend access — ensuring zero downtime and seamless user experience.",
        "metrics": [
            {
                "icon": "📅",
                "value": "2 Months",
                "label": "Full Delivery",
                "sub": ""
            },
            {
                "icon": "✅",
                "value": "Zero",
                "label": "Downtime",
                "sub": ""
            },
            {
                "icon": "👥",
                "value": "20",
                "label": "Team Deployed",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "50%+",
                "label": "Timeline Reduction",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>Following the acquisition of a prominent US-based investment firm, a leading asset management company faced a daunting challenge: to migrate the acquired firm's entire digital presence into its existing design and technology ecosystem within 3 months.</p>\n        <p>The client had no access to the backend systems, APIs, or content repositories of the acquired company site. The only reference point was the public-facing website, meaning the entire solution had to be rebuilt from scratch by reverse-engineering existing pages.</p>\n        <p>The client required a complete, production-ready rollout within 12 weeks. Most industry estimates suggested a minimum of 6 to 9 months.</p>\n        <p>Challenges Anticipated / Encountered:</p>",
                    "items": [
                        {
                            "icon": "🔌",
                            "title": "No Real-Time Data Access",
                            "text": "APIs were unavailable, requiring temporary UI-side CSV-based data handling to simulate live content feeds."
                        },
                        {
                            "icon": "🏗️",
                            "title": "Infrastructure Blind Spots",
                            "text": "Lack of backend visibility requires assumptions around infrastructure configurations, such as domain integration and page routing."
                        },
                        {
                            "icon": "🔑",
                            "title": "Limited Administrative Control",
                            "text": "High dependency on the internal team for key tasks like cache clearance slowed development and testing cycles."
                        },
                        {
                            "icon": "📋",
                            "title": "External Compliance & Content Delays",
                            "text": "Anticipated delay in content approvals and compliance reviews due to regulatory bound checks."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Despite widespread skepticism, Hyniva delivered the full solution within 2 months, cutting projected timeline in half. Our approach wasn't just about speed — it was about precision, resilience, and innovative execution.</p>\n        <p>We achieved this through:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Accelerated Delivery with SDET-Infused Digital Factory Model",
                            "desc": "Leveraging our Digital Factory framework, we quickly assembled a specialized 20 member delivery team in a week aligned with the client's business objectives, compliance needs, and UI replication requirements. Software Development Engineers in Test were embedded within each delivery pod from day one, enabling continuous testing, early detection of integration gaps, and automation at scale."
                        },
                        {
                            "num": "2",
                            "title": "Strategic Infrastructure Enablement",
                            "desc": "Using Adobe Experience Manager (AEM), we implemented a component-driven architecture to enable parallel tracks for content and development. With no API access, we started with CSV-based data pipelines to simulate dynamic data feeds, ensuring uninterrupted progress."
                        },
                        {
                            "num": "3",
                            "title": "Proactive Stakeholder Management",
                            "desc": "Through clear communication channels, daily syncs, and structured feedback loops, we enabled continuous engagement and alignment across teams. Early collaboration with the compliance and legal teams during content extraction ensured compliance and reduced rework."
                        }
                    ]
                }
            },
            {
                "id": "results",
                "title": "Results",
                "type": "impact-strip",
                "content": {
                    "body": "<p>Hyniva successfully led a complex AEM site migration — transforming a legacy digital property into a fully responsive, enterprise-grade web platform with no direct access to core systems.</p>",
                    "items": [
                        {
                            "value": "8 wks",
                            "label": "Phase 1 Delivery",
                            "desc": "Phased delivery to achieve early benefits — Phase 1 completed in 8 weeks"
                        },
                        {
                            "value": "4 wks",
                            "label": "Phase 2 Delivery",
                            "desc": "Phase 2 completed in 4 weeks — cutting the industry estimate by more than 50%"
                        },
                        {
                            "value": "Zero",
                            "label": "Downtime",
                            "desc": "Seamless cutover to production with zero downtime"
                        },
                        {
                            "value": "✓",
                            "label": "Enterprise-Grade Delivery",
                            "desc": "Ensured scalability, security, and quality in a highly constrained environment"
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>This case exemplifies Hyniva's ability to thrive in high-pressure, high-constraint environments. Through a resilient delivery structure, SDET-driven quality, and agile stakeholder management, we redefined what's possible in enterprise digital transformation — even when the odds were against it.</p>\n      </div>"
                }
            },
            {
                "id": "summary",
                "title": "Summary",
                "type": "text",
                "content": "<p>This case exemplifies Hyniva's ability to thrive in high-pressure, high-constraint environments. Through a resilient delivery structure, SDET-driven quality, and agile stakeholder management, we redefined what's possible in enterprise digital transformation — even when the odds were against it.</p>"
            }
        ]
    },
    "customer-authentication": {
        "slug": "customer-authentication",
        "eyebrow": "Voice Biometrics & Contact Center Security",
        "title": "Frictionless Customer Authentication<br>\n      <em>for Secure Banking</em>",
        "summary": "Enabled secure and seamless customer authentication using voice biometrics, allowing contact\n      center agents to verify customers instantly without lengthy security questions.",
        "metrics": [
            {
                "icon": "⏱️",
                "value": "~2 min",
                "label": "Reduced Handle Time",
                "sub": ""
            },
            {
                "icon": "🔐",
                "value": "3×",
                "label": "Stronger Authentication",
                "sub": ""
            },
            {
                "icon": "🚫",
                "value": "Zero",
                "label": "KBA Dependency",
                "sub": ""
            },
            {
                "icon": "🎙️",
                "value": "100%",
                "label": "Passive Verification",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A leading U.S.-based investment management firm sought to modernize contact center authentication without compromising security. Despite existing IVR and enhanced controls, authentication for sensitive interactions remained slow and friction-heavy.</p>\n        <p>The existing process relied heavily on knowledge-based authentication (KBA), requiring multiple profile questions and one-time passcodes due to rising spoofing and masking fraud attempts. The absence of voice-based authentication resulted in repetitive questioning, longer IVR journeys, and extended agent handling time.</p>\n        <p>This added nearly 3 minutes to average handle time per call, lowered customer satisfaction, and increased operational strain. The firm needed a secure, low-friction authentication model that could reduce customer effort while strengthening fraud protection.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "text",
                "content": "<p>Hyniva integrated Pindrop as a foundational authentication layer within the firm's IVR and contact center ecosystem, leveraging its capabilities for real-time ANI verification, device trust scoring, spoof and masking detection, and passive voice biometrics. Authentication was embedded within existing IVR flows, enabling callers to be verified passively as they stated their intent — without explicit enrollment or intrusive questioning. The implementation was integrated with the firm's Genesys Cloud environment and surfaced authentication outcomes to agents through Salesforce Service Cloud, ensuring verification insights were available during and after each interaction.</p>\n        <p>These capabilities were then structured into a progressive authentication framework. A single PII-based prompt was combined with passive device validation, ANI verification, and voice biometrics to achieve triple-factor authentication for most interactions. This significantly reduced reliance on KBA while ensuring customers were securely verified before reaching an agent. Exception handling mechanisms enabled controlled escalation when confidence thresholds were not met.</p>\n        <p>The integration followed a structured, low-risk rollout approach, with rapid validation and close collaboration across security and compliance teams to ensure minimal operational disruption.</p>"
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The integration transformed authentication from a contact center bottleneck into a strategic advantage. What was once a time-intensive verification process became an invisible layer of trust — accelerating service without compromising control.</p>",
                    "items": [
                        {
                            "value": "~2 min",
                            "label": "Reduced Handle Time",
                            "desc": "Average handle time (AHT) reduced by ~2 minutes per call"
                        },
                        {
                            "value": "Zero",
                            "label": "KBA Eliminated",
                            "desc": "Eliminated KBA for most complex-service interactions"
                        },
                        {
                            "value": "↓",
                            "label": "Reduced IVR Friction",
                            "desc": "Reduced friction in IVR authentication across all interactions"
                        },
                        {
                            "value": "3×",
                            "label": "Stronger Security",
                            "desc": "Strengthened security with real-time spoof detection, device trust, and voice biometrics"
                        },
                        {
                            "value": "✓",
                            "label": "Faster Agent Service",
                            "desc": "Enabled agents to receive fully authenticated callers for faster, more effective service"
                        }
                    ]
                }
            },
            {
                "id": "future",
                "title": "Road Ahead",
                "type": "text",
                "content": "<p>By shifting verification upstream and embedding intelligence into the call journey, the firm reduced operational drag, improved service consistency, and elevated agent productivity. Authentication no longer dictated handle time or customer effort.</p>\n        <p>More importantly, the organization now operates on a future-ready security architecture — one that supports growth in high-value transactions, digital servicing, and evolving fraud patterns without reintroducing friction.</p>"
            }
        ]
    },
    "core-banking-transformation": {
        "slug": "core-banking-transformation",
        "eyebrow": "Microsoft & Core Banking Modernization",
        "title": "Core Banking Transformation<br>\n      <em>on Microsoft</em>",
        "summary": "Built a modern banking platform integrating workflows, data, and analytics to deliver\n      faster loan processing, reduced costs, and real-time operational intelligence.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "50%",
                "label": "Faster Loan Approvals",
                "sub": ""
            },
            {
                "icon": "💰",
                "value": "30%",
                "label": "Cost Reduction",
                "sub": ""
            },
            {
                "icon": "📊",
                "value": "Real-Time",
                "label": "Dashboards & Insights",
                "sub": ""
            },
            {
                "icon": "🏗️",
                "value": "Scalable",
                "label": "Banking Architecture",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A major banking and financial services provider was under growing pressure to modernize its core operations. With multiple legacy systems managing loan processing, account verification, compliance, and customer onboarding, the organization struggled with slow manual workflows and inconsistent data synchronization.</p>",
                    "items": [
                        {
                            "icon": "🐢",
                            "title": "Slow, Manual Workflows",
                            "text": "Manual processes causing customer dissatisfaction and extended turnaround times."
                        },
                        {
                            "icon": "🔀",
                            "title": "Data Fragmentation",
                            "text": "Inconsistent data synchronization across disparate financial products and systems."
                        },
                        {
                            "icon": "🔒",
                            "title": "Rigid Legacy Systems",
                            "text": "Aging technologies that delayed the launch of new financial services."
                        },
                        {
                            "icon": "💸",
                            "title": "High Maintenance",
                            "text": "Elevated costs from managing siloed architectures and legacy infrastructure."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>The challenge was clear: streamline financial workflows, centralize data, and enable rapid innovation — without compromising security or compliance.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva designed and executed a robust modernization strategy to create a scalable, secure, and agile financial platform using Microsoft's ecosystem.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Workflow Automation & UI Modernization",
                            "desc": "Migrated key customer service and loan processing workflows to a modern ASP.NET MVC interface, enhancing responsiveness with Angular front-end experiences."
                        },
                        {
                            "num": "2",
                            "title": "Centralized Integration Layer",
                            "desc": "Built a secure RESTful middleware to handle core banking functions like KYC/AML validation and transaction tracking with role-based authentication."
                        },
                        {
                            "num": "3",
                            "title": "Event-Driven Architecture with Azure",
                            "desc": "Deployed Azure Service Bus for real-time workflow updates and integrated Azure Logic Apps for automated document validation and escalation."
                        },
                        {
                            "num": "4",
                            "title": "Real-Time Dashboards & Reporting",
                            "desc": "Leveraged SQL Server and Redis Cache for high-performance access to data, delivering real-time reporting dashboards for senior management."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>Hyniva's solution replaced outdated workflows with an agile, future-ready platform, empowering both internal teams and customers.</p>",
                    "items": [
                        {
                            "value": "50%",
                            "label": "Faster Approvals",
                            "desc": "Automated decision engines cut loan turnaround time in half"
                        },
                        {
                            "value": "30%",
                            "label": "Cost Reduction",
                            "desc": "Achieved significant reduction in processing costs by retiring legacy forms"
                        },
                        {
                            "value": "Real-Time",
                            "label": "Visibility",
                            "desc": "Executive dashboards provide up-to-the-minute operational insights"
                        },
                        {
                            "value": "↑",
                            "label": "Customer CX",
                            "desc": "Mobile-friendly interfaces boosted onboarding satisfaction scores"
                        }
                    ]
                }
            },
            {
                "id": "outcome",
                "title": "Outcome",
                "type": "text",
                "content": "<p>With Hyniva's support, the banking institution transitioned from legacy-dependent operations to a modern, agile financial services platform. The result: better customer engagement, faster service delivery, and a scalable foundation for launching new banking products.</p>"
            }
        ]
    },
    "enterprise-data-intelligence": {
        "slug": "enterprise-data-intelligence",
        "eyebrow": "AWS Data Platform & Customer Intelligence",
        "title": "Turning Enterprise Data into a<br>\n      <em>Strategic Intelligence Engine</em>",
        "summary": "Built a unified AWS data platform that integrates multiple banking systems to deliver\n      real-time Customer 360 insights and a single source of truth.",
        "metrics": [
            {
                "icon": "🔭",
                "value": "360°",
                "label": "Customer View",
                "sub": ""
            },
            {
                "icon": "⚙️",
                "value": "100%",
                "label": "Automated ETL",
                "sub": ""
            },
            {
                "icon": "🔗",
                "value": "Multi-Source",
                "label": "Data Integration",
                "sub": ""
            },
            {
                "icon": "🎯",
                "value": "Single",
                "label": "Source of Truth",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A leading bank in Guam operated across multiple core systems — including FIS, credit card platforms, and sales systems — each with isolated data environments.</p>\n        <p>This fragmentation limited visibility into customer relationships, delayed reporting, and made it difficult to generate actionable insights. Business teams lacked a unified view of customer behavior, impacting decision-making across lending, marketing, and service functions.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva designed and implemented a real-time, cloud-native data platform leveraging AWS serverless technologies to unify disparate data sources into a single foundation.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "AWS Glue & PySpark",
                            "desc": "Implemented for large-scale data processing and transformation of fragmented core system data."
                        },
                        {
                            "num": "2",
                            "title": "AWS Lambda Orchestration",
                            "desc": "Used to trigger and manage automated workflows across mainframe and modern platforms."
                        },
                        {
                            "num": "3",
                            "title": "Customer 360 View",
                            "desc": "Created a centralized data warehouse capturing complete lifecycle insights from account creation to transactions."
                        }
                    ]
                }
            },
            {
                "id": "benefits",
                "title": "Benefits Realized",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The bank evolved from operating on fragmented data to running on a unified, real-time intelligence layer.</p>",
                    "items": [
                        {
                            "value": "360°",
                            "label": "Unified View",
                            "desc": "Consolidated view of customer relationships across all systems"
                        },
                        {
                            "value": "50–60%",
                            "label": "Less Manual Effort",
                            "desc": "Automated pipelines replaced manual extraction and reconciliation"
                        },
                        {
                            "value": "70%",
                            "label": "Faster Reporting",
                            "desc": "Near real-time data availability accelerated business responsiveness"
                        },
                        {
                            "value": "∞",
                            "label": "Scalable Foundation",
                            "desc": "Cloud-native architecture ready for AI and advanced analytics"
                        }
                    ]
                }
            },
            {
                "id": "outcome",
                "title": "Outcome",
                "type": "text",
                "content": "<p>Data is now embedded into everyday decision-making — enabling faster execution, improved customer engagement, and a stronger foundation for digital growth.</p>"
            }
        ]
    },
    "aws-document-platform": {
        "slug": "aws-document-platform",
        "eyebrow": "AWS Cloud & Document Management",
        "title": "AWS-Powered Document<br>\n      <em>Platform Transformation</em>",
        "summary": "Replaced a legacy document management system with a serverless AWS architecture,\n      significantly reducing costs while improving performance and scalability.",
        "metrics": [
            {
                "icon": "💰",
                "value": "$500K+",
                "label": "Annual Savings",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "5×",
                "label": "Performance Gain",
                "sub": ""
            },
            {
                "icon": "🚀",
                "value": "10 Hours",
                "label": "Rapid Migration",
                "sub": ""
            },
            {
                "icon": "☁️",
                "value": "Serverless",
                "label": "Scalable Architecture",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "text",
                "content": "<p>A global investment firm was incurring high annual costs due to their reliance on a legacy platform for managing ~125 million customer documents. The overly complex platform inhibited efficient enhancements and meeting evolving requirements.</p>"
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva quickly designed a creative solution to meet their client's document management goals. By harnessing Hyniva's deep expertise in AWS capabilities, the team built a solution that has improved performance by nearly 5x which dramatically improved customer experience. Instead of waiting for almost a minute, customers are now instantly viewing their documents on the web and on the mobile app. The new document management platform is much more efficient to run, simpler to support, and highly scalable as the client grows their business. Migration is always a risk for any platform replacement, but the Hyniva team carefully managed this and migrated the extensive document repository of ~125 million documents in only 10 hours.</p>\n        <p>Hyniva crafted a tailored document management system entirely on AWS, and the design is summarized below:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Amazon S3",
                            "desc": "A scalable storage service deployed to securely store large volumes of documents, handle batch processing, and communicate with API-based events such as upload or download. S3 also fulfilled SEC17a-4 compliance requirements which is critical for any investment management business."
                        },
                        {
                            "num": "2",
                            "title": "AWS Lambda",
                            "desc": "With its serverless computing, ensured processing on demand, relieving the burden of server management. Additionally, Lambda handled events triggered from S3 events for batch/upload processes."
                        },
                        {
                            "num": "3",
                            "title": "DynamoDB",
                            "desc": "A high-performance NoSQL database that facilitated lightning-fast query execution and stored document metadata and status-related data."
                        },
                        {
                            "num": "4",
                            "title": "Amazon API Gateway",
                            "desc": "Streamlined API communication efforts within the system, ensuring seamless data exchange."
                        },
                        {
                            "num": "5",
                            "title": "Amazon Serverless EMR",
                            "desc": "Enabled batch uploads of metadata into the global firm's document metadata store. This component takes an input CSV file containing metadata and notification data, processes it in batch to upload metadata, and publishes notifications for successful updates."
                        },
                        {
                            "num": "6",
                            "title": "AWS CloudFormation",
                            "desc": "Used to define and provision the infrastructure of the document management system by deploying infrastructure as code."
                        },
                        {
                            "num": "7",
                            "title": "AWS CloudWatch",
                            "desc": "Used to monitor all executions and the overall health of the APIs and resources utilized in the document management system. The technical team identified and resolved errors found in the CloudWatch logging interface."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>Hyniva also handled the migration of ~125 million documents from their existing platform to DynamoDB, completing the data migration process in just 10 hours.</p>\n      </div>\n\n      <div class=\"solution-image\">\n        <img src=\"https://www.hyniva.com/wp-content/uploads/2024/11/AWS-Doc-Manager-1024x653.png\" alt=\"AWS Document Management Architecture\"/>\n      </div>"
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "text",
                "content": "<p>The new unified document management platform drastically cut down the costs, resulting in annual savings of over $500,000. API calls and database queries were executed at a remarkable speed – nearly 5 times faster than the previous platform. Batch processing times that once took hours were reduced to a few minutes. This radical improvement meant that documents, accessible via multiple interfaces, were not only easily queried but also instantly available, enhancing overall business productivity and customer experience.</p>"
            },
            {
                "id": "future",
                "title": "The Road Ahead",
                "type": "text",
                "content": "<p>Hyniva's innovative use of AWS technology for the document management platform not only helped the global investment management firm save over half a million dollars annually, but also significantly enhanced the speed and efficiency of their document management system. The improved user experience and system performance set a new standard in the industry. By leveraging their AWS expertise, Hyniva quickly delivered efficiency to its client.</p>\n        <p>If you're ready to explore how your business can harness the power of AWS to achieve your goals, Hyniva is ready to be your partner in achieving excellence. Let's discuss how we can partner to drive your success!</p>"
            }
        ]
    },
    "hyniva-campaign-management": {
        "slug": "hyniva-campaign-management",
        "eyebrow": "Campaign Management & Marketing Technology",
        "title": "Data-Driven Campaign Management<br>\n      <em>for Enterprise Marketing</em>",
        "summary": "Built a custom campaign management platform with automated scoring and full lifecycle\n      tracking for scalable marketing operations.",
        "metrics": [
            {
                "icon": "🏗️",
                "value": "100%",
                "label": "Custom Platform",
                "sub": ""
            },
            {
                "icon": "⚙️",
                "value": "Automated",
                "label": "Campaign Scoring",
                "sub": ""
            },
            {
                "icon": "🔄",
                "value": "Full",
                "label": "Lifecycle Coverage",
                "sub": ""
            },
            {
                "icon": "🚫",
                "value": "Zero",
                "label": "Manual Tracking",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>An Information Technology Solutions company needed to build a modern media campaign management application from the ground up. Their goal was to capture and manage advertising campaigns efficiently while handling multiple types of campaign-related file uploads. A crucial requirement was to design and implement a built-in scoring model capable of calculating scores for campaigns based on predefined business logic.</p>",
                    "items": [
                        {
                            "icon": "🗄️",
                            "title": "Database Design",
                            "text": "Comprehensive database design, including creation of database scripts and stored procedures."
                        },
                        {
                            "icon": "📖",
                            "title": "End-User Documentation",
                            "text": "Development of clear, updated end-user manuals and online help resources."
                        },
                        {
                            "icon": "✅",
                            "title": "Quality & Traceability",
                            "text": "Adherence to strict development practices for quality and traceability across the software lifecycle."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva developed a bespoke application on the latest .NET Framework, tailored to the client's specific campaign management needs. Our team managed the entire lifecycle, delivering:</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Bespoke .NET Application",
                            "desc": "Built a custom application from the ground up to match precise campaign management workflows."
                        },
                        {
                            "num": "2",
                            "title": "Automated Scoring Model",
                            "desc": "Integrated a robust scoring engine to automate campaign evaluations based on business logic."
                        },
                        {
                            "num": "3",
                            "title": "Quality Assurance",
                            "desc": "Maintained rigorous standards using TFS for tracking, code quality metrics, and unit test coverage."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Benefits Realized",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The platform transformed campaign management from a manual hurdle into a streamlined, high-quality operational asset.</p>",
                    "items": [
                        {
                            "value": "100%",
                            "label": "Custom Fit",
                            "desc": "Precisely matched to campaign workflows and rules"
                        },
                        {
                            "value": "⚙️",
                            "label": "Automation",
                            "desc": "Scoring engine eliminated manual calculations and errors"
                        },
                        {
                            "value": "🗄️",
                            "label": "Data Integrity",
                            "desc": "Optimized DB design ensured fast access and scalability"
                        },
                        {
                            "value": "🔍",
                            "label": "Transparency",
                            "desc": "Full traceability across the software lifecycle"
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>Enabling agencies to operate with greater speed, accuracy, and confidence — built on a platform designed to continuously adapt and scale.</p>\n      </div>"
                }
            },
            {
                "id": "outcome",
                "title": "Outcome",
                "type": "text",
                "content": "<p>The new campaign management platform empowered the client to manage media campaigns more efficiently, with streamlined processes, real-time scoring insights, and enhanced user support. Hyniva's solution delivered a high-quality, scalable application that aligned perfectly with the client's vision and set the foundation for future feature expansion and business growth.</p>"
            }
        ]
    },
    "modernizing-case-management-for-a-community-healthcare-provider-stop": {
        "slug": "modernizing-case-management-for-a-community-healthcare-provider-stop",
        "eyebrow": "Healthcare System Modernization",
        "title": "Modernizing Case Management for a Community<br>\n      <em>Healthcare Provider</em>",
        "summary": "Streamlined case intake, tracking, and resolution workflows — enabling real-time visibility, improved coordination across care teams, and more efficient service delivery for community healthcare programs.",
        "metrics": [
            {
                "icon": "🗂️",
                "value": "100%",
                "label": "Digital Case Management",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "Real-Time",
                "label": "Data Visibility",
                "sub": ""
            },
            {
                "icon": "📊",
                "value": "50%",
                "label": "Faster Reporting",
                "sub": ""
            },
            {
                "icon": "✅",
                "value": "Zero",
                "label": "Manual Dependencies",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "approach-list",
                "content": {
                    "body": "<p>A community healthcare provider's STOP program relied on a heavily customized Microsoft Access system that became an operational bottleneck — difficult to scale, navigate, and maintain.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Complex Nested Workflows",
                            "desc": "Critical workflows buried within multi-tabbed forms made navigation and updates difficult."
                        },
                        {
                            "num": "2",
                            "title": "Data Inconsistency",
                            "desc": "Tightly coupled business logic led to fragmented data entry and inconsistent reporting."
                        },
                        {
                            "num": "3",
                            "title": "Limited Accessibility",
                            "desc": "Desktop-bound legacy system restricted remote usage for field coordinators."
                        }
                    ]
                }
            },
            {
                "id": "approach",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>We reimagined the platform's architecture using a cloud-native, API-first approach to transform a rigid legacy system into a future-ready service engine.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "API-First Architecture",
                            "desc": "Decoupled business logic into secure APIs, enabling long-term flexibility and easy integration."
                        },
                        {
                            "num": "2",
                            "title": "Modern Frontend Rebuild",
                            "desc": "Rebuilt the UI with ReactJS, providing a clean, accessible web interface for all devices."
                        },
                        {
                            "num": "3",
                            "title": "Workflow Simplification",
                            "desc": "Streamlined complex forms into intuitive components, improving data entry speed and accuracy."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered immediate and measurable improvements across the healthcare program's operations.</p>",
                    "items": [
                        {
                            "value": "100%",
                            "label": "Digital Intake",
                            "desc": "Full migration from legacy Access to cloud-native platform"
                        },
                        {
                            "value": "Real-Time",
                            "label": "Visibility",
                            "desc": "Care teams access case data instantly from any location"
                        },
                        {
                            "value": "50%",
                            "label": "Faster Reports",
                            "desc": "Reporting time halved through automated data consolidation"
                        },
                        {
                            "value": "0",
                            "label": "Manual Delay",
                            "desc": "Eliminated manual tracking and paper dependencies"
                        }
                    ],
                    "footer": "<div class=\"outcome-list\" style=\"margin-top:16px;\">\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Standardized Workflows &amp; Data Accuracy</strong> — Eliminated inconsistencies by enforcing a single, structured data entry process</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Anywhere Accessibility</strong> — Enabled real-time access for case managers across locations and devices</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Improved Operational Efficiency</strong> — Reduced time spent navigating complex forms and manual processes</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Future-Ready Platform</strong> — Established a scalable architecture ready for enhancements and integrations</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Rapid Modernization</strong> — Delivered a complete transformation within an aggressive timeline without disrupting operations</div></div>\n      </div>"
                }
            },
            {
                "id": "future",
                "title": "The Road Ahead",
                "type": "future-tags",
                "content": {
                    "body": "<p>With a flexible foundation, the provider is now equipped to continuously evolve its STOP program with advanced capabilities.</p>",
                    "items": [
                        "Deeper Analytics",
                        "Automated Coordination",
                        "Provider Integrations",
                        "Mobile Care Kits"
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>All built on a flexible foundation designed to adapt and scale as the program grows and community needs evolve.</p>\n      </div>"
                }
            }
        ]
    },
    "scaling-service-operations-with-salesforce": {
        "slug": "scaling-service-operations-with-salesforce",
        "eyebrow": "Salesforce Service Cloud & CX Transformation",
        "title": "Intelligent Service Operations<br>\n      <em>on Salesforce</em>",
        "summary": "Implemented Salesforce Service Cloud to centralize customer support, automate workflows,\n      and improve case resolution speed across multiple service channels.",
        "metrics": [
            {
                "icon": "⚙️",
                "value": "50%",
                "label": "Less Manual Effort",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "30%",
                "label": "Faster Resolution",
                "sub": ""
            },
            {
                "icon": "🔁",
                "value": "25%",
                "label": "Fewer Repeat Queries",
                "sub": ""
            },
            {
                "icon": "📊",
                "value": "Real-Time",
                "label": "Service Visibility",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>For a growing financial services firm, customer service had become an operational bottleneck, impacting satisfaction and rising costs.</p>",
                    "items": [
                        {
                            "icon": "😓",
                            "title": "Manual Overload",
                            "text": "Agents were drowning in manual case handling, frequently missing SLAs."
                        },
                        {
                            "icon": "🔀",
                            "title": "Fragmented Channels",
                            "text": "Disconnected experiences across phone and web fueled repeat queries."
                        },
                        {
                            "icon": "🔭",
                            "title": "Zero Visibility",
                            "text": "Leadership lacked real-time visibility into support bottlenecks."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>The result? Slower service, rising costs, and declining satisfaction in a competitive market where experience is everything.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva reimagined the service model on Salesforce as a single source of truth, fusing customer data with intelligent automation.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Unified Customer 360",
                            "desc": "Consolidated ERP, IVR, and portal data into Salesforce for instant agent visibility."
                        },
                        {
                            "num": "2",
                            "title": "Omni-Channel Automation",
                            "desc": "Automated case creation across all digital channels, ensuring no query is lost."
                        },
                        {
                            "num": "3",
                            "title": "Intelligent Routing",
                            "desc": "Assigned requests by priority and skill, ensuring fast and accurate resolutions."
                        },
                        {
                            "num": "4",
                            "title": "Proactive Monitoring",
                            "desc": "Real-time tracking flags abandoned sessions for immediate proactive follow-ups."
                        }
                    ],
                    "footer": "<div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Extracted and restructured embedded business rules into scalable APIs</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Decoupled frontend and backend for flexibility and future integrations</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Built a secure, cloud-native foundation for long-term scalability</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 2 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">2. UX Transformation with Modern Web Interface</strong></p>\n        <p style=\"margin-top:8px;\">We replaced cluttered, multi-tabbed desktop screens with a clean and intuitive web experience.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Simplified complex workflows into logical, user-friendly components</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Designed responsive interfaces for multi-device accessibility</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved navigation and usability for high-frequency operational tasks</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 3 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">3. Advanced Participant Management System</strong></p>\n        <p style=\"margin-top:8px;\">We digitized and enhanced critical participant workflows with strong validation and automation.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Automated rules for age validation, SSN formatting, and compliance checks</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Centralized tracking of sensitive participant data and legal statuses</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Eliminated redundant workflows to ensure data consistency and accuracy</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 4 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">4. Transportation &amp; Logistics Optimization</strong></p>\n        <p style=\"margin-top:8px;\">We rebuilt the transportation module to handle complex scheduling and cost calculations.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Automated tracking of staff time, mileage, and fees</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Enabled real-time visibility into departure and arrival schedules</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved planning efficiency for field operations</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 5 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">5. Streamlined Incident Reporting</strong></p>\n        <p style=\"margin-top:8px;\">We transformed dense reporting forms into efficient digital workflows.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Simplified logging of incidents, law enforcement interactions, and case notes</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Enabled faster data entry with structured and guided inputs</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved accuracy and completeness of critical reporting data</div>\n          </div>\n        </div>\n      </div>"
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered a new standard of customer experience with measurable efficiency gains.</p>",
                    "items": [
                        {
                            "value": "50%",
                            "label": "Manual Reduction",
                            "desc": "Agents focus on problem-solving instead of administration"
                        },
                        {
                            "value": "30%",
                            "label": "Faster Resolution",
                            "desc": "Case turnaround time reduced from days to hours"
                        },
                        {
                            "value": "25%",
                            "label": "Fewer Repeats",
                            "desc": "Integrated knowledge base resolved queries on first contact"
                        },
                        {
                            "value": "↑",
                            "label": "CSAT Scores",
                            "desc": "Proactive service and personalized care boosted loyalty"
                        }
                    ]
                }
            }
        ]
    },
    "member-experience-transformation-at-a-leading-credit-union": {
        "slug": "member-experience-transformation-at-a-leading-credit-union",
        "eyebrow": "Member Experience & Digital Engagement",
        "title": "Member Experience Transformation at a Leading <em>Credit Union</em>",
        "summary": "A complete digital overhaul of the member engagement journey — from personalized pre-qualification to streamlined loan processing — driving significant increases in member satisfaction and loan conversion.",
        "metrics": [
            {
                "icon": "📈",
                "value": "30%",
                "label": "Increase in Engagement",
                "sub": ""
            },
            {
                "icon": "🎯",
                "value": "25%",
                "label": "Higher Conversion",
                "sub": ""
            },
            {
                "icon": "👤",
                "value": "Personalized",
                "label": "Member Journey",
                "sub": ""
            },
            {
                "icon": "📱",
                "value": "Seamless",
                "label": "Multi-Channel",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A leading credit union aimed to modernize its member engagement strategy to better serve its growing member base. Despite having a strong reputation, their digital touchpoints were fragmented, leading to several operational and experience-related hurdles:</p>",
                    "items": [
                        {
                            "icon": "⚠️",
                            "title": "High Member Friction",
                            "text": "Fragmented digital touchpoints and manual processes created significant hurdles for members seeking financial products."
                        },
                        {
                            "icon": "📉",
                            "title": "Static Engagement",
                            "text": "Lack of personalized communication resulted in missed opportunities to engage members with relevant offers."
                        },
                        {
                            "icon": "⚙️",
                            "title": "Inefficient Lead Management",
                            "text": "Manual lead distribution and follow-up processes slowed down response times and impacted conversion rates."
                        },
                        {
                            "icon": "🔍",
                            "title": "Limited Digital Visibility",
                            "text": "Members had restricted visibility into their eligibility and application status, leading to uncertainty."
                        }
                    ],
                    "footer": "<div class=\"outcome-list\" style=\"margin-top:16px;\">\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>Outdated and fragmented digital interfaces led to high application abandon rates and stagnant lending volumes.</div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>Disjointed application experiences across mobile, web, branch, and phone channels caused member confusion and hindered cross-channel loan processing.</div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>Although the Credit Union used Salesforce for CRM and contact center operations, it was not integrated with the digital experiences offered to members.</div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>Returns on investment have consistently fallen short of expectations.</div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>There was minimal engagement from non-members, limiting new customer acquisition through digital channels.</div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div>The loan application process was cumbersome and unintuitive for non-members applying online.</div>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva re-engineered the member journey by implementing an end-to-end digital engagement platform that unified communication, simplified loan applications, and personalized the experience.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Personalized Member Dashboards",
                            "desc": "Created intuitive, personalized interfaces that provided members with real-time insights into their financial health and eligible offers."
                        },
                        {
                            "num": "2",
                            "title": "Digital Pre-Qualification Engine",
                            "desc": "Integrated an automated pre-qualification tool that allowed members to check their eligibility instantly without impacting their credit scores."
                        },
                        {
                            "num": "3",
                            "title": "Multi-Channel Engagement Strategy",
                            "desc": "Deployed a unified communication layer across email, SMS, and in-app notifications to deliver timely, relevant updates."
                        },
                        {
                            "num": "4",
                            "title": "Streamlined Loan Processing Integration",
                            "desc": "Seamlessly connected the front-end engagement layer with back-office loan origination systems for frictionless processing."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered immediate and measurable improvements across member satisfaction and business performance:</p>",
                    "items": [
                        {
                            "value": "↑ 40%",
                            "label": "Member Satisfaction",
                            "desc": "Enhanced digital touchpoints led to a significant boost in member engagement and NPS scores."
                        },
                        {
                            "value": "↑ 25%",
                            "label": "Loan App Volume",
                            "desc": "Simplified pre-qualification and personalized offers drove higher intent and application rates."
                        },
                        {
                            "value": "30%",
                            "label": "Efficiency",
                            "desc": "Automated lead routing and digital workflows reduced manual overhead for back-office teams."
                        },
                        {
                            "value": "↑ 50%",
                            "label": "Digital Adoption",
                            "desc": "Members transitioned from traditional branches to the more convenient digital platform."
                        }
                    ]
                }
            }
        ]
    },
    "scaling-a-secure-pre-qualification-loan-routing-platform-with-intelligent-automation": {
        "slug": "loan-routing-automation",
        "eyebrow": "FinTech Lending Automation",
        "title": "Optimizing Loan Routing and Pre-Qualification with <em>Intelligent Automation</em>",
        "summary": "An automation-driven solution that evaluated borrower data in real time and routed applications to the right lenders — reducing friction, improving match quality, and accelerating the end-to-end lending journey.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "70%",
                "label": "Faster Pre-Qualification",
                "sub": ""
            },
            {
                "icon": "🔀",
                "value": "Intelligent",
                "label": "Loan Routing",
                "sub": ""
            },
            {
                "icon": "🤖",
                "value": "100%",
                "label": "Automated Workflows",
                "sub": ""
            },
            {
                "icon": "🏗️",
                "value": "Scalable",
                "label": "Lending Platform",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A financial services organization focused on enabling small business lending through a network of Community Development Financial Institutions (CDFIs) aimed to build a seamless pre-qualification journey. However, their existing process created significant operational hurdles:</p>",
                    "items": [
                        {
                            "icon": "⏳",
                            "title": "Manual Bottlenecks",
                            "text": "Pre-qualified leads were processed and distributed manually via secure email attachments, increasing turnaround time."
                        },
                        {
                            "icon": "🛡️",
                            "title": "Security & Compliance Risks",
                            "text": "Sensitive financial data shared through emails introduced vulnerabilities and potential compliance issues."
                        },
                        {
                            "icon": "⚙️",
                            "title": "Operational Inefficiency",
                            "text": "Matching leads with partners required manual validation against multiple criteria, making the process slow."
                        },
                        {
                            "icon": "📉",
                            "title": "Customer Experience Gaps",
                            "text": "Delays in routing leads resulted in slower response times, impacting satisfaction and conversion rates."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>The organization needed a scalable, secure, and intelligent system to automate pre-qualification and partner distribution without compromising data integrity.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva designed and implemented a fully integrated digital ecosystem that streamlined the entire lead lifecycle — from data capture to partner distribution.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Conversational Pre-Qualification Interface",
                            "desc": "Intuitive, automated interface that captures applicant data and evaluates it in real time using a proprietary risk assessment algorithm."
                        },
                        {
                            "num": "2",
                            "title": "Algorithmic Risk Assessment Engine",
                            "desc": "Custom-built risk engine analyzed multiple parameters such as business profile, loan requirements, and location to determine eligibility."
                        },
                        {
                            "num": "3",
                            "title": "Intelligent Partner Matching & Routing",
                            "desc": "Automated routing engine instantly matched pre-qualified applicants with the most suitable CDFI partner based on granular criteria."
                        },
                        {
                            "num": "4",
                            "title": "Custom CRM as a Unified Backbone",
                            "desc": "Bespoke CRM platform that served as a single source of truth, connecting front-end interactions with back-office workflows."
                        },
                        {
                            "num": "5",
                            "title": "Secure System-to-System Data Transfer",
                            "desc": "Manual data sharing was replaced with encrypted, direct system integrations, ensuring end-to-end data security."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered measurable improvements across efficiency, cost, and customer experience:</p>",
                    "items": [
                        {
                            "value": "Scale",
                            "label": "Operational Efficiency",
                            "desc": "Automated the entire pre-qualification and routing process, eliminating human errors."
                        },
                        {
                            "value": "Savings",
                            "label": "Reduced Cost per Lead",
                            "desc": "Replacing labor-intensive workflows with automation led to substantial cost savings."
                        },
                        {
                            "value": "Instant",
                            "label": "Speed-to-Lead",
                            "desc": "Instant routing enabled partners to engage prospects faster, improving conversion rates."
                        },
                        {
                            "value": "Robust",
                            "label": "Data Intelligence",
                            "desc": "Centralized CRM enabled continuous optimization of risk models and customer journeys."
                        }
                    ],
                    "footer": "<div class=\"outcome-list\" style=\"margin-top:16px;\">\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Operational Efficiency at Scale</strong> — Automated the entire pre-qualification and routing process, significantly reducing manual intervention and eliminating human errors</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Reduced Cost per Lead</strong> — Replacing labor-intensive workflows with automation led to substantial cost savings in processing and operations</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Improved Speed-to-Lead &amp; Conversion Rates</strong> — Instant routing enabled CDFI partners to engage prospects faster, improving customer satisfaction and increasing loan conversion rates</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Enhanced Data Intelligence</strong> — The centralized CRM created a robust data foundation, enabling continuous optimization of risk models and customer journeys</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Future-Ready Scalability</strong> — The modern architecture supports growing lead volumes and onboarding of additional CDFI partners without increasing operational overhead</div></div>\n      </div>"
                }
            }
        ]
    },
    "modernizing-a-legacy-platform": {
        "slug": "legacy-crm-modernization",
        "eyebrow": "CRM Modernization & Lending Platform",
        "title": "Legacy CRM to <em>Modern Lending Platform</em>",
        "summary": "Re-architected an outdated CRM into a modern platform, enabling better usability, streamlined workflows, and integration with external systems.",
        "metrics": [
            {
                "icon": "🔄",
                "value": "100%",
                "label": "Platform Replacement",
                "sub": ""
            },
            {
                "icon": "✨",
                "value": "Enhanced",
                "label": "User Experience",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "Faster",
                "label": "Lending Operations",
                "sub": ""
            },
            {
                "icon": "📅",
                "value": "6 Months",
                "label": "Rapid Delivery",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>The organization’s legacy CRM platform struggled to keep pace with rapid growth, creating bottlenecks and limiting technical capabilities:</p>",
                    "items": [
                        {
                            "icon": "🏗️",
                            "title": "Scalability Issues",
                            "text": "Legacy architecture could not handle increasing volumes, creating significant efficiency bottlenecks."
                        },
                        {
                            "icon": "⏱️",
                            "title": "Time-Sensitive Migration",
                            "text": "Urgent need to migrate to a new platform within a strict six-month timeframe due to contract expirations."
                        },
                        {
                            "icon": "🖥️",
                            "title": "Rigid User Interface",
                            "text": "Outdated UI hindered user experience and lacked critical self-service features."
                        },
                        {
                            "icon": "🔌",
                            "title": "3rd Party API Incompatibility",
                            "text": "The system could not interface smoothly with modern APIs, limiting technology integration."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "text",
                "content": "<p>Hyniva undertook a complete overhaul of the CRM platform, re-architecting it into a modern, functional solution within a stringent six-month window.</p><p>Leveraging our Digital Factory approach, we employed an agile methodology to develop a streamlined and intuitive UI using AngularJS. This transformation empowered Customer Service Representatives (CSRs) to efficiently track leads, follow up with customers, and process loan applications with ease. The new platform was built to be compatible with 3rd Party APIs, ensuring long-term flexibility.</p>"
            },
            {
                "id": "impact",
                "title": "Benefits Realized",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered immediate results in operational throughput and customer engagement:</p>",
                    "items": [
                        {
                            "value": "35–40%",
                            "label": "Faster Processing",
                            "desc": "Streamlined workflows and eliminated legacy system bottlenecks."
                        },
                        {
                            "value": "↑ 20%",
                            "label": "App Volume",
                            "desc": "Improved digital experience simplified the application process for customers."
                        },
                        {
                            "value": "15–18%",
                            "label": "Approval Rates",
                            "desc": "Better prequalification and screening improved the quality of applications."
                        }
                    ]
                }
            }
        ]
    },
    "transforming-insurance-claims-operations-with-a-scalable-digital-platform": {
        "slug": "insurance-claims-platform",
        "eyebrow": "Insurance Claims Transformation",
        "title": "Transforming Insurance Claims Operations with a <em>Scalable Digital Platform</em>",
        "summary": "Digital platform that unified fragmented claims workflows, enabled real-time processing, and improved visibility across the claims lifecycle — driving faster settlements.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "60%",
                "label": "Faster Claims Processing",
                "sub": ""
            },
            {
                "icon": "📈",
                "value": "40%",
                "label": "Efficiency Gain",
                "sub": ""
            },
            {
                "icon": "🔍",
                "value": "Real-Time",
                "label": "Claims Tracking",
                "sub": ""
            },
            {
                "icon": "🏗️",
                "value": "Scalable",
                "label": "Digital Platform",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>Managing insurance claims at scale was hindered by fragmented systems, manual processes, and limited visibility into financial operations:</p>",
                    "items": [
                        {
                            "icon": "💸",
                            "title": "Manual Payment Processing",
                            "text": "Error-prone processes were slowing down operations and settlements."
                        },
                        {
                            "icon": "🗺️",
                            "title": "Mapping Inconsistencies",
                            "text": "Invoice mapping inconsistencies across different carriers created data silos."
                        },
                        {
                            "icon": "📊",
                            "title": "Reporting Gaps",
                            "text": "Limited reporting capabilities impacted executive decision-making and visibility."
                        },
                        {
                            "icon": "🐌",
                            "title": "Performance Bottlenecks",
                            "text": "System slowdowns affected user experience during peak volumes."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>These limitations created inefficiencies across the claims lifecycle — from assignment to settlement.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>We took a long-term, engineering-led approach to design a platform that unified the end-to-end claims lifecycle, focusing on automation and scalability.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Workflow Automation",
                            "desc": "Automated core workflows across the claims lifecycle to eliminate manual overhead."
                        },
                        {
                            "num": "2",
                            "title": "Secure Financial Systems",
                            "desc": "Strengthening financial systems with secure, reliable processing to improve compliance."
                        },
                        {
                            "num": "3",
                            "title": "Performance at Scale",
                            "desc": "Enhanced platform performance to support growing scale without degradation."
                        },
                        {
                            "num": "4",
                            "title": "Scalable Architecture",
                            "desc": "Flexible, scalable architecture designed for future growth and integrations."
                        }
                    ],
                    "footer": "<div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Advanced invoice generation and carrier mapping</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Fully integrated payment processing module</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Automated adjuster commission calculations</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Payroll system with ACH integration for seamless disbursements</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 2 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">2. Secure &amp; Compliant Payment Infrastructure</strong></p>\n        <p style=\"margin-top:8px;\">We enhanced platform security to ensure safe and reliable financial transactions.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Strengthened payment security protocols</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Reduced risks associated with manual financial handling</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved compliance and data protection standards</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 3 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">3. Performance Optimization at Scale</strong></p>\n        <p style=\"margin-top:8px;\">We re-engineered the platform to handle increasing workloads efficiently.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Eliminated performance bottlenecks across key workflows</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved system responsiveness and user experience</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Ensured stability under high transaction volumes</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 4 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">4. Reporting &amp; Operational Intelligence</strong></p>\n        <p style=\"margin-top:8px;\">We introduced robust reporting capabilities to improve visibility and control.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Configurable reports for financial tracking and claims insights</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Automated reporting workflows for faster decision-making</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Improved transparency across the claims lifecycle</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 5 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">5. Scalable Architecture for Long-Term Growth</strong></p>\n        <p style=\"margin-top:8px;\">We modernized the platform's foundation to support future expansion.</p>\n      </div>\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Designed a scalable database architecture</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Enabled flexibility for new feature additions and integrations</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Ensured long-term maintainability and performance</div>\n          </div>\n        </div>\n      </div>"
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformation delivered significant, measurable outcomes:</p>",
                    "items": [
                        {
                            "value": "80%",
                            "label": "Manual Work Reduction",
                            "desc": "Automation eliminated repetitive tasks and reduced operational overhead."
                        },
                        {
                            "value": "⚡",
                            "label": "Faster Settlements",
                            "desc": "Streamlined workflows improved turnaround time across the claims lifecycle."
                        },
                        {
                            "value": "100%",
                            "label": "Financial Accuracy",
                            "desc": "Enhanced invoicing, payments, and reporting ensured absolute data accuracy."
                        },
                        {
                            "value": "🔍",
                            "label": "Decision Visibility",
                            "desc": "Advanced reporting provided better visibility into real-time operations."
                        }
                    ],
                    "footer": "<div class=\"outcome-list\" style=\"margin-top:16px;\">\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">80% Reduction in Manual Work</strong> — Automation eliminated repetitive tasks and reduced operational overhead</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Faster Claims Processing</strong> — Streamlined workflows improved turnaround time across the lifecycle</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Accurate Financial Management</strong> — Enhanced invoicing, payments, and reporting ensured data accuracy</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Improved Decision-Making</strong> — Advanced reporting provided better visibility into operations</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Enhanced Security &amp; Compliance</strong> — Strengthened safeguards for financial transactions and sensitive data</div></div>\n      </div>"
                }
            }
        ]
    },
    "microsoft-crm-modernization": {
        "slug": "microsoft-crm-modernization",
        "eyebrow": "Microsoft Dynamics 365 & Cloud Modernization",
        "title": "Enterprise CRM Modernization <em>on Microsoft Cloud</em>",
        "summary": "Modernized a legacy CRM into a scalable, cloud-native Microsoft ecosystem spanning multiple business domains, ensuring seamless migration with zero downtime.",
        "metrics": [
            {
                "icon": "☁️",
                "value": "Cloud-First",
                "label": "Enterprise Architecture",
                "sub": ""
            },
            {
                "icon": "🏗️",
                "value": "4",
                "label": "Domains Modernized",
                "sub": ""
            },
            {
                "icon": "✅",
                "value": "Zero",
                "label": "Downtime Migration",
                "sub": ""
            },
            {
                "icon": "⚙️",
                "value": "6",
                "label": "Technologies Delivered",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A leading Information Technology Solutions provider was under increasing pressure to modernize and scale its enterprise applications across Municipal Administration, Smart City programs, and Trustee services:</p>",
                    "items": [
                        {
                            "icon": "⚙️",
                            "title": "Complex Ecosystem",
                            "text": "Managing and enhancing multi-domain solutions across Dynamics CRM and Power Platform."
                        },
                        {
                            "icon": "☁️",
                            "title": "On-Premises Legacy",
                            "text": "Migrating a legacy Dynamics CRM 2015 on-premises system to a secure, cloud-based Dynamics 365 environment."
                        },
                        {
                            "icon": "➕",
                            "title": "Feature Gaps",
                            "text": "Adding new features such as document tracking and smart notes in Dynamics 365."
                        },
                        {
                            "icon": "📂",
                            "title": "Data Migration",
                            "text": "Seamlessly migrating critical data from legacy CRM tables to newly designed custom entities."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva deployed a cross-functional team of Power Platform and Dynamics CRM specialists to implement a scalable, cloud-first modernization strategy.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "App Modernization with Power Platform",
                            "desc": "Built Model-Driven Apps and Canvas Apps to revamp user interfaces and streamline workflows."
                        },
                        {
                            "num": "2",
                            "title": "Advanced Dynamics 365 Customization",
                            "desc": "Extended platform capabilities by developing custom Plugins, Workflows, and Web Resources."
                        },
                        {
                            "num": "3",
                            "title": "Interactive UI with PCF Controls",
                            "desc": "Used Power Apps Component Framework (PCF) with TypeScript and React to build rich, interactive user controls."
                        },
                        {
                            "num": "4",
                            "title": "Seamless Cloud Migration",
                            "desc": "Carried out a phased migration from Dynamics CRM 2015 to Dynamics 365 with minimal downtime."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>Through Hyniva's strategic modernization efforts, the client unlocked new capabilities while future-proofing their operations:</p>",
                    "items": [
                        {
                            "value": "↑",
                            "label": "Scalability",
                            "desc": "Cloud-native architecture supports increasing user demand and evolving service requirements."
                        },
                        {
                            "value": "✨",
                            "label": "UX Quality",
                            "desc": "Modern interfaces and responsive design improved usability across departments."
                        },
                        {
                            "value": "⚡",
                            "label": "Efficiency",
                            "desc": "Custom workflows and automation reduced manual effort and turnaround times."
                        },
                        {
                            "value": "🔒",
                            "label": "Data Integrity",
                            "desc": "Business-critical data was migrated with integrity, ensuring uninterrupted service."
                        }
                    ]
                }
            }
        ]
    },
    "aws-blue-green-deployment": {
        "slug": "aws-blue-green-deployment",
        "eyebrow": "AWS Blue-Green Deployment & DevOps",
        "title": "Enabling Zero-Downtime <em>Deployments with AWS</em>",
        "summary": "Implemented AWS blue-green deployment to ensure seamless releases, instant rollback capabilities, and uninterrupted system availability.",
        "metrics": [
            {
                "icon": "📉",
                "value": "95%",
                "label": "Downtime Reduction",
                "sub": ""
            },
            {
                "icon": "🚀",
                "value": "70%",
                "label": "Faster Deployments",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "< 1 Min",
                "label": "Switch Time",
                "sub": ""
            },
            {
                "icon": "🕐",
                "value": "24/7",
                "label": "Availability",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>An investment management firm faced significant challenges due to rigid infrastructure, hindering constant availability and recovery:</p>",
                    "items": [
                        {
                            "icon": "🐌",
                            "title": "Inflexible Architecture",
                            "text": "Rigid systems made it difficult to manage disaster recovery and rollbacks."
                        },
                        {
                            "icon": "🛑",
                            "title": "Service Disruptions",
                            "text": "Frequent maintenance windows disrupted service availability and user experience."
                        },
                        {
                            "icon": "⚠️",
                            "title": "Vulnerability",
                            "text": "Lack of robust disaster recovery plans made the system vulnerable to regional outages."
                        },
                        {
                            "icon": "🤝",
                            "title": "Trust Risks",
                            "text": "Interruptions during deployment periods compromised customer trust."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva identified Blue-Green Deployment as the ideal strategy to ensure seamless updates and near-zero downtime.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Two Environment Configuration",
                            "desc": "Labelled current production as Blue and staging as Green for extensive testing without affecting live users."
                        },
                        {
                            "num": "2",
                            "title": "Quality Assurance Testing",
                            "desc": "Automated and manual checks in the Green environment to ensure functional parity and performance."
                        },
                        {
                            "num": "3",
                            "title": "Switch Traffic",
                            "desc": "Seamlessly switched traffic using Global Accelerator and CloudFront triggered by AWS Lambda."
                        },
                        {
                            "num": "4",
                            "title": "Monitor & Review",
                            "desc": "Close production monitoring with easy rollback capabilities by switching back to Blue if needed."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The Blue-Green strategy was a game-changer for the firm's trading platforms and financial services:</p>",
                    "items": [
                        {
                            "value": "24/7",
                            "label": "High Availability",
                            "desc": "Users accessed applications without interruptions during switchovers."
                        },
                        {
                            "value": "~0",
                            "label": "Downtime",
                            "desc": "Automated switch implementation made switch time less than a minute."
                        },
                        {
                            "value": "↓",
                            "label": "Risk Cut",
                            "desc": "Extensive testing before deployment drastically reduced potential disruptions."
                        },
                        {
                            "value": "↩",
                            "label": "Rollback",
                            "desc": "Smooth rollback through simply switching back to the stable Blue environment."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>Our client noticed a nearly zero downtime during deployments due to the implementation of automated approvals with GitHub actions, and the automated switch implementation made the switch between environments less than a minute. The streamlined deployment process also enabled nearly 70% faster deployment times, increasing overall productivity and efficiency. In the event of functional bugs, issues, or disaster recovery scenarios, the seamless rollover feature ensures the client can maintain uninterrupted operations for their users with confidence.</p>\n      </div>"
                }
            }
        ]
    },
    "education-platform-engineering": {
        "slug": "education-platform-engineering",
        "eyebrow": "Education Platform Engineering",
        "title": "Engineered a Scalable Multi-Portal Platform for <em>Complex Education Workflows</em>",
        "summary": "Streamlined complex academic workflows, enabled real-time data visibility, and supported seamless interactions across students, faculty, and administrators.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "Real-time",
                "label": "Data Processing",
                "sub": ""
            },
            {
                "icon": "🔀",
                "value": "Complex",
                "label": "Workflow Orchestration",
                "sub": ""
            },
            {
                "icon": "📈",
                "value": "Scalable",
                "label": "Architecture",
                "sub": ""
            },
            {
                "icon": "🏛️",
                "value": "Multi-portal",
                "label": "Unified Experience",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A leading educational institution needed to manage highly regulated workflows while maintaining a consistent user experience:</p>",
                    "items": [
                        {
                            "icon": "⚖️",
                            "title": "Compliance Needs",
                            "text": "Managing multi-role workflows with strict Special Education (SPED) audit requirements."
                        },
                        {
                            "icon": "📅",
                            "title": "Dynamic Scheduling",
                            "text": "Building a tutoring system with real-time scheduling and fallback logic."
                        },
                        {
                            "icon": "🔌",
                            "title": "LMS Integration",
                            "text": "Integrating external LMS platforms for live academic data visibility."
                        },
                        {
                            "icon": "🧩",
                            "title": "UI Fragmentation",
                            "text": "Preventing fragmented interfaces across multiple portals (Admin, Student, Parent)."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Approach",
                "type": "approach-list",
                "content": {
                    "body": "<p>We took ownership of the frontend architecture and product experience to ensure long-term scalability and maintainability.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Modular Architecture",
                            "desc": "Defined a modular frontend using ReactJS and MUI for scalability."
                        },
                        {
                            "num": "2",
                            "title": "Custom Design System",
                            "desc": "Standardized UI/UX across all portals through a unified custom design system."
                        },
                        {
                            "num": "3",
                            "title": "Agile Delivery",
                            "desc": "Drove efficient team collaboration through optimized Jira and delivery workflows."
                        },
                        {
                            "num": "4",
                            "title": "Stability Framework",
                            "desc": "Introduced automated testing frameworks to ensure zero-regression delivery."
                        }
                    ],
                    "footer": "<div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Granular permissions for creation, editing, archiving, and approvals</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Bulk operations for note creation and SEIF signature workflows</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Soft-delete functionality to maintain audit trails and compliance integrity</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Seamless UI handling of multi-step approvals and edge cases</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 2 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">2. Student Success Advocate (SSA) Workspace</strong></p>\n        <p style=\"margin-top:8px;\">We built a centralized workspace enabling SSAs to efficiently manage large volumes of student data.</p>\n      </div>\n\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Real-time integration with platforms like Canvas and Edgenuity</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Intelligent dashboards for course progress, grades, and activity tracking</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Saved filters, pinned responses, and automated workflows to eliminate repetitive tasks and improve efficiency</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 3 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">3. Advanced Tutor Scheduling System (V2)</strong></p>\n        <p style=\"margin-top:8px;\">We developed a highly dynamic scheduling engine tailored for complex academic environments.</p>\n      </div>\n\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Multi-tutor assignment with Primary and Backup logic</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Support for both 1:1 tutoring and large-scale proctoring sessions</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Capacity management allowing monitoring of up to 50 students per session</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Intelligent reassignment for schedule conflicts and availability gaps</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Solution 4 -->\n      <div class=\"cs-section__body\" style=\"margin-top:36px;\">\n        <p><strong style=\"color:var(--text-dark); font-weight:600;\">4. Built-in Quality &amp; Stability Framework</strong></p>\n        <p style=\"margin-top:8px;\">To ensure long-term scalability, we embedded quality into the development lifecycle.</p>\n      </div>\n\n      <div class=\"approach-list\" style=\"margin-top:16px;\">\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Introduced unit testing and automated testing frameworks proactively</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Successfully handled continuous API evolution (v1.0.0 to v9.7.0)</div>\n          </div>\n        </div>\n        <div class=\"approach-item\">\n          <div class=\"approach-item__num\">✦</div>\n          <div class=\"approach-item__content\">\n            <div class=\"approach-item__title\">Ensured consistent performance across releases with zero regression incidents</div>\n          </div>\n        </div>\n      </div>"
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>Our engineering-led approach translated directly into measurable business outcomes:</p>",
                    "items": [
                        {
                            "value": "0",
                            "label": "Defect Rate",
                            "desc": "Maintained a flawless delivery record with zero-defect releases."
                        },
                        {
                            "value": "↓",
                            "label": "Coordination",
                            "desc": "Reduced client coordination effort significantly via structured workflows."
                        },
                        {
                            "value": "📈",
                            "label": "Scalability",
                            "desc": "Enabled expansion to a full-scale multi-portal system without rework."
                        },
                        {
                            "value": "⚡",
                            "label": "Productivity",
                            "desc": "Automated workflows reduced manual administrative effort for staff."
                        }
                    ],
                    "footer": "<div class=\"outcome-list\" style=\"margin-top:16px;\">\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Zero-Defect Delivery</strong> — Maintained a flawless delivery record with no client complaints since project inception</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Reduced Operational Overhead</strong> — Reduced client coordination effort significantly by moving from daily syncs to bi-weekly check-ins</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Scalable Platform Foundation</strong> — Enabled seamless expansion from basic features to a full-scale multi-portal system without rework</div></div>\n        <div class=\"outcome-item\"><div class=\"outcome-item__dot\"></div><div><strong style=\"color:var(--text-dark);font-weight:600;\">Improved Productivity for End Users</strong> — Automated workflows and intuitive UI significantly reduced manual administrative effort for administrators and SSAs</div></div>\n      </div>"
                }
            }
        ]
    },
    "logistics-platform-modernization-with-microsoft": {
        "slug": "logistics-platform-modernization-with-microsoft",
        "eyebrow": "Microsoft & Logistics Platform Modernization",
        "title": "Logistics Platform <em>Modernization</em>",
        "summary": "Rebuilt legacy logistics systems into a real-time, mobile-enabled platform with end-to-end operational visibility.",
        "metrics": [
            {
                "icon": "📍",
                "value": "Real-Time",
                "label": "Shipment Tracking",
                "sub": ""
            },
            {
                "icon": "📱",
                "value": "100%",
                "label": "Mobile Enablement",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "45%",
                "label": "Performance Gain",
                "sub": ""
            },
            {
                "icon": "🔗",
                "value": "Improved",
                "label": "Coordination",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A logistics provider faced disconnected systems and a lack of real-time visibility that blocked agility and customer trust:</p>",
                    "items": [
                        {
                            "icon": "📦",
                            "title": "No Tracking",
                            "text": "Dispatch teams relied on manual calls; ETAs were guesswork."
                        },
                        {
                            "icon": "📱",
                            "title": "App Desync",
                            "text": "Field staff captured updates but core systems didn't reflect them in real-time."
                        },
                        {
                            "icon": "💾",
                            "title": "Legacy ASP",
                            "text": "Slow performance and high maintenance costs made innovation impossible."
                        },
                        {
                            "icon": "🔌",
                            "title": "System Silos",
                            "text": "No centralized middleware meant portals and internal systems worked in isolation."
                        }
                    ],
                    "footer": "<div class=\"cs-section__body\" style=\"margin-top:24px;\">\n        <p>The result? Slower turnarounds. Frustrated customers. Disconnected teams. Lost opportunities.</p>\n      </div>"
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>We re-architected the application into a component-based, cloud-ready solution on the latest .NET platform.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Modular Re-Architecture",
                            "desc": "Built using ASP.NET MVC and Angular with MVVM for flexibility and scalability."
                        },
                        {
                            "num": "2",
                            "title": "Azure Integration",
                            "desc": "Used Azure Service Bus and SignalR for real-time communication across all systems."
                        },
                        {
                            "num": "3",
                            "title": "Mobility Engineering",
                            "desc": "Delivered a cross-platform mobile app using Xamarin.Forms for field operations."
                        },
                        {
                            "num": "4",
                            "title": "Performance Tuning",
                            "desc": "Optimized SQL Server and used Redis Cache to minimize latency during peak usage."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>We turned a bottlenecked platform into a streamlined digital engine with 360° visibility:</p>",
                    "items": [
                        {
                            "value": "📍",
                            "label": "Live Tracking",
                            "desc": "Real-time shipment status delivered across all portals and apps."
                        },
                        {
                            "value": "100%",
                            "label": "Mobile Ready",
                            "desc": "Staff and customers can now act on-the-go with full mobile enablement."
                        },
                        {
                            "value": "45%",
                            "label": "DB Speed",
                            "desc": "Drastic improvement in database performance and dashboard response."
                        },
                        {
                            "value": "↑",
                            "label": "Satisfaction",
                            "desc": "Improved customer trust through live notifications and faster service."
                        }
                    ]
                }
            }
        ]
    },
    "aws-cost-optimized-doc-platform": {
        "slug": "aws-cost-optimized-doc-platform",
        "eyebrow": "AWS Serverless & Document Management",
        "title": "Cost-Optimized Document <em>Platform on AWS</em>",
        "summary": "Designed a serverless AWS-based document management system to eliminate legacy costs, enhance performance, and support large-scale data operations.",
        "metrics": [
            {
                "icon": "⚡",
                "value": "5×",
                "label": "Faster Queries",
                "sub": ""
            },
            {
                "icon": "📄",
                "value": "8M+",
                "label": "Documents Migrated",
                "sub": ""
            },
            {
                "icon": "💰",
                "value": "$0",
                "label": "Licensing Cost",
                "sub": ""
            },
            {
                "icon": "☁️",
                "value": "Serverless",
                "label": "Scalable Architecture",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>An investment firm faced staggering annual costs and performance strain from their reliance on a legacy Alfresco document management system:</p>",
                    "items": [
                        {
                            "icon": "💸",
                            "title": "High Licensing",
                            "text": "Staggering annual fees were putting immense strain on financial resources."
                        },
                        {
                            "icon": "💾",
                            "title": "Legacy Strain",
                            "text": "Outdated tools hindered agility and large-scale document operations."
                        },
                        {
                            "icon": "🔍",
                            "title": "Query Lag",
                            "text": "Difficulty in quickly searching and retrieving documents from an 8M+ repository."
                        },
                        {
                            "icon": "📜",
                            "title": "Compliance",
                            "text": "Need to maintain SEC17a-4 compliance while migrating to a new system."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>Hyniva harnessed AWS's serverless capabilities to build a high-performance, compliant document management solution.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "Amazon S3 Storage",
                            "desc": "Deployed for secure, compliant storage of the 8 million+ document repository."
                        },
                        {
                            "num": "2",
                            "title": "AWS Lambda",
                            "desc": "Used for serverless computing to ensure on-demand processing without server overhead."
                        },
                        {
                            "num": "3",
                            "title": "DynamoDB Metadata",
                            "desc": "Facilitated lightning-fast queries and metadata storage for the massive document set."
                        },
                        {
                            "num": "4",
                            "title": "Amazon API Gateway",
                            "desc": "Streamlined data exchange and system communication for a seamless digital experience."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The transformative solution redefined the user experience and eliminated exorbitant costs:</p>",
                    "items": [
                        {
                            "value": "$0",
                            "label": "Licensing",
                            "desc": "Eliminated heavy annual fees through a pay-as-you-go serverless model."
                        },
                        {
                            "value": "5×",
                            "label": "Speed Gain",
                            "desc": "Queries and API calls execute significantly faster than the legacy system."
                        },
                        {
                            "value": "8M+",
                            "label": "Docs Managed",
                            "desc": "Extensive document repository is now easily accessible and instantly queried."
                        },
                        {
                            "value": "✨",
                            "label": "Experience",
                            "desc": "Enhanced productivity through multiple filters and instant document availability."
                        }
                    ]
                }
            }
        ]
    },
    "ai-customer-support-automation": {
        "slug": "ai-customer-support-automation",
        "eyebrow": "AI Chatbot & Customer Support Automation",
        "title": "AI-Powered Customer <em>Support Automation</em>",
        "summary": "Implemented an AI chatbot to handle high-volume, repetitive queries, improving response times while reducing dependency on support agents.",
        "metrics": [
            {
                "icon": "🕐",
                "value": "24/7",
                "label": "Instant Support",
                "sub": ""
            },
            {
                "icon": "⚡",
                "value": "Real-Time",
                "label": "Query Resolution",
                "sub": ""
            },
            {
                "icon": "↓",
                "value": "Reduced",
                "label": "Processing Time",
                "sub": ""
            },
            {
                "icon": "🔗",
                "value": "100%",
                "label": "Portal Integration",
                "sub": ""
            }
        ],
        "sections": [
            {
                "id": "challenge",
                "title": "Challenge",
                "type": "feature-grid",
                "content": {
                    "body": "<p>A financial management firm struggled to meet high volumes of support requests with existing staff, causing customer frustration:</p>",
                    "items": [
                        {
                            "icon": "📞",
                            "title": "Call Volume",
                            "text": "Unable to meet increasing support requests over phone and chat with existing staff."
                        },
                        {
                            "icon": "⌛",
                            "title": "High Wait Times",
                            "text": "Long wait times led to growing frustration and a drop in customer satisfaction."
                        },
                        {
                            "icon": "🔄",
                            "title": "Repetitive Tasks",
                            "text": "Core staff were bogged down by routine queries instead of focusing on complex cases."
                        },
                        {
                            "icon": "🐌",
                            "title": "Processing Lag",
                            "text": "Support bottlenecks slowed down overall operations, including loan application processing."
                        }
                    ]
                }
            },
            {
                "id": "solution",
                "title": "Hyniva's Solution",
                "type": "approach-list",
                "content": {
                    "body": "<p>We implemented a chatbot powered by Natural Language Processing (NLP) to automate routine interactions within the customer portal.</p>",
                    "items": [
                        {
                            "num": "1",
                            "title": "NLP-Powered Chatbot",
                            "desc": "Built with pre-trained capabilities to interpret and respond to queries in a human-like way."
                        },
                        {
                            "num": "2",
                            "title": "Machine Learning",
                            "desc": "Enabled the chatbot to continually improve its performance and accuracy over time."
                        },
                        {
                            "num": "3",
                            "title": "24/7 Availability",
                            "desc": "Provided instant support for common issues, reducing the volume of calls to agents."
                        },
                        {
                            "num": "4",
                            "title": "Workflow Integration",
                            "desc": "Directly integrated into the customer portal to empower users during complex processes like loan applications."
                        }
                    ]
                }
            },
            {
                "id": "impact",
                "title": "Business Impact",
                "type": "impact-strip",
                "content": {
                    "body": "<p>The AI-driven solution transformed the customer support sector for the firm:</p>",
                    "items": [
                        {
                            "value": "24/7",
                            "label": "Service",
                            "desc": "Customers now receive instant, around-the-clock support for common inquiries."
                        },
                        {
                            "value": "⚡",
                            "label": "Processing",
                            "desc": "Loan application processing time was drastically reduced via instant guidance."
                        },
                        {
                            "value": "↓",
                            "label": "Overhead",
                            "desc": "Taking the extra workload off business staff allowed them to focus on complex cases."
                        },
                        {
                            "value": "📈",
                            "label": "Satisfaction",
                            "desc": "Improved resolution speed led to higher overall operational efficiency."
                        }
                    ]
                }
            }
        ]
    }
};
