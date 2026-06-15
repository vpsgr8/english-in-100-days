# Deploy to GitHub Pages (100% Free)

Host **English in 100 Days** at:

```
https://YOUR_USERNAME.github.io/english-in-100-days/
```

No Netlify, no credit card, no server cost.

---

## Step 1 — Create GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `english-in-100-days`
3. Visibility: **Public** (required for free Pages on personal accounts)
4. Do **not** add README (you already have one)
5. Click **Create repository**

---

## Step 2 — Push code to GitHub

Open terminal in the project folder:

```bash
cd C:\Users\vis_p\english-in-100-days

git init
git add .
git commit -m "Initial commit — English in 100 Days MVP"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/english-in-100-days.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 3 — Enable GitHub Pages

1. Open your repo on GitHub
2. **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - **Source:** `GitHub Actions`
4. Save — do not pick "Deploy from branch" (we use Actions)

---

## Step 4 — Deploy (automatic)

Every push to `main` runs `.github/workflows/github-pages.yml` and deploys the `mvp/` folder.

**First deploy:**
1. Push code (Step 2)
2. Go to **Actions** tab → watch "Deploy to GitHub Pages" workflow
3. Wait ~1–2 minutes until green ✓
4. **Settings → Pages** shows your live URL

**Manual deploy:** Actions → "Deploy to GitHub Pages" → **Run workflow**

---

## Step 5 — Open your live app

```
https://YOUR_USERNAME.github.io/english-in-100-days/
```

Also works:
- `https://YOUR_USERNAME.github.io/english-in-100-days/admin.html` — School admin

---

## Optional — Firebase & Razorpay on GitHub Pages

Secrets are **not** in the repo. Add them in GitHub:

1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. Add each secret:

| Secret name | Value |
|-------------|-------|
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `xxx.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | `xxx.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | sender id |
| `VITE_FIREBASE_APP_ID` | app id |
| `VITE_RAZORPAY_KEY_ID` | `rzp_test_...` or `rzp_live_...` |

3. Push any commit → workflow regenerates `config.local.js` with your keys

### Firebase authorized domains

Firebase Console → Authentication → Settings → **Authorized domains** → Add:

```
YOUR_USERNAME.github.io
```

---

## Optional — Custom domain (still free)

1. Buy domain (e.g. `englishin100days.in`)
2. GitHub repo → **Settings → Pages → Custom domain**
3. Enter domain → GitHub shows DNS records
4. At registrar, add:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `YOUR_USERNAME.github.io` |

5. Enable **Enforce HTTPS**
6. Add custom domain to Firebase authorized domains

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 on main URL | Enable Pages source = **GitHub Actions**; check Actions tab for errors |
| Blank page | Open browser console; ensure `lessons.json` loads (not `file://`) |
| Firebase auth fails | Add `*.github.io` to Firebase authorized domains |
| Styles missing | Hard refresh `Ctrl+Shift+R` |
| Workflow failed | Actions tab → click failed run → read error log |
| Secrets not applied | Secret names must match exactly (`VITE_FIREBASE_API_KEY`, etc.) |

---

## GitHub Pages vs Netlify

| | GitHub Pages | Netlify |
|--|--------------|---------|
| Cost | **Free** | Free tier |
| Custom domain | Yes (free) | Yes |
| HTTPS | Yes (auto) | Yes |
| Build | GitHub Actions | Netlify build |
| Best for | Open-source, free forever | Advanced CI/CD |

You can use **either** — project includes both configs.

---

## Update site after changes

```bash
git add .
git commit -m "Update lessons"
git push
```

GitHub Actions redeploys automatically in ~2 minutes.
