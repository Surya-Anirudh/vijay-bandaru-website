# Deployment Guide — Vijay Bandaru Website

This document covers two paths:
1. **Deploy the React site** to Vercel or Netlify (recommended)
2. **Add a headless CMS** so Vijay can edit blog content without touching code

---

## Path 1 — Deploy to Vercel (Recommended)

Vercel is built by the same team behind Next.js and has first-class support for Vite + React. Free tier is more than enough for this site.

### Step 1 — Prepare the build

Make sure the production build works locally first:

```bash
cd "Vijay website personal"
npm run build
```

This outputs a `dist/` folder. If it completes with no errors, you're ready.

### Step 2 — Push the project to GitHub

1. Go to [github.com](https://github.com) and create a new **private** repository (e.g. `vijay-bandaru-website`)
2. In your terminal:

```bash
cd "Vijay website personal"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vijay-bandaru-website.git
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Import the `vijay-bandaru-website` repository
4. Vercel auto-detects Vite. Leave all settings as default
5. Click **"Deploy"**

Vercel gives you a live URL like `vijay-bandaru-website.vercel.app` within ~60 seconds.

### Step 4 — Connect a custom domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `vijaybandaru.com`)
3. Vercel shows you two DNS records to add:
   - An **A record** pointing to Vercel's IP
   - A **CNAME record** for `www`
4. Go to your domain registrar (GoDaddy / Namecheap / etc.) and add those records
5. SSL certificate is provisioned automatically — takes 10–30 minutes

### Step 5 — Set up the contact form backend

The contact form POSTs to `/api/contact` which runs the Express server (`server/index.js`). On Vercel, you need to convert this to a **Vercel Serverless Function**.

Create this file:

**`/api/contact.js`** (in the project root, not inside `src/`)

```js
import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const { name, email, subject, message } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "vijaybandaru@learnovative.com",
      subject: `Website Enquiry: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: "Mail failed" })
  }
}
```

Then in Vercel dashboard → **Settings → Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MAIL_USER` | Gmail address used for sending |
| `MAIL_PASS` | Gmail App Password (not your login password — generate one at myaccount.google.com → Security → App Passwords) |

---

## Path 1b — Deploy to Netlify (Alternative)

Nearly identical process. Netlify is equally good.

1. Go to [netlify.com](https://netlify.com) → **"Add new site" → "Import from Git"**
2. Connect GitHub, select the repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy**

For the contact form on Netlify, use **Netlify Functions** — same concept as Vercel serverless, different folder (`netlify/functions/contact.js`).

---

## Path 2 — Add a Headless CMS for Blog Content

If Vijay wants to write and publish blog posts himself (without editing code), connect a headless CMS. The React site fetches content from the CMS via API at build time or runtime.

### Recommended: Sanity.io (Free tier, best DX)

#### Step 1 — Create a Sanity project

```bash
npm create sanity@latest
```

Follow the prompts:
- Project name: `vijay-bandaru-blog`
- Dataset: `production`
- Template: **Clean project**

This creates a separate folder with Sanity Studio — a web UI where Vijay writes posts.

#### Step 2 — Define the blog post schema

In your Sanity project, edit `schemaTypes/post.js`:

```js
export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "category", title: "Category", type: "string" },
    { name: "readTime", title: "Read Time", type: "string" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "coverImage", title: "Cover Image", type: "image" },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "publishedAt", title: "Published At", type: "datetime" },
  ],
}
```

#### Step 3 — Deploy Sanity Studio

```bash
cd your-sanity-project
npx sanity deploy
```

Sanity gives you a URL like `vijay-blog.sanity.studio` — this is the CMS dashboard Vijay logs into to write posts.

#### Step 4 — Fetch posts in the React site

Install the Sanity client:

```bash
npm install @sanity/client
```

Create `src/lib/sanity.ts`:

```ts
import { createClient } from "@sanity/client"

export const sanity = createClient({
  projectId: "YOUR_PROJECT_ID",   // from sanity.io dashboard
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})
```

Update `src/pages/Blog.tsx` to fetch from Sanity instead of using the hardcoded `posts` array:

```ts
import { useEffect, useState } from "react"
import { sanity } from "@/lib/sanity"

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    sanity
      .fetch(`*[_type == "post"] | order(publishedAt desc)`)
      .then(setPosts)
  }, [])

  // rest of your existing JSX unchanged
}
```

#### Step 5 — Vijay's workflow going forward

1. Go to `vijay-blog.sanity.studio`
2. Click **"New Post"**
3. Write title, body, upload cover image, set category
4. Click **Publish**
5. The live website shows the new post within seconds (no code changes needed)

---

## Summary — What to Use

| Goal | Tool | Cost |
|------|------|------|
| Host the React site | Vercel or Netlify | Free |
| Custom domain + SSL | Vercel/Netlify built-in | Free |
| Contact form emails | Vercel Serverless + Gmail App Password | Free |
| Vijay edits blog posts | Sanity.io | Free up to 3 users |

**Total cost: $0/month** (until traffic scales significantly, at which point Vercel Pro is $20/month).

---

## Quick-Start Checklist

- [ ] Run `npm run build` locally — confirm it succeeds
- [ ] Push code to a private GitHub repo
- [ ] Create Vercel account, import repo, deploy
- [ ] Add custom domain in Vercel → update DNS at registrar
- [ ] Create `/api/contact.js` serverless function
- [ ] Add `MAIL_USER` and `MAIL_PASS` environment variables in Vercel
- [ ] (Optional) Set up Sanity for blog content management
- [ ] Test contact form on live site
- [ ] Test all pages and nav links on live URL
