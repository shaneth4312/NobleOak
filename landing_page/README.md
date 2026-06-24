# NobleOak Landing Page

Next.js full-stack app for the NobleOak Partners take-home task. Page content is driven by JSON via an API route. Contact form and newsletter submissions are validated and stored in MongoDB. **[AI used]** — see [main README](../README.md#where-ai-was-used).

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (required for form and newsletter submissions)

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

Run the seed script to create collections and indexes:

```bash
npm run seed
```

This sets up:

**`leads`**
- Indexes on `createdAt`, `email`, and `id` (unique)
- Document shape: `{ id, name, email, businessName?, service, message, pageSlug?, createdAt }`

**`newsletterSubscriptions`**
- Indexes on `createdAt`, `email` (unique), and `id` (unique)
- Document shape: `{ id, email, createdAt }`

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
│   │   ├── pages/[slug]/route.ts    # GET page content from JSON
│   │   ├── leads/route.ts           # POST contact form submissions
│   │   └── newsletter/route.ts      # POST newsletter sign-ups
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── SectionRenderer.tsx          # Maps section types to blocks + motion
│   ├── BrandLogo.tsx
│   ├── BrandBackgroundShapes.tsx
│   ├── blocks/
│   │   ├── HeaderBlock.tsx
│   │   ├── HeroBlock.tsx
│   │   ├── AboutBlock.tsx
│   │   ├── ServicesBlock.tsx
│   │   ├── WhyUsBlock.tsx
│   │   ├── LogoPartnersBlock.tsx
│   │   ├── TestimonialsBlock.tsx
│   │   ├── CaseStudiesBlock.tsx
│   │   ├── CtaBlock.tsx
│   │   ├── ContactFormBlock.tsx
│   │   └── FooterBlock.tsx
│   ├── motion/
│   │   ├── Reveal.tsx
│   │   ├── ParallaxLayer.tsx
│   │   ├── HeroStats.tsx
│   │   └── LogoMarquee.tsx
│   └── ui/
│       ├── CtaButton.tsx
│       └── FramedImage.tsx
├── data/
│   └── pages/
│       └── home.json
├── lib/
│   ├── types.ts
│   ├── brand.ts
│   ├── getPage.ts
│   ├── fetchPage.ts
│   ├── mongo.ts
│   ├── saveLead.ts
│   ├── saveNewsletterSubscription.ts
│   ├── scrollToSection.ts
│   ├── sectionLayout.ts
│   ├── placeholderImage.ts
│   ├── validation/
│   │   └── contactFormRules.ts
│   └── validators/
│       ├── contactFormValidator.ts
│       └── newsletterValidator.ts
├── scripts/
│   └── seed-db.ts
└── public/
    └── images/
        └── partners/
```

## How page data works

Page content lives in [`data/pages/home.json`](./data/pages/home.json). The [`/api/pages/[slug]`](./app/api/pages/%5Bslug%5D/route.ts) route reads that JSON and the home page fetches it via [`fetchPage.ts`](./lib/fetchPage.ts). Each section is rendered by [`SectionRenderer`](./components/SectionRenderer.tsx), which maps section types to block components and wraps most sections in scroll-reveal motion.

**Section blocks:** header, hero, about, services, why us, logo partners, testimonials, case studies, CTA, contact form, footer.

**Shared UI & motion:** brand logo, background shapes, CTA button, framed images, parallax layers, hero stats animation, logo marquee, and scroll reveal.

## API routes

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/pages/[slug]` | GET | Returns page structure and content from JSON |
| `/api/leads` | POST | Validates and saves contact form submissions to MongoDB |
| `/api/newsletter` | POST | Validates and saves newsletter sign-ups to MongoDB |

All submission endpoints validate on the server. The contact form and footer newsletter also validate on the client before sending.

### Testing API submissions

**Contact form (`/api/leads`):**

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","service":"Wealth Management","message":"Hello"}'
```

**Newsletter (`/api/newsletter`):**

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed MongoDB — creates `leads` and `newsletterSubscriptions` collections and indexes |
