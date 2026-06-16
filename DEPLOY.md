# Deploy for @vpsgr8

## Your live URLs

| Page | URL |
|------|-----|
| **App** | https://vpsgr8.github.io/english-in-100-days/ |
| **School Admin** | https://vpsgr8.github.io/english-in-100-days/admin.html |

> **Important:** GitHub Pages must use the **`gh-pages`** branch (not `main`).

---

## Fix "README showing instead of app"

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **`gh-pages`** → folder **`/ (root)`** → Save
4. Wait 2–3 minutes, then open: https://vpsgr8.github.io/english-in-100-days/

Every `git push` to `main` auto-updates the `gh-pages` branch via GitHub Actions.

---

## Push updates

```bash
cd C:\Users\vis_p\english-in-100-days
git add .
git commit -m "Your update"
git push
```

---

## Firebase on live site (optional)

Guest mode works **without Firebase**. To enable Google/Email sign-in:

1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add authorized domain: `vpsgr8.github.io`
3. GitHub repo → **Settings → Secrets → Actions** → add:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Push any commit → workflow rebuilds with Firebase enabled

See `docs/FIREBASE_PRODUCTION.md` for full setup.
