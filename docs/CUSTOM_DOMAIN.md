# Custom domain — englishlearner.store

The live site is served from GitHub Pages (`vpsgr8/vpsgr8.github.io`) with custom domain **englishlearner.store**.

## 1. DNS (at your domain registrar)

### Apex (`englishlearner.store`)

Add **four A records** for `@`:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Optional `www`

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `vpsgr8.github.io` |

Then in GitHub → **Settings → Pages → Custom domain**, enter `englishlearner.store` and enable **Enforce HTTPS** once DNS verifies.

## 2. Repo

`mvp/CNAME` contains:

```
englishlearner.store
```

This file is deployed with the site on every push to `main`.

## 3. Third-party dashboards

After DNS is live, update authorized domains / site URLs in:

| Service | Add |
|---------|-----|
| **Google AdSense** | `englishlearner.store` |
| **Razorpay** | `englishlearner.store` |
| **Google Search Console** | `https://englishlearner.store` |

## 4. Verify

- https://englishlearner.store/
- https://englishlearner.store/ads.txt
- https://englishlearner.store/sitemap.xml

DNS can take up to 24–48 hours; GitHub HTTPS certificate may take up to 24 hours after DNS verifies.
