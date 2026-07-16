/**
 * Email Routing Test Suite
 * Tests the isIndiaLocation function for proper email routing
 * 
 * Routing Logic:
 * - Jobs posted in India → hr@hyniva.com
 * - Jobs posted in other countries (US, Canada, etc.) → careers@hyniva.com
 * 
 * NOTE: Routing is based on JOB LOCATION, not applicant location!
 */

function isIndiaLocation(jobLocation, jobRegion) {
  // First check if region is explicitly set to "india"
  if (jobRegion && jobRegion.toLowerCase() === 'india') {
    return true;
  }
  
  // Otherwise check if job location contains "India"
  const location = jobLocation.toLowerCase();
  return location.includes('india');
}

const CAREERS_EMAIL = "careers@hyniva.com";
const INDIA_HR_EMAIL = "hr@hyniva.com";

// Test suite - Based on JOB locations
const testSuite = {
  "US Job Postings": [
    { location: "Tysons, VA", role: "", expected: false },
    { location: "San Antonio, TX", role: "", expected: false },
    { location: "New York, NY", role: "", expected: false },
    { location: "Los Angeles, CA", role: "", expected: false },
    { location: "Chicago, IL", role: "", expected: false },
    { location: "Boston, MA", role: "", expected: false },
    { location: "Seattle, WA", role: "", expected: false },
    { location: "Austin, TX", role: "", expected: false },
    { location: "Miami, FL", role: "", expected: false },
    { location: "Dallas, Texas", role: "", expected: false },
  ],
  
  "Canada Job Postings": [
    { location: "Toronto, ON", role: "", expected: false },
    { location: "Toronto, ON (Onsite)", role: "", expected: false },
    { location: "Calgary, AB", role: "", expected: false },
    { location: "Vancouver, BC", role: "", expected: false },
    { location: "Montreal, Quebec", role: "", expected: false },
  ],
  
  "India Job Postings": [
    { location: "Bengaluru, India", role: "", expected: true },
    { location: "Bangalore, India", role: "", expected: true },
    { location: "Bangalore, India (Work From Office)", role: "", expected: true },
    { location: "Hyderabad, India", role: "", expected: true },
    { location: "Mumbai, India", role: "", expected: true },
  ],
  
  "Edge Cases": [
    { location: "Remote (USA)", role: "", expected: false },
    { location: "Remote", role: "", expected: false },
    { location: "Remote, India", role: "", expected: true },
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

    tests.forEach(({ location, expected }, index) => {
      totalTests++;
      const result = isIndiaLocation(location, ""); // jobRegion is empty, so it checks location
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
        failures.push({ category, location, expected, got: result });
        console.log(`  ❌ Test ${index + 1}: FAIL`);
      }

      console.log(`     Job Location: ${location}`);
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
      console.log(`   Job Location: ${failure.location}`);
      console.log(`   Expected India Job: ${failure.expected}, Got: ${failure.got}`);
    });
  }

  console.log("\n" + "=".repeat(80));
  
  if (totalFailed === 0) {
    console.log("✅ ALL TESTS PASSED! Email routing is working correctly.");
    console.log("  - India job postings → hr@hyniva.com");
    console.log("  - All other job postings → careers@hyniva.com");
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
