# Enlite Helicopters

This repository contains the source code for the Enlite Helicopters website, a premium web application built with Next.js and Sanity CMS.

## 📁 Project Structure

- **`Enlite/`**: The main project directory containing the Next.js application, Tailwind CSS configuration, and Sanity Studio schemas.

## 🚀 Installation & Local Development

To get the project running locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/studio-blend/Enlite-Helicopters.git
   cd Enlite-Helicopters/Enlite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `Enlite` directory with the following content:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="58dq9m9q"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Production Build

If you need to build the project for production:

1. **Generate the build:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm run start
   ```

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)
1. Connect your GitHub account to [Vercel](https://vercel.com).
2. Select the `Enlite-Helicopters` repository.
3. Set the **Root Directory** to `Enlite`.
4. Add the environment variables from `.env.local` in the Vercel dashboard.
5. Click **Deploy**.

### Static Hosting / Zipping
If you need to provide a zip for hosting:
1. Ensure all dependencies are installed.
2. Run `npm run build`.
3. The production-ready files will be in the `.next` directory.
   *Note: For traditional shared hosting, you may need to export a static version using `next export` or use a Node.js compatible environment.*

---
© 2026 Enlite Helicopters. All rights reserved.
