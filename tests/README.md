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
- Jobs posted in other countries (US, Canada, etc.) → `kvjadapolu@simplecube.co`
- Jobs posted in India → `kvjadapolu@simplecube.co`

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
1. Check `kvjadapolu@simplecube.co` inbox for US applications
2. Check `kvjadapolu@simplecube.co` inbox for Non-US applications
3. Verify subject lines include job IDs
4. Confirm email content is formatted correctly

---

## Email Routing Logic

### Current Rules:

**Routing is based on JOB POSTING LOCATION (where the job is located), NOT applicant location!**

**India Job Postings → kvjadapolu@simplecube.co:**
- Any job posted in India (Bangalore, India / Hyderabad, India / Mumbai, India, etc.)
- Jobs with region="india"

**Onsite Job Postings → kvjadapolu@simplecube.co:**
- All jobs posted in other countries (US, Canada, UK, etc.)
- Examples: Tysons, VA / Toronto, ON / London, UK / Remote (USA)

### Email Recipients:

- **Onsite Jobs (US, Canada, etc.):** `kvjadapolu@simplecube.co`
- **India Jobs:** `kvjadapolu@simplecube.co`

### Important Note:
An applicant from India can apply for a US job, and it will go to `kvjadapolu@simplecube.co` (US hiring team) because the **job** is posted in the US.

---

## Test Coverage

### Onsite Locations Tested:
- ✅ Tysons, VA
- ✅ San Antonio, TX  
- ✅ Los Angeles, CA
- ✅ New York, NY
- ✅ Toronto, ON (Canada)
- ✅ Calgary, AB (Canada)
- ✅ Vancouver, BC (Canada)
- ✅ Remote (USA)

### India Locations Tested:
- ✅ Bengaluru, India
- ✅ Bangalore, India
- ✅ Hyderabad, India
- ✅ Mumbai, India

---

## Troubleshooting

### If unit tests fail:
1. Check the `isIndiaLocation` function in `/src/app/api/send-careers/route.ts`
2. Verify India keyword detection is working correctly
3. Ensure all non-India locations default to kvjadapolu@simplecube.co

### If integration tests fail:
1. Ensure the Next.js dev server is running (`npm run dev`)
2. Verify `RESEND_API_KEY` is configured in `.env.local` or Vercel
3. Check that `RESEND_FROM_EMAIL` uses a verified Resend domain
5. Review API logs for detailed error messages

### Common Issues:

**"Email service is not configured"**
- Missing `RESEND_API_KEY` in `.env.local` or Vercel environment variables

**Resend API errors**
- Verify your sending domain in the Resend dashboard
- Confirm `RESEND_FROM_EMAIL` matches a verified sender address

**Wrong recipient receives email**
- Location format doesn't contain "India" keyword
- Add test case and update `isIndiaLocation` function

---

## Adding New Test Cases

To add new location tests, edit `email-routing.test.js`:

```javascript
const testSuite = {
  "Your Category": [
    { 
      location: "City, Country", 
      role: "Job Title", 
      expected: true  // true for India, false for Onsite
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

