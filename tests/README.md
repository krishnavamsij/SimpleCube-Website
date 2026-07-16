# Email Routing Test Suite

This folder contains test files to verify that job application emails are routed correctly to the appropriate recipients based on location.

## Test Files

### 1. `email-routing.test.js`
Unit tests for the `isUsLocation` function logic. Tests various location formats without sending actual emails.

**Usage:**
```bash
node tests/email-routing.test.js
```

**What it tests:**
- US locations with state abbreviations (VA, TX, CA, etc.)
- US locations with full state names (Virginia, Texas, etc.)
- US locations with USA/US keywords
- Canadian locations (should route to Non-US email)
- Indian locations (should route to Non-US email)
- Edge cases

**Expected Results:**
- US locations → `careers@hyniva.com`
- Non-US locations → `hr@hyniva.com`

---

### 2. `send-test-applications.js`
Integration test that sends real test applications through the API.

**⚠️ WARNING:** This sends REAL emails!

**Usage:**

**Dry run (no emails sent):**
```bash
node tests/send-test-applications.js --dry-run
```

**Live test (sends real emails):**
```bash
node tests/send-test-applications.js
```

**What it tests:**
- Real API calls to `/api/send-careers`
- Email delivery to correct recipients
- Different US locations (VA, TX, CA)
- Non-US locations (Canada, India)

**After running live tests:**
1. Check `careers@hyniva.com` inbox for US applications
2. Check `hr@hyniva.com` inbox for Non-US applications
3. Verify subject lines include job IDs
4. Confirm email content is formatted correctly

---

## Email Routing Logic

### Current Rules:

1. **Explicit US mentions** → US email
   - Contains "USA", "United States", "(US)", etc.

2. **Non-US keywords** → Non-US email (priority check)
   - Contains "Canada", "India", "Toronto", "Bengaluru", etc.

3. **US state names** → US email
   - Contains full state names like "Virginia", "Texas", etc.

4. **US state abbreviations** → US email
   - Matches pattern: `, VA` or `(VA)` or similar with 2-letter state code

### Email Recipients:

- **US Applications:** `careers@hyniva.com`
- **Non-US Applications:** `hr@hyniva.com`

---

## Test Coverage

### US Locations Tested:
- ✅ Tysons, VA
- ✅ San Antonio, TX  
- ✅ Los Angeles, CA
- ✅ New York, NY
- ✅ Chicago, IL
- ✅ Boston, MA
- ✅ Seattle, WA
- ✅ Austin, TX
- ✅ Miami, FL
- ✅ Dallas, Texas (full state name)
- ✅ Phoenix, Arizona
- ✅ Denver, Colorado
- ✅ Remote (USA)

### Non-US Locations Tested:
- ✅ Toronto, ON (Canada)
- ✅ Calgary, AB (Canada)
- ✅ Vancouver, BC (Canada)
- ✅ Montreal, Quebec (Canada)
- ✅ Bengaluru, India
- ✅ Bangalore, India
- ✅ Remote (Canada)

---

## Troubleshooting

### If unit tests fail:
1. Check the `isUsLocation` function in `/src/app/api/send-careers/route.ts`
2. Verify state abbreviation patterns match correctly
3. Ensure non-US keyword filtering happens before US checks

### If integration tests fail:
1. Ensure the Next.js dev server is running (`npm run dev`)
2. Verify AWS SES credentials are configured in `.env.local`
3. Check that sender email is verified in AWS SES
4. Check recipient emails are verified (if in SES sandbox mode)
5. Review API logs for detailed error messages

### Common Issues:

**"Email service is not configured"**
- Missing `SES_SOURCE_EMAIL` in `.env.local`

**"AccessDenied" error**
- AWS IAM user lacks `ses:SendEmail` permission
- Check AWS console → IAM → User permissions

**"MessageRejected" error**
- Email address not verified in SES (sandbox mode)
- Invalid email format

**Wrong recipient receives email**
- Location format doesn't match detection patterns
- Add test case and update `isUsLocation` function

---

## Adding New Test Cases

To add new location tests, edit `email-routing.test.js`:

```javascript
const testSuite = {
  "Your Category": [
    { 
      location: "City, State", 
      role: "Job Title", 
      expected: true  // true for US, false for Non-US
    },
  ],
};
```

---

## Deployment Checklist

Before deploying changes to production:

1. ✅ Run unit tests: `node tests/email-routing.test.js`
2. ✅ All unit tests pass
3. ✅ Review any failed test cases
4. ✅ Test with dry run: `node tests/send-test-applications.js --dry-run`
5. ✅ Optional: Send live test emails (1-2 samples)
6. ✅ Verify emails arrive at correct inboxes
7. ✅ Check email content and formatting
8. ✅ Deploy to production

---

