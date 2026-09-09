"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0A2F52]">
      <Navbar forceDarkText={true} />

      <main className="pt-32 pb-24 mx-auto w-full max-w-[1400px] px-12 sm:px-16 lg:px-20 xl:px-24 2xl:px-32">
        {/* ── Page Header ── */}
        <motion.div
          animate="visible"
          variants={staggerContainer}
          className="mb-20"
        >
          
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-[72px] font-[900] text-[#0A2F52] tracking-tight leading-[1.05] mb-6 font-display"
          >
            Privacy <span className="text-[#3886CE]">Policy</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-sm leading-relaxed text-slate-600 sm:text-base font-medium max-w-6xl mb-4 text-left"
          >
            This privacy notice for Hyniva company describes how we collect, store, use, and share your information when you use our services:
          </motion.p>
          <motion.p 
            variants={fadeInUp}
            className="text-sm leading-relaxed text-slate-600 sm:text-base font-medium max-w-6xl mb-4 text-left"
          >
            Visit our website at <strong><a href="https://www.hyniva.com/" className="text-[#3886CE] hover:underline">https://www.hyniva.com</a></strong>, or any website of ours that links to this privacy notice.
          </motion.p>
          <motion.p 
            variants={fadeInUp}
            className="text-sm leading-relaxed text-slate-600 sm:text-base font-medium max-w-6xl text-left"
          >
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>.
          </motion.p>
        </motion.div>

        {/* ── Content Sections ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Section 1 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              <strong>In Short: </strong>We collect personal information that you provide to us.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on Services, or otherwise when you contact us.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              <strong>Sensitive Information:</strong> We do not process sensitive information.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed max-w-6xl text-left">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed max-w-6xl text-left">
              We process your personal information for a variety of reasons, depending on how you interact with our Services, including: We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              <strong>In Short: </strong>We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              If you are in the<strong> EU</strong> or <strong>UK</strong>, this section applies to you<em>. </em>
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on to process your personal information. As such, we may rely on the following legal bases to process your personal information:
            </p>
            
            <div className="space-y-3 ml-6">
              <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed max-w-6xl text-left">
                <strong>Consent:</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about withdrawing your consent.
              </p>
              <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
                <strong>Legal Obligations:</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
              </p>
              <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed max-w-6xl text-left">
                <strong>Vital Interests:</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third-party, such as situations involving potential threats to the safety of any person.
              </p>
            </div>

            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              If you are in <strong>Canada</strong>, this section applies to you.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.
            </p>
            <p className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed mb-4 max-w-6xl text-left">
              In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way for investigations and fraud detection and prevention.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">For business transactions provided certain conditions are met</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If it is contained in a witness statement and collection is necessary to assess, process, or settle an insurance claim.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">For identifying injured, ill, or deceased persons and communicating with next of kin.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If it is reasonable to expect collection and use with consent would compromise the availability or accuracy of information and collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If disclosure is required to comply with a subpoena, warrant, court order, or rules of court relating to the production of records.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If the collection is solely for journalistic, artistic, or literary purposes.</li>
              <li className="text-[15px] font-medium text-[#0A2F52]/70 leading-relaxed">If the information is publicly available and is specified by the regulations.</li>
            </ul>
          </motion.div>

          {/* Section 4 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short: </strong>We may share information in specific situations described in this section and/or with the following third-parties.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may need to share your personal information in the following situations:
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left">
              <strong>Business Transfers: </strong>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </p>
          </motion.div>

          {/* Section 5 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left">
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>
          </motion.div>

          {/* Section 6 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">6. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data, we may have collected from children under age 18, please contact us at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>.
            </p>
          </motion.div>

          {/* Section 7 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short: </strong>In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right
            </p>
            
            <div className="space-y-2 ml-6">
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left">(i) to request access and obtain a copy of your personal information;</p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left">(ii) to request rectification or erasure;</p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left">(iii) to restrict the processing of your personal information; and</p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">(iv) if applicable, to data portability.</p>
            </div>

            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you are in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you are in <strong>Switzerland</strong>, you may contact the Federal Data Protection and Information Commissioner.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left">
              If you have questions or comments about your privacy rights, you may email us at <a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a>.
            </p>
          </motion.div>

          {/* Section 8 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left">
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
            </p>
          </motion.div>

          {/* Section 9 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short: </strong>Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              California Civil Code Section 1798.83, also known as the "Shine the Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third-parties for direct marketing purposes and the names and addresses of all third-parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-[#0A2F52] mb-3">CCPA Privacy Notice</h3>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
                The California Code of Regulations defines a "resident" as:
              </p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
                (1) every individual who is in the State of California for other than a temporary or transitory purpose and
              </p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
                (2) every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose
              </p>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left">
                All other individuals are defined as "non-residents."
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If this definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal information.
            </p>

            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">What categories of personal information do we collect?</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We have collected the following categories of personal information in the past twelve. (12) months:
            </p>
            
            {/* CCPA Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full max-w-4xl border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-[#0A2F52]">Category</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-[#0A2F52]">Examples</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-[#0A2F52]">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">A. Identifiers</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">B. Personal information categories listed in the California Customer Records statute</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Name, contact information, education, employment, employment history, and financial information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">C. Protected classification characteristics under California or federal law</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Gender and date of birth</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">D. Commercial information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Transaction information, purchase history, financial details, and payment information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">E. Biometric information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Fingerprints and voiceprints</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">F. Internet or other similar network activity</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <p className="mb-2">Browsing history, search history, online</p>
                      <p className="mb-2">behavior, interest data, and interactions</p>
                      <p className="mb-2">with our and other websites, applications,</p>
                      <p className="mb-2">systems, and advertisements</p>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">G. Geolocation data</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Device location</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <p className="mb-2">Images and audio, video or call recordings</p>
                      <p>created in connection with our business activities</p>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">I. Professional or employment-related information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <p className="mb-2">Business contact details to provide you our Services at a business level or job title, work history, and</p>
                      <p className="mb-2">professional qualifications if you apply for</p>
                      <p>a job with us</p>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">J. Education Information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Student records and directory information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">K. Inferences drawn from other personal information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <p className="mb-2">&nbsp;</p>
                      <p className="mb-2">Inferences drawn from any of the collected</p>
                      <p className="mb-2">personal information listed above to create a profile or summary about, for example,</p>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">L. Sensitive Personal Information</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Government-issued ID numbers, and information relating to race, religion, or sexual orientation.</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">No</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Receiving help through our customer support channels.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Participation in customer surveys or contests; and</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">How do we use and share your personal information?</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              More information about our data collection and sharing practices can be found in this privacy notice.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              You may contact us by email at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>, or by referring to the contact details at the bottom of this document.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you are using an authorized agent to exercise your right to opt out, we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Will your information be shared with anyone else?</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes information on our behalf, following the same strict privacy protection obligations mandated by the CCPA.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Hyniva has not disclosed, sold, or shared any personal information to third-parties for a business or commercial purpose in the preceding twelve (12) months.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Hyniva will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">You can ask for the deletion of your personal information.</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Right to be informed — Request to know</h3>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Depending on the circumstances, you have a right to know:</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Whether we collect and use your personal information.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">The categories of personal information that we collect.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">The purposes for which the collected personal information is used.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">Whether we sell or share personal information to third-parties.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">The categories of personal information that we sold, shared, or disclosed for a business purpose.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">The categories of third-parties to whom personal information was sold, shared, or disclosed for a business purpose.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">The business or commercial purpose for collecting, selling, or sharing personal information; and the specific pieces of personal information we collected about you.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights.</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We will not discriminate against you if you exercise your privacy rights.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Right to Limit Use and Disclosure of Sensitive Personal Information.</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We do not process the consumer's sensitive personal information.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Verification process</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g., phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Other privacy rights</h3>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">You may object to the processing of your personal information.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">You may request correction of your personal data if it is incorrect or no longer relevant or ask to restrict the processing of the information.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">You may request to opt out from future selling or sharing of your personal information to third-parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request submission.</li>
              <li className="text-gray-700 leading-relaxed max-w-6xl text-left">To exercise these rights, you can contact us by email at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</li>
            </ul>
          </motion.div>

          {/* Section 10 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">10. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short: </strong>Yes, if you are a resident of Virginia, you may be granted specific rights regarding access to and use of your personal information.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Virginia CDPA Privacy Notice</h3>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
                Under the Virginia Consumer Data Protection Act (CDPA):
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 leading-relaxed max-w-6xl text-left"><strong>"Consumer"</strong> means a natural person who is a resident of the Commonwealth acting only in an individual or household context. It does not include a natural person acting in a commercial or employment context.</li>
                <li className="text-gray-700 leading-relaxed max-w-6xl text-left"><strong>"Personal data"</strong> means any information that is linked or reasonably linkable to an identified or identifiable natural person. "Personal data" does not include de-identified data or publicly available information.</li>
                <li className="text-gray-700 leading-relaxed max-w-6xl text-left"><strong>"Sale of personal data"</strong> means the exchange of personal data for monetary consideration.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
                If this definition "consumer" applies to you, we must adhere to certain rights and obligations regarding your personal data.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              The information we collect, use, and disclose about you will vary depending on how you interact with Hyniva and our Services.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Hyniva has not sold any personal data to third-parties for business or commercial purposes. Hyniva will not sell personal data in the future belonging to website visitors, users, and other consumers.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Exercise your rights provided under Virginia CDPA. More information about our data collection and sharing practices can be found in this privacy notice.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              You may contact us by email at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>, by submitting a data subject access request, or by referring to contact details at the bottom of this document.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you are using an authorized agent to exercise your rights, we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Verification process</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may request that you provide additional information reasonably necessary to verify you and your consumer's request. If you submit a request through an authorized agent, we may need to collect additional information to verify your identity before processing your request.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Upon receiving your request, we will respond without undue delay, but in all cases, within forty-five (45) days of receipt. The response period may be extended once by forty-five (45) additional days when reasonably necessary. We will inform you of any such extension within the initial 45-day response period, together with the reason for the extension.
            </p>
            <h3 className="text-lg font-bold text-[#0A2F52] mb-3">Right to appeal</h3>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If we decline to act regarding your request, we will inform you of our decision and the reasoning behind it. If you wish to appeal our decision, please email us at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>. Within sixty (60) days of receipt of an appeal, we will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may contact the Attorney General to submit a complaint.
            </p>
          </motion.div>

          {/* Section 11 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              <strong>In Short: </strong>Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
            </p>
          </motion.div>

          {/* Section 12 */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2F52] mb-4">12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please send an email to <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong>
            </p>
            <p className="text-gray-700 leading-relaxed max-w-6xl text-left mb-4">
              If you have questions or comments about this notice, you may email us at <strong><a href="mailto:hr@hyniva.com" className="text-[#3886CE] hover:underline">hr@hyniva.com</a></strong> or by post to:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-medium mb-2">Hyniva LLC</p>
              <p className="text-gray-700 mb-2">13333 Blanco Road, Suite 206</p>
              <p className="text-gray-700">San Antonio, TX – 78216, United States.</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
