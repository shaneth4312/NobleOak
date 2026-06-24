# NobleOak Landing Page

Next.js app for the NobleOak Partners take-home task. Page content is driven by JSON via an API route. Contact form submissions are validated and stored in MongoDB. **[AI used]** — see [main README](../README.md#where-ai-was-used).

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (required for contact form submissions)

## Setup

### 1. Install dependencies

From the project root:

```bash
cd landing_page
npm install
```

### 2. Set up a local MongoDB server

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

### 3. Environment variables

Create a `.env.local` file in this folder (not committed to git):

```env
MONGODB_URI=mongodb://localhost:27017/nobleoaks
```

| Variable | Description |
| -------- | ----------- |
| `MONGODB_URI` | Connection string for the local MongoDB instance. Database name: `nobleoaks`. |

### 4. Seed the database

Run the seed script to create the `leads` collection and indexes:

```bash
npm run seed
```

This sets up:

- Collection: `leads`
- Indexes on `createdAt`, `email`, and `id` (unique)
- Document shape: `{ id, name, email, businessName?, service?, message, pageSlug?, createdAt }`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
landing_page/
├── app/
│   ├── api/
│   │   ├── pages/[slug]/route.ts   # GET page data from JSON
│   │   └── leads/route.ts          # POST contact form submissions
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── SectionRenderer.tsx
│   └── blocks/                     # header, hero, about, services, cta, logoPartners, contactForm, footer
├── data/
│   └── pages/
│       └── home.json
├── lib/
│   ├── types.ts
│   ├── getPage.ts
│   ├── fetchPage.ts
│   ├── saveLead.ts
│   └── validators/
├── scripts/
│   └── seed-db.ts
└── public/
    └── images/
```

## How page data works

Page content lives in [`data/pages/home.json`](./data/pages/home.json). The [`/api/pages/[slug]`](./app/api/pages/%5Bslug%5D/route.ts) route reads that JSON and the home page fetches it via [`fetchPage.ts`](./lib/fetchPage.ts). Each section is rendered by [`SectionRenderer`](./components/SectionRenderer.tsx).

**Sections implemented:** header, hero, about, services, logo partners, CTA, contact form, footer.

## API routes

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/pages/[slug]` | GET | Returns page structure and content from JSON |
| `/api/leads` | POST | Validates and saves contact form submissions to MongoDB |

### Testing form submissions

You can test the leads endpoint with a JSON body:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello"}'
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed MongoDB — creates `leads` collection and indexes |
