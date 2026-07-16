/**
 * Email Routing Test Suite
 * Tests the isIndiaLocation function for proper email routing
 * 
 * New Routing Logic:
 * - India locations → hr@hyniva.com
 * - All other onsite locations (US, Canada, etc.) → careers@hyniva.com
 */

function isIndiaLocation(location, role) {
  const value = `${location} ${role}`.toLowerCase();
  
  // Check if location contains "India"
  return value.includes('india');
}

const CAREERS_EMAIL = "careers@hyniva.com";
const INDIA_HR_EMAIL = "hr@hyniva.com";

// Test suite
const testSuite = {
  "US Locations - State Abbreviations": [
    { location: "Tysons, VA", role: "Salesforce Solution Architect", expected: false },
    { location: "Tyson, VA", role: "Senior Salesforce Developer", expected: false },
    { location: "San Antonio, TX", role: "Genesys Cloud CX Admin", expected: false },
    { location: "New York, NY", role: "Software Engineer", expected: false },
    { location: "Los Angeles, CA", role: "Full Stack Developer", expected: false },
    { location: "Chicago, IL", role: "Data Engineer", expected: false },
    { location: "Boston, MA", role: "DevOps Engineer", expected: false },
    { location: "Seattle, WA", role: "Cloud Architect", expected: false },
    { location: "Austin, TX", role: "Product Manager", expected: false },
    { location: "Miami, FL", role: "UI/UX Designer", expected: false },
  ],
  
  "US Locations - Full State Names": [
    { location: "Tysons, Virginia (Onsite – 5 Days/Week)", role: "Engagement Manager", expected: false },
    { location: "Dallas, Texas", role: "Backend Developer", expected: false },
    { location: "Phoenix, Arizona", role: "QA Engineer", expected: false },
    { location: "Denver, Colorado", role: "Scrum Master", expected: false },
    { location: "Portland, Oregon", role: "Technical Lead", expected: false },
  ],
  
  "US Locations - With USA/US Keywords": [
    { location: "Remote (USA)", role: "Software Engineer", expected: false },
    { location: "United States (Remote)", role: "Developer", expected: false },
    { location: "Anywhere in USA", role: "Consultant", expected: false },
  ],
  
  "Canada Locations": [
    { location: "Toronto, ON", role: "PEGA Developer", expected: false },
    { location: "Toronto, ON (Onsite)", role: "Developer", expected: false },
    { location: "Calgary, AB", role: "RADAR Rating Expert", expected: false },
    { location: "Vancouver, BC", role: "Data Governance Consultant", expected: false },
    { location: "Remote (Anywhere from Canada)", role: "SAP Consultant", expected: false },
    { location: "Montreal, Quebec", role: "Tech Lead", expected: false },
  ],
  
  "India Locations": [
    { location: "Bengaluru, India", role: "Salesforce Developer", expected: true },
    { location: "Bangalore, India", role: "Genesys Integration Specialist", expected: true },
    { location: "Hyderabad, India", role: "Java Developer", expected: true },
    { location: "Mumbai, India", role: "React Developer", expected: true },
  ],
  
  "Edge Cases": [
    { location: "Remote", role: "Developer in USA", expected: false },
    { location: "Remote", role: "Developer (US)", expected: false },
    { location: "Remote", role: "Developer", expected: false },
    { location: "Remote, India", role: "Developer", expected: true },
  ],
};

function runTests() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 EMAIL ROUTING TEST SUITE");
  console.log("=".repeat(80) + "\n");

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const failures = [];

  Object.entries(testSuite).forEach(([category, tests]) => {
    console.log(`\n📋 ${category}`);
    console.log("-".repeat(80));

    let categoryPassed = 0;
    let categoryFailed = 0;

    tests.forEach(({ location, role, expected }, index) => {
      totalTests++;
      const result = isIndiaLocation(location, role);
      const recipient = result ? INDIA_HR_EMAIL : CAREERS_EMAIL;
      const expectedRecipient = expected ? INDIA_HR_EMAIL : CAREERS_EMAIL;
      const passed = result === expected;

      if (passed) {
        categoryPassed++;
        totalPassed++;
        console.log(`  ✅ Test ${index + 1}: PASS`);
      } else {
        categoryFailed++;
        totalFailed++;
        failures.push({ category, location, role, expected, got: result });
        console.log(`  ❌ Test ${index + 1}: FAIL`);
      }

      console.log(`     Location: ${location}`);
      console.log(`     Role: ${role}`);
      console.log(`     Expected: ${expectedRecipient}`);
      console.log(`     Got: ${recipient}`);
      
      if (!passed) {
        console.log(`     ⚠️  MISMATCH DETECTED!`);
      }
      console.log();
    });

    console.log(`  Category Results: ${categoryPassed} passed, ${categoryFailed} failed`);
  });

  console.log("\n" + "=".repeat(80));
  console.log("📊 FINAL RESULTS");
  console.log("=".repeat(80));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(2)}%`);

  if (failures.length > 0) {
    console.log("\n❌ FAILED TESTS:");
    console.log("-".repeat(80));
    failures.forEach((failure, index) => {
      console.log(`\n${index + 1}. ${failure.category}`);
      console.log(`   Location: ${failure.location}`);
      console.log(`   Role: ${failure.role}`);
      console.log(`   Expected India: ${failure.expected}, Got: ${failure.got}`);
    });
  }

  console.log("\n" + "=".repeat(80));
  
  if (totalFailed === 0) {
    console.log("✅ ALL TESTS PASSED! Email routing is working correctly.");
    console.log("  - India locations → hr@hyniva.com");
    console.log("  - All other onsite locations → careers@hyniva.com");
    console.log("=".repeat(80) + "\n");
    return true;
  } else {
    console.log("❌ SOME TESTS FAILED! Please review the isIndiaLocation function.");
    console.log("=".repeat(80) + "\n");
    return false;
  }
}

// Run the tests
const success = runTests();
process.exit(success ? 0 : 1);
