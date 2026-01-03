# Google Analytics 4 Campaign Tracking Guide

## What We Just Fixed

Your Shaker website now properly tracks:
- **Campaign visits:** When someone clicks your campaign link
- **Signups:** When someone submits the waitlist form
- **Campaign attribution:** Which campaigns drive the most visitors and signups

---

## How to Test (Do This Now!)

### Step 1: Deploy Your Changes

Since your site is on Vercel, you need to push these changes:

```bash
cd ~/Desktop/shaker
git add index.html script.js
git commit -m "Add GA4 campaign tracking for UTM parameters and signup events"
git push
```

Wait 1-2 minutes for Vercel to deploy.

### Step 2: Test with a Campaign URL

Open this URL in your browser (replace `theshakerapp.space` with your actual domain):

```
https://theshakerapp.space?utm_source=test&utm_medium=social&utm_campaign=ga4_verification
```

### Step 3: Verify in GA4 Real-Time

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your **Shaker** property (G-Q6NGSCLX9V)
3. Click **Reports** (left sidebar) → **Realtime**
4. You should see:
   - **1 user** in the last 30 minutes
   - Event called `campaign_visit` in the event list

### Step 4: Test a Signup

While still on that test URL:
1. Scroll down to the waitlist form
2. Enter a test email (like `test-jan2@example.com`)
3. Submit the form
4. Check your browser console (Right-click → Inspect → Console)
   - You should see: `GA4 signup event sent with campaign: {utm_source: "test", ...}`

5. Go back to GA4 Realtime report
   - You should now see a `signup` event

---

## How to View Campaign Performance in GA4

### Option 1: Real-Time (See What's Happening Now)

**Path:** Reports → Realtime

**What you'll see:**
- Active users right now
- What pages they're on
- What events they're triggering (campaign_visit, signup)

**Good for:** Checking if your campaign links are working immediately.

---

### Option 2: Traffic Acquisition (See Where Visitors Come From)

**Path:** Reports → Acquisition → Traffic acquisition

**What you'll see:**
| Session source | Users | Sessions | Conversions |
|----------------|-------|----------|-------------|
| direct         | 150   | 200      | 5           |
| tiktok         | 80    | 90       | 3           |
| reddit         | 45    | 50       | 1           |

**How to read it:**
- **Session source** = utm_source parameter (tiktok, reddit, etc.)
- **Users** = Unique visitors from that source
- **Sessions** = Total visits (same person can visit twice)
- **Conversions** = Signups (if you set up signup as a conversion - see below)

**Good for:** Comparing which channels drive the most traffic.

---

### Option 3: Campaign Reports (See Individual Campaign Performance)

**Path:** Reports → Acquisition → User acquisition → Change dimension to "Session campaign"

**What you'll see:**
| Campaign name      | Users | Sessions | Signup events |
|--------------------|-------|----------|---------------|
| jan2026_launch     | 120   | 150      | 8             |
| reddit_promo       | 50    | 60       | 2             |

**Good for:** Comparing specific campaigns (jan2026_launch vs feb2026_launch).

---

### Option 4: Custom Exploration (Advanced)

**Path:** Explore → Create new exploration → Free form

**Setup:**
1. **Dimensions:** Session source, Session medium, Session campaign
2. **Metrics:** Active users, Event count (filter: event_name = "signup")
3. **Rows:** Session campaign
4. **Values:** Active users, Signup event count

**What you get:**
A custom report showing exactly what you want to see.

---

## How to Set Up "Signup" as a Conversion

This makes GA4 treat signups as a goal (conversion).

### Steps:

1. Go to **Admin** (bottom left gear icon)
2. Under **Data display**, click **Events**
3. Find the `signup` event in the list
4. Toggle **Mark as conversion** to ON

**Why do this?**
- GA4 will now show signup counts in standard reports
- You can see conversion rates automatically
- Reports will show "Conversions" instead of just "Events"

---

## Campaign Link Templates

Use these templates to create campaign links for different platforms:

### TikTok Campaign
```
https://theshakerapp.space?utm_source=tiktok&utm_medium=social&utm_campaign=jan2026_launch
```

### Reddit Post
```
https://theshakerapp.space?utm_source=reddit&utm_medium=social&utm_campaign=snacklovers_post
```

### Instagram Bio
```
https://theshakerapp.space?utm_source=instagram&utm_medium=social&utm_campaign=bio_link
```

### Twitter/X Thread
```
https://theshakerapp.space?utm_source=twitter&utm_medium=social&utm_campaign=jan_thread
```

### DM to Friend
```
https://theshakerapp.space?utm_source=dm&utm_medium=referral&utm_campaign=friend_share
```

---

## Parameter Breakdown (What Each Means)

| Parameter        | What It Means                  | Example              |
|------------------|--------------------------------|----------------------|
| `utm_source`     | Where traffic comes from       | tiktok, reddit, dm   |
| `utm_medium`     | Type of marketing channel      | social, email, paid  |
| `utm_campaign`   | Specific campaign name         | jan2026_launch       |

**Rules:**
- Use **lowercase** only (tiktok, not TikTok)
- Use **underscores** instead of spaces (jan_2026 not "jan 2026")
- Be **consistent** (always use "tiktok" not sometimes "tik_tok")

---

## Troubleshooting

### "I don't see any data in GA4"

**Possible causes:**
1. **Changes not deployed:** Push to Vercel and wait 1-2 minutes
2. **Wrong URL:** Make sure you're using your live domain (not localhost)
3. **Ad blocker:** Disable browser extensions that block analytics
4. **Wrong property:** Make sure you selected property G-Q6NGSCLX9V

### "I see page_view events but not campaign_visit or signup"

**Check:**
1. Open browser console (Right-click → Inspect → Console)
2. Look for errors or logs
3. Make sure you're using a URL with UTM parameters
4. Try a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### "Data is delayed"

**Normal behavior:**
- **Realtime reports:** Show data within 30 seconds
- **Standard reports:** Can take 24-48 hours to populate
- Always use Realtime for testing!

---

## Next Steps

1. **Test right now** using the steps above
2. **Mark signup as a conversion** in GA4 settings
3. **Create campaign links** for your next TikTok/Reddit post
4. **Check GA4 Realtime** after posting to see if traffic comes through
5. **Review Traffic Acquisition** weekly to compare channel performance

---

## Questions?

- **Where's my data?** Check Realtime first, then wait 24 hours for standard reports
- **How do I export data?** Click "Share" button (top right of any report) → Download CSV
- **Can I see historical data?** Yes! Use the date picker (top right) to select any date range
- **What if I want more metrics?** Use the Explore section to create custom reports

You now have full campaign tracking! Every visitor and signup will be attributed to the source that brought them in.
