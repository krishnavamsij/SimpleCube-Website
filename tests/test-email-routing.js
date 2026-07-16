// Test script to verify email routing logic for US locations

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
  
  // List of US state abbreviations with clear boundaries
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

// Test cases
const testCases = [
  { location: "Tysons, VA", role: "Salesforce Solution Architect", expected: true },
  { location: "Tyson, VA", role: "Senior Salesforce Developer", expected: true },
  { location: "San Antonio, TX", role: "Developer", expected: true },
  { location: "Tysons, Virginia (Onsite – 5 Days/Week)", role: "Engagement Manager", expected: true },
  { location: "Toronto, ON", role: "PEGA Developer", expected: false },
  { location: "Bengaluru, India", role: "Salesforce Developer", expected: false },
  { location: "Remote (Anywhere from Canada)", role: "Consultant", expected: false },
];

console.log("🧪 Testing Email Routing Logic\n");
console.log("=" .repeat(70));

let passed = 0;
let failed = 0;

testCases.forEach(({ location, role, expected }) => {
  const result = isUsLocation(location, role);
  const status = result === expected ? "✅ PASS" : "❌ FAIL";
  const recipient = result ? "careers@hyniva.com (US)" : "hr@hyniva.com (Non-US)";
  
  if (result === expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`\n${status}`);
  console.log(`Location: ${location}`);
  console.log(`Role: ${role}`);
  console.log(`Expected US: ${expected}, Got: ${result}`);
  console.log(`→ Email will go to: ${recipient}`);
});

console.log("\n" + "=".repeat(70));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log("✅ All tests passed! Email routing is working correctly.");
} else {
  console.log("❌ Some tests failed. Please review the isUsLocation function.");
}
