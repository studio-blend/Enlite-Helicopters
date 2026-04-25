# Enlite Helicopters Website

This is the main application folder for the Enlite Helicopters project. It is built using [Next.js 15](https://nextjs.org/) and [Sanity.io](https://www.sanity.io/).

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity Studio (embedded at `/admin`)
- **Icons:** Lucide React
- **Animations:** Framer Motion

## ⚙️ Local Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Ensure you have a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="58dq9m9q"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

3. **Development Mode:**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel
This project is optimized for deployment on Vercel. Ensure the "Root Directory" is set to `Enlite` if deploying from the repository root.

### Build for Production
```bash
npm run build
npm run start
```

## 📝 Content Management
Content can be managed via the Sanity Studio. Once the app is running, navigate to `/admin` to access the dashboard. 

---
Developed for Enlite Helicopters.
