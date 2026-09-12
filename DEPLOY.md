# Deploying your Y2K portfolio as a regular static website

This app is now **fully static** — no backend needed. The contact form uses [FormSubmit](https://formsubmit.co) which delivers messages straight to `gurjevanbhatti@gmail.com`.

## 1) One-time: activate FormSubmit
The **first** time anyone submits the contact form, FormSubmit will send an activation email to `gurjevanbhatti@gmail.com`. Open it and click the confirmation link. After that, every future submission lands in your inbox automatically.

## 2) Build the site
```bash
cd frontend
yarn install
yarn build
```
This produces a `build/` folder — that's your entire website as static files.

## 3) Deploy — pick one

### Netlify (easiest, free)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag-and-drop the `frontend/build/` folder onto the Netlify dashboard **OR** connect your GitHub repo and set:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
3. The included `public/_redirects` handles SPA routing automatically.
4. Add a custom domain in Site Settings → Domain management.

### Vercel (also easy, free)
1. Push code to GitHub, import the repo at [vercel.com](https://vercel.com)
2. Framework preset: **Create React App**
3. Root directory: `frontend`
4. Build command: `yarn build` — output directory: `build`
5. `vercel.json` in the repo handles SPA routing.

### GitHub Pages
1. `yarn add -D gh-pages`
2. In `package.json` add: `"homepage": "https://<username>.github.io/<repo>"`
3. Add scripts: `"predeploy": "yarn build"`, `"deploy": "gh-pages -d build"`
4. Run `yarn deploy`
5. Note: BrowserRouter needs a 404.html trick on GitHub Pages, or switch to HashRouter.

## 4) Custom domain
On Netlify/Vercel: go to your site → Domains → Add domain → follow the DNS instructions (add `A` or `CNAME` records at your domain registrar).

DNS usually takes 5–30 minutes to propagate.

---

## What was removed
- The FastAPI backend is no longer needed for the live site. You can delete `/backend` from your deployed repo, or keep it around for local dev.
- MongoDB and Resend are no longer used by the frontend. FormSubmit handles emails.
