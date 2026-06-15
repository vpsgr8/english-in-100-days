# Custom Domain on Netlify

Connect **englishin100days.in** (or your domain) to the MVP.

---

## Prerequisites

- Netlify account with site deployed (`npm run deploy` or drag `mvp/` folder)
- Domain purchased (Namecheap, GoDaddy, Google Domains, etc.)
- ~15 minutes + up to 48h DNS propagation (usually &lt; 1 hour)

---

## Step 1 — Deploy to Netlify (if not done)

```bash
cd english-in-100-days
npm install -g netlify-cli
netlify login
netlify init          # link to new site
npm run deploy        # or: netlify deploy --dir=mvp --prod
```

Note your Netlify URL: `https://your-site-name.netlify.app`

---

## Step 2 — Add custom domain in Netlify

1. Open [app.netlify.com](https://app.netlify.com) → your site
2. **Domain management** → **Add a domain**
3. Enter: `englishin100days.in`
4. Also add: `www.englishin100days.in`
5. Netlify shows **DNS records** to configure

---

## Step 3 — Configure DNS at your registrar

### Option A — Use Netlify DNS (recommended)

1. Netlify → Domain → **Set up Netlify DNS**
2. Copy Netlify nameservers (e.g. `dns1.p01.nsone.net`)
3. At your registrar → Nameservers → paste Netlify NS
4. Wait for propagation

### Option B — Keep registrar DNS (manual records)

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `75.2.60.5` |
| `CNAME` | `www` | `your-site-name.netlify.app` |

> Netlify shows exact values in the dashboard — use those if they differ.

---

## Step 4 — Enable HTTPS

1. Netlify → Domain → **HTTPS**
2. **Verify DNS** → **Provision certificate** (Let's Encrypt, free)
3. Enable **Force HTTPS** redirect
4. Enable **HSTS** (optional, after testing)

---

## Step 5 — Set primary domain

1. Domain settings → set `englishin100days.in` as **primary**
2. Redirect `www` → apex (or vice versa — pick one)

---

## Step 6 — Update app URLs

Edit these files with your real domain:

| File | What to change |
|------|----------------|
| `mvp/sitemap.xml` | `https://englishin100days.in/` |
| `mvp/robots.txt` | Sitemap URL |
| `mvp/index.html` | `og:url` meta (add if missing) |
| Firebase Console | Authorized domains (see FIREBASE_PRODUCTION.md) |
| Razorpay Dashboard | Webhook URL |

---

## Step 7 — Production config on Netlify

Set environment variables in **Site settings → Environment variables**:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_RAZORPAY_KEY_ID=rzp_live_...
```

Update `netlify.toml` build command (already configured):

```toml
[build]
  publish = "mvp"
  command = "node scripts/generate-config.js"
```

Deploy:

```bash
netlify deploy --prod
```

---

## Step 8 — Verify

- [ ] `https://englishin100days.in` loads the app
- [ ] `https://www.` redirects correctly
- [ ] Padlock (HTTPS) shows in browser
- [ ] `https://englishin100days.in/admin.html` works
- [ ] `https://englishin100days.in/manifest.json` loads
- [ ] Google sign-in works (domain authorized in Firebase)
- [ ] Razorpay test payment works

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| DNS not resolving | Wait 1–24h; use [dnschecker.org](https://dnschecker.org) |
| Certificate pending | DNS must point to Netlify first |
| Firebase auth fails | Add domain to Firebase → Authorized domains |
| 404 on refresh | `netlify.toml` SPA redirect should be present |
| admin.html 404 | File must exist in `mvp/admin.html` |

---

## Cost estimate

| Item | Cost |
|------|------|
| Domain (.in) | ₹500–800/year |
| Netlify free tier | ₹0 |
| SSL certificate | ₹0 (Let's Encrypt) |
| **Total** | **~₹600/year** for domain only |
