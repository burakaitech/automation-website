# Automation Website

Modern, minimalist Next.js web application for managing and triggering n8n automations on Railway.

## Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI & Styling:** [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Deployment:** [Railway](https://railway.app/)

## Structure
`
├── src/
│   ├── app/
│   │   ├── api/trigger/route.ts   # Next.js Route Handler for Webhook proxy
│   │   ├── globals.css            # Global Tailwind styles
│   │   ├── layout.tsx             # Root layout & meta tags
│   │   └── page.tsx               # Main Dashboard page
│   └── components/
│       ├── Header.tsx             # App header & status badge
│       ├── TriggerForm.tsx        # Interactive payload & trigger form
│       ├── ResponseViewer.tsx     # Formatted JSON output viewer
│       └── ActivityLog.tsx        # Real-time event log
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
`
