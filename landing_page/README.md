# NobleOak Landing Page

Next.js app for the NobleOak Partners take-home task. Page content is driven by JSON, with MongoDB planned for contact form submissions. **[AI used]** — see [main README](../README.md#where-ai-was-used).

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (required once the contact form is implemented; optional for early page-structure work)

## Setup

### 1. Install dependencies

From the project root:

```bash
cd landing_page
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page reads section data from [`data/pages/home.json`](./data/pages/home.json).

At this stage you do **not** need MongoDB running — the site loads page content directly from JSON.

### 3. Set up a local MongoDB server

MongoDB will be used for validated, secure form submissions. Set it up now so it is ready when the contact form is added.

#### Windows

1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. During setup, choose **Install MongoDB as a Service** (recommended) so it starts automatically.
3. Confirm the service is running:
   - Open **Services** (`services.msc`) and check **MongoDB Server** is running, or
   - Run `mongosh` in a terminal — you should connect to `mongodb://localhost:27017`.

#### macOS

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongosh
```

#### Linux

Follow the [MongoDB Community install guide](https://www.mongodb.com/docs/manual/administration/install-on-linux/) for your distribution, then start the `mongod` service and verify with `mongosh`.

### 4. Environment variables

Create a `.env.local` file in this folder (not committed to git):

```env
MONGODB_URI=mongodb://localhost:27017/nobleoaks
```

| Variable | Description |
| -------- | ----------- |
| `MONGODB_URI` | Connection string for the local MongoDB instance. Database name: `nobleoaks`. |

A database seed script will be added once the data structure is finalised.

## Project structure

```
landing_page/
├── app/
│   ├── page.tsx          # Home page — renders sections from JSON
│   ├── layout.tsx
│   └── globals.css       # Brand colours and base styles
├── components/
│   ├── SectionRenderer.tsx
│   └── blocks/           # One component per section type (header, hero, about, …)
├── data/
│   └── pages/
│       └── home.json     # Page structure and content
├── lib/
│   ├── types.ts          # Section and page TypeScript types
│   ├── getPage.ts        # Loads page JSON by slug
│   └── brand.ts          # Brand name and logo paths
└── public/
    └── images/           # Brand assets and section imagery
```

## How page data works

Page content is loaded from [`data/pages/home.json`](./data/pages/home.json) via [`lib/getPage.ts`](./lib/getPage.ts). The home page server component reads that JSON and renders each section through [`SectionRenderer`](./components/SectionRenderer.tsx).

Sections currently implemented: **header**, **hero**, and **about**.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## What's coming

- Remaining landing page sections (services, why us, testimonials, contact, etc.)
- Contact form with server-side validation
- Next.js API route for secure form submission to MongoDB
- Seed script for local MongoDB setup
