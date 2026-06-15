# Deploy for @vpsgr8

## Your live URLs (after push + Pages enabled)

| Page | URL |
|------|-----|
| **App** | https://vpsgr8.github.io/english-in-100-days/ |
| **School Admin** | https://vpsgr8.github.io/english-in-100-days/admin.html |

---

## One-time setup

### 1. Create repo on GitHub
https://github.com/new → name: `english-in-100-days` → Public → Create

### 2. Push (run in project folder)

```bash
cd C:\Users\vis_p\english-in-100-days
git add .
git commit -m "Launch English in 100 Days MVP"
git branch -M main
git remote add origin https://github.com/vpsgr8/english-in-100-days.git
git push -u origin main
```

### 3. Enable GitHub Pages
Repo → **Settings** → **Pages** → Source: **GitHub Actions**

### 4. Firebase (optional)
Add authorized domain: `vpsgr8.github.io`

---

Site goes live in ~2 minutes after push.
