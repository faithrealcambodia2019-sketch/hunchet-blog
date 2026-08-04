# hunchet-blog

A Next.js frontend that pulls posts from your **hunchet.blog WordPress.com** site via its public REST API, ready to deploy on Vercel. Keep writing posts in WordPress like normal — this site just renders them.

## 1. Run it locally (optional but recommended first)

```bash
npm install
npm run dev
```

Open http://localhost:3000. If posts don't load, open `lib/wordpress.js` and check the `WP_SITE` value — it defaults to `hunchet.blog`. If your domain isn't mapped for API access, switch it to your `*.wordpress.com` address (WordPress.com dashboard → My Site → Settings → General → find your WordPress.com address) and set it via a `.env.local` file (copy `.env.local.example`).

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create hunchet-blog --public --source=. --push
```

(No `gh` CLI? Create a repo at github.com/new, then `git remote add origin <url>` and `git push -u origin main`.)

## 3. Deploy on Vercel

1. Go to vercel.com → Add New → Project.
2. Import the `hunchet-blog` GitHub repo.
3. Framework preset: Next.js (auto-detected). No env vars needed unless you changed `WP_SITE`.
4. Click Deploy.

## 4. Point hunchet.blog at Vercel

Since WordPress.com currently owns the domain's DNS/hosting:

1. In Vercel: Project → Settings → Domains → add `hunchet.blog`. Vercel will show you the DNS records to set (an A record or CNAME).
2. Where is the domain registered?
   - **Registered through WordPress.com**: go to WordPress.com → Domains → hunchet.blog → DNS records (or "Use your domain elsewhere"), and add the records Vercel gave you.
   - **Registered elsewhere** (Namecheap, GoDaddy, etc.) with WordPress.com only handling the site: update DNS at your registrar instead.
3. DNS changes can take up to 24-48 hours to propagate, though usually much faster.

Once DNS points to Vercel, hunchet.blog will serve this Next.js site — but your content still lives in, and is edited from, WordPress.com.

## Notes

- This uses `getStaticProps`/ISR (revalidates every 60s), so new WordPress posts show up within a minute without a redeploy.
- If a post 404s, WordPress.com's REST API may be restricted on your plan — Business plan or higher is generally required for reliable API access to a self-mapped custom domain. If needed, use your `*.wordpress.com` address instead (see step 1).
