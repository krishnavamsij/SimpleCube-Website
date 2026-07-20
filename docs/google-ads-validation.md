# Google Ads Tag Validation Guide

## Testing Methods

### 1. Browser DevTools Method
1. Start your dev server: `npm run dev`
2. Open your site in a browser (e.g., http://localhost:3000)
3. Open DevTools (F12 or right-click → Inspect)
4. Go to **Network** tab
5. Filter by "gtag" or search for "googletagmanager.com"
6. Look for requests to:
   - `https://www.googletagmanager.com/gtag/js?id=AW-18306532184`
   - Status should be 200 (successful)

### 2. View Page Source
1. Right-click on page → View Page Source (Ctrl+U)
2. Search for `AW-18306532184`
3. You should see the script tags in the `<head>` section

### 3. Console Check
Open browser console (F12 → Console tab) and run:
```javascript
// Check if dataLayer exists
console.log(window.dataLayer);

// Check if gtag function exists
console.log(typeof gtag);
```

Should see the dataLayer array and gtag as "function"

### 4. Google Tag Assistant (Recommended)
1. Install [Google Tag Assistant Chrome Extension](https://tagassistant.google.com/)
2. Visit your website
3. Click the extension icon
4. Should show "Google Ads Conversion Tracking (AW-18306532184)" with green status

### 5. Google Ads Dashboard
1. Go to [Google Ads](https://ads.google.com/)
2. Navigate to **Tools & Settings** → **Measurement** → **Conversions**
3. Check the tag status - it may take 24-48 hours to show as "Active"
4. Look for "Tag Status: Unverified" → should change to "Recording conversions" after verified

### 6. Preview in Google Tag Manager (Alternative)
If you move the tag to GTM later:
1. Go to your GTM workspace
2. Click **Preview** button
3. Enter your website URL
4. Debug mode will show all tags firing

## What to Look For

✅ **Good signs:**
- Script loads successfully (200 status)
- No console errors related to gtag
- dataLayer array exists
- Tag Assistant shows green check
- Network requests to googletagmanager.com

❌ **Problems to watch for:**
- 404 errors on gtag.js
- Console errors: "gtag is not defined"
- Ad blockers preventing the script (test in incognito)
- CSP (Content Security Policy) blocking the script

## Testing Conversions
To test actual conversion tracking:
1. Set up a conversion action in Google Ads dashboard
2. Add conversion event code where needed (e.g., form submissions)
3. Test the conversion action
4. Check Google Ads → Conversions → "Recent conversions" (may take hours to appear)

## Notes
- Tags may take 24-48 hours to fully verify in Google Ads
- Use incognito mode to avoid ad blocker interference
- The global site tag works on all pages automatically due to root layout implementation
