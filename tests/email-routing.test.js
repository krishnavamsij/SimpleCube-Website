/**
 * Email Routing Test Suite
 * Tests the isUsLocation function for proper email routing
 */

function isUsLocation(location, role) {
  const value = `${location} ${role}`.toLowerCase();
  
  // Check for explicit USA mentions
  if (
    value.includes("usa") ||
    value.includes("united states") ||
    value.includes(" us)") ||
    value.includes("(us")
  ) {
    return true;
  }
  
  // Check for explicit non-US countries/regions first
  const nonUSKeywords = ['canada', 'india', 'toronto', 'bengaluru', 'bangalore', 'ontario', 'quebec', 'alberta', 'british columbia'];
  if (nonUSKeywords.some(keyword => value.includes(keyword))) {
    return false;
  }
  
  // List of US state names
  const usStates = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 
    'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 
    'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 
    'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 
    'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 
    'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 
    'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 
    'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming', 'tysons'
  ];
  
  // Check for full state names
  if (usStates.some(state => value.includes(state))) {
    return true;
  }
  
  // Check for state abbreviations with clear delimiters (comma or parenthesis before)
  const stateAbbrevPattern = /[,(]\s*(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)[\s,)]/i;
  
  return stateAbbrevPattern.test(value);
}

const US_EMAIL = "careers@hyniva.com";
const NON_US_EMAIL = "hr@hyniva.com";

// Test suite
const testSuite = {
  "US Locations - State Abbreviations": [
    { location: "Tysons, VA", role: "Salesforce Solution Architect", expected: true },
    { location: "Tyson, VA", role: "Senior Salesforce Developer", expected: true },
    { location: "San Antonio, TX", role: "Genesys Cloud CX Admin", expected: true },
    { location: "New York, NY", role: "Software Engineer", expected: true },
    { location: "Los Angeles, CA", role: "Full Stack Developer", expected: true },
    { location: "Chicago, IL", role: "Data Engineer", expected: true },
    { location: "Boston, MA", role: "DevOps Engineer", expected: true },
    { location: "Seattle, WA", role: "Cloud Architect", expected: true },
    { location: "Austin, TX", role: "Product Manager", expected: true },
    { location: "Miami, FL", role: "UI/UX Designer", expected: true },
  ],
  
  "US Locations - Full State Names": [
    { location: "Tysons, Virginia (Onsite – 5 Days/Week)", role: "Engagement Manager", expected: true },
    { location: "Dallas, Texas", role: "Backend Developer", expected: true },
    { location: "Phoenix, Arizona", role: "QA Engineer", expected: true },
    { location: "Denver, Colorado", role: "Scrum Master", expected: true },
    { location: "Portland, Oregon", role: "Technical Lead", expected: true },
  ],
  
  "US Locations - With USA/US Keywords": [
    { location: "Remote (USA)", role: "Software Engineer", expected: true },
    { location: "United States (Remote)", role: "Developer", expected: true },
    { location: "Anywhere in USA", role: "Consultant", expected: true },
  ],
  
  "Non-US Locations - Canada": [
    { location: "Toronto, ON", role: "PEGA Developer", expected: false },
    { location: "Toronto, ON (Onsite)", role: "Developer", expected: false },
    { location: "Calgary, AB", role: "RADAR Rating Expert", expected: false },
    { location: "Vancouver, BC", role: "Data Governance Consultant", expected: false },
    { location: "Remote (Anywhere from Canada)", role: "SAP Consultant", expected: false },
    { location: "Montreal, Quebec", role: "Tech Lead", expected: false },
  ],
  
  "Non-US Locations - India": [
    { location: "Bengaluru, India", role: "Salesforce Developer", expected: false },
    { location: "Bangalore, India", role: "Genesys Integration Specialist", expected: false },
    { location: "Hyderabad, India", role: "Java Developer", expected: false },
    { location: "Mumbai, India", role: "React Developer", expected: false },
  ],
  
  "Edge Cases": [
    { location: "Remote", role: "Developer in USA", expected: true },
    { location: "Remote", role: "Developer (US)", expected: true },
    { location: "Remote", role: "Developer", expected: false },
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
      const result = isUsLocation(location, role);
      const recipient = result ? US_EMAIL : NON_US_EMAIL;
      const expectedRecipient = expected ? US_EMAIL : NON_US_EMAIL;
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
      console.log(`   Expected US: ${failure.expected}, Got: ${failure.got}`);
    });
  }

  console.log("\n" + "=".repeat(80));
  
  if (totalFailed === 0) {
    console.log("✅ ALL TESTS PASSED! Email routing is working correctly.");
    console.log("=".repeat(80) + "\n");
    return true;
  } else {
    console.log("❌ SOME TESTS FAILED! Please review the isUsLocation function.");
    console.log("=".repeat(80) + "\n");
    return false;
  }
}

// Run the tests
const success = runTests();
process.exit(success ? 0 : 1);
