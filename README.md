# Agency OS — Backend API

Rails API for Agency OS — AI-powered client management platform.

**Live API:** https://agency-os-2ial.onrender.com
**Health Check:** https://agency-os-2ial.onrender.com/up

---

## Features

- 🔐 **JWT Authentication** — Signup, login, secure token-based auth
- 🏢 **Workspaces API** — Full CRUD operations
- 👥 **Clients API** — CRUD with per-workspace scoping
- 📝 **Notes API** — CRUD with multiple file attachments
- 🤖 **AI Briefings** — Groq API integration (Llama 3.1)
- 📎 **File Storage** — Supabase S3 (production), local disk (development)
- ⚡ **Real-time** — ActionCable WebSockets for live updates
- 🔒 **Data Isolation** — Users only access their own data
- 🗄 **PostgreSQL** — Neon cloud database
- 🎯 **Background Jobs** — Solid Queue
- 💾 **Solid Cache** — Database-backed caching

---

## Tech Stack

- **Framework:** Rails 8.1 (API-only mode)
- **Ruby:** 4.0.5
- **Database:** Neon PostgreSQL (serverless)
- **Authentication:** JWT + bcrypt
- **File Storage:** Supabase S3 (via `aws-sdk-s3`)
- **AI:** Groq API (Llama 3.1 model)
- **WebSockets:** ActionCable + Solid Cable
- **Background Jobs:** Solid Queue
- **Caching:** Solid Cache
- **CORS:** Rack-CORS
- **Deployment:** Render (Free tier)

---

## Prerequisites

- **Ruby** 4.0+
- **Rails** 8.1+
- **PostgreSQL** (or Neon account)
- **Supabase** account (for production file storage)
- **Groq API key** — free at https://console.groq.com/keys

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ahmad93r5/Agency-OS.git
cd Agency-OS/Backend_OS