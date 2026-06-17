# Google AdSense — Domain Requirements

AdSense **does not accept** GitHub project URLs like:

```
https://englishlearner.store/english-in-100-days/   ❌ rejected
```

Google requires a **top-level site URL**, e.g. a custom domain or your **user** GitHub Pages root:

```
https://englishin100days.in          ✅ custom domain (recommended)
https://englishlearner.store             ✅ custom domain (live)
```

---

## Option A — Custom domain (recommended)

Best for AdSense, branding, and Razorpay.

### 1. Buy a domain

Examples: `englishin100days.in`, `learnenglish100.in` (~₹500–900/year on GoDaddy, Namecheap, Google Domains).

### 2. Add DNS records

At your domain registrar, add:

| Type | Name | Value |
|------|------|--------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `vpsgr8.github.io` (optional) |

### 3. Tell GitHub Pages

1. Copy `mvp/CNAME.example` → `mvp/CNAME`
2. Edit `mvp/CNAME` — one line only, your domain:

```
englishin100days.in
```

3. GitHub repo → **Settings** → **Pages** → **Custom domain** → enter the same domain → **Save**
4. Enable **Enforce HTTPS** when available

### 4. Register in AdSense

Use:

```
https://englishin100days.in
```

(or `https://www.englishin100days.in` — pick one and stick with it)

### 5. Add GitHub Secret (optional)

`VITE_SITE_URL` = `https://englishin100days.in` for future SEO/meta use.

---

## Option B — User GitHub Pages root (`vpsgr8.github.io`)

Use only if you **do not** have a custom domain yet.

### 1. Create repository

New repo named exactly: **`vpsgr8.github.io`** (must match your username).

### 2. Deploy this app to that repo

Either push the same `mvp/` workflow to that repo, or mirror `gh-pages` branch from `english-in-100-days`.

Your live URL becomes:

```
https://englishlearner.store/
```

(not `/english-in-100-days/`)

### 3. Register in AdSense

```
https://vpsgr8.github.io
```

Google suggested this format — use **no trailing path**.

---

## After domain is live

1. Add GitHub Secret: `VITE_ADSENSE_CLIENT_ID` = `ca-pub-XXXXXXXX`
2. Re-run **Deploy to GitHub Pages** workflow
3. Confirm `https://YOUR-DOMAIN/ads.txt` loads
4. In AdSense → **Sites** → add the same URL you use in the browser
5. Enable **Auto ads** in AdSense dashboard
6. Approval can take a few days; ads may take 24–48h after approval

---

## Premium = ad-free

Paying users (`plan: premium`) do not see ads — configured in `mvp/js/adsense.js`.
