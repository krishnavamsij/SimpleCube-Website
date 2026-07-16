/**
 * Test Application Submission
 * Simulates real job applications to test email routing
 * 
 * NOTE: This will send REAL emails to the configured recipients
 * Run with caution!
 */

const API_URL = process.env.API_URL || 'http://localhost:3000/api/send-careers';

const testApplications = [
  {
    name: "Test Applicant US-VA",
    email: "test.va@example.com",
    location: "Tysons, VA",
    role: "Salesforce Solution Architect",
    jobId: "HYU2026005",
    ctc: "$150,000",
    skills: "Salesforce, MuleSoft, Financial Services Cloud, Data Cloud, Service Cloud",
    expectedRecipient: "careers@hyniva.com (Onsite)"
  },
  {
    name: "Test Applicant US-TX",
    email: "test.tx@example.com",
    location: "San Antonio, TX",
    role: "Genesys Cloud CX Admin",
    jobId: "HYU2026002",
    ctc: "$120,000",
    skills: "Genesys Cloud CX, Salesforce, Contact Center Solutions",
    expectedRecipient: "careers@hyniva.com (Onsite)"
  },
  {
    name: "Test Applicant US-CA",
    email: "test.ca@example.com",
    location: "Los Angeles, CA",
    role: "Senior Software Engineer",
    jobId: "TEST001",
    ctc: "$140,000",
    skills: "React, Node.js, AWS, TypeScript",
    expectedRecipient: "careers@hyniva.com (Onsite)"
  },
  {
    name: "Test Applicant Canada",
    email: "test.canada@example.com",
    location: "Toronto, ON",
    role: "PEGA Developer",
    jobId: "HYC2026001",
    ctc: "CAD 120,000",
    skills: "PEGA, Insurance Domain, Agile",
    expectedRecipient: "careers@hyniva.com (Onsite)"
  },
  {
    name: "Test Applicant India",
    email: "test.india@example.com",
    location: "Bengaluru, India",
    role: "Salesforce Developer",
    jobId: "HYI2026002",
    ctc: "₹2,500,000",
    skills: "Apex, Lightning Web Components, SOQL, Salesforce APIs",
    expectedRecipient: "hr@hyniva.com (India)"
  },
];

async function sendTestApplication(application, index) {
  console.log(`\n📤 Test ${index + 1}: Sending application for ${application.location}`);
  console.log(`   Name: ${application.name}`);
  console.log(`   Email: ${application.email}`);
  console.log(`   Role: ${application.role}`);
  console.log(`   Location: ${application.location}`);
  console.log(`   Expected Recipient: ${application.expectedRecipient}`);

  const formData = new FormData();
  formData.append('name', application.name);
  formData.append('email', application.email);
  formData.append('location', application.location);
  formData.append('role', application.role);
  formData.append('jobId', application.jobId);
  formData.append('ctc', application.ctc);
  formData.append('skills', application.skills);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`   ✅ SUCCESS: Email sent (Message ID: ${data.messageId})`);
      return { success: true, application };
    } else {
      console.log(`   ❌ FAILED: ${data.error}`);
      return { success: false, application, error: data.error };
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return { success: false, application, error: error.message };
  }
}

async function runTestSuite() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 JOB APPLICATION EMAIL TEST SUITE");
  console.log("=".repeat(80));
  console.log("\n⚠️  WARNING: This will send REAL emails!");
  console.log("API Endpoint:", API_URL);
  console.log("\nTesting", testApplications.length, "applications...");
  console.log("=".repeat(80));

  const results = [];

  for (let i = 0; i < testApplications.length; i++) {
    const result = await sendTestApplication(testApplications[i], i);
    results.push(result);
    
    // Wait a bit between requests to avoid rate limiting
    if (i < testApplications.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(80));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((successful / results.length) * 100).toFixed(2)}%`);

  if (failed > 0) {
    console.log("\n❌ Failed Applications:");
    results.filter(r => !r.success).forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.application.name}`);
      console.log(`   Location: ${result.application.location}`);
      console.log(`   Error: ${result.error}`);
    });
  }

  console.log("\n✅ Successful Applications (Check Email Inbox):");
  results.filter(r => r.success).forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.application.name}`);
    console.log(`   Location: ${result.application.location}`);
    console.log(`   Expected Email To: ${result.application.expectedRecipient}`);
  });

  console.log("\n" + "=".repeat(80));
  console.log("\n📧 NEXT STEPS:");
  console.log("1. Check careers@hyniva.com for onsite applications (US, Canada, etc.)");
  console.log("2. Check hr@hyniva.com for India applications");
  console.log("3. Verify each email has correct subject and content");
  console.log("4. Confirm job IDs are included in subject lines");
  console.log("=".repeat(80) + "\n");
}

// Check if running in test mode
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

if (dryRun) {
  console.log("\n🔍 DRY RUN MODE - No emails will be sent\n");
  console.log("Test applications that would be sent:");
  testApplications.forEach((app, index) => {
    console.log(`\n${index + 1}. ${app.name}`);
    console.log(`   Location: ${app.location}`);
    console.log(`   Role: ${app.role}`);
    console.log(`   Expected Recipient: ${app.expectedRecipient}`);
  });
  console.log("\n💡 Run without --dry-run to actually send test emails\n");
} else {
  console.log("\n⚠️  LIVE MODE - Emails will be sent!\n");
  console.log("Press Ctrl+C to cancel, or wait 3 seconds to continue...\n");
  
  setTimeout(() => {
    runTestSuite();
  }, 3000);
}
