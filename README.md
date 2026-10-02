# Agency OS — Frontend

AI-powered client management platform for modern agencies and freelancers.

**Live Demo:** https://agency-os-git-frontend-main-works3.vercel.app

---

## Features

- 🔐 **Authentication** — Signup, Login, JWT-based auth
- 🎨 **Landing Page** — Public landing with hero, features, and CTA
- 🏢 **Workspaces** — Organize clients by project
- 👥 **Clients** — Store name, email, phone, and full history
- 📝 **Notes** — Write notes with multiple file attachments
- 🤖 **AI Briefings** — Auto-generated summaries from notes (Groq Llama 3.1)
- 📎 **File Uploads** — Multiple files per note (Supabase S3)
- ⚙️ **Settings** — Update profile and change password
- 📱 **Responsive** — Mobile-friendly UI
- ⚡ **Real-time** — Live updates via WebSockets (ActionCable)
- 🎨 **Modern UI** — Lucide icons, gradients, smooth animations

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** TailwindCSS 4
- **Icons:** Lucide React
- **Font:** Inter (via `next/font`)

### Backend Integration
- **API:** Rails 8.1 REST API
- **Real-time:** ActionCable (WebSockets)
- **Auth:** JWT tokens

### Deployment
- **Frontend Hosting:** Vercel (Hobby tier)
- **Backend API:** Render (Free tier)
- **Database:** Neon PostgreSQL (Serverless)
- **File Storage:** Supabase S3-compatible storage

---

## Prerequisites

- **Node.js** 18+ (recommended: Node.js 20+)
- **npm** / yarn / pnpm
- **Backend API** running (locally or live)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ahmad93r5/Agency-OS.git
cd Agency-OS/frontend