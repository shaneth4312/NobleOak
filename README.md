# Noble Oak

Project task — [Headless - Takehome Task](./Task%20Assets/Headless%20-%20Takehome%20Task.pdf)

## Client discovery

Coming from an agency background, it felt natural to start with a full review of the hypothetical client. As I would on any real project, I looked into who they are, who their competitors are, and who their target audience is — covering the areas I'd want to focus on: client needs, accessibility, tone of voice, and the overall direction for the site.

From that research, I put my bullet points into Cursor (Composer 2.5) with a full rundown of my findings to create a brief. I would not usually rely this heavily on AI for discovery, but to keep within the 3–4 hour limit I used it here — [Website_Breif.txt](./Task%20Assets/Website_Breif.txt). **[AI used]**

## Brand

From there, I wanted to build something in line with the task while still making it my own. To do that, I gave the client a brand as if they had just had one delivered — starting with a colour palette. I used [Coolors](https://coolors.co/) to explore directions I felt would suit the client, and landed on [NobleOak_Colours.png](./Task%20Assets/NobleOak_Colours.png), which I felt gave the brand a premium feel.

With the palette set, I passed the colours and a brief about the client to ChatGPT to create a logo (something I would not do for a legitimate client). After a few iterations, I settled on [NobleOak_Rectangle.png](./Task%20Assets/NobleOak_Rectangle.png) and [NobleOak_Square.png](./Task%20Assets/NobleOak_Square.png). **[AI used]**

That gave me a solid foundation to build a real brand around.

## Prototyping

Now, as I do with all my projects, I prototype. In the past I would use assets from previous websites, look at competitor sites, use [Awwwards](https://www.awwwards.com/) to scope out ideas, and spend a fair amount of time on this alongside designers.

However, in the past two years I have adapted to use AI for prototyping — still drawing on competitor websites and [Awwwards](https://www.awwwards.com/) for inspiration. I would usually do this with a designer who would then take it into Figma; however, for this task I created HTML versions instead. Using Cursor (Composer 2.5), I gave it access to the brand, brand colours, and the website brief. I also shared some sites I liked from Awwwards and asked it to prototype three static websites — very basic, stripped down, just to get a feel: **[AI used]**

- [style-1-heritage.html](./Prototype/style-1-heritage.html)
- [style-2-sanctuary.html](./Prototype/style-2-sanctuary.html)
- [style-3-nocturne.html](./Prototype/style-3-nocturne.html)

After it generated the designs, I went through and picked sections I liked the layout of. I further refined these by providing placeholder images and asking Composer 2.5 to create 50/50 sections like the about us section, a card section for services (as I believe these are compact but impactful), and a why us section with client logos (using placeholders). I pulled these together into a final prototype, which I will use as inspiration for the task — [index.html](./final_prototype/index.html). **[AI used]**

## Landing page

Now the fun part — creating the landing page. For this project I chose Next.js — it's fast, quick to build with, well supported, and has a strong ecosystem of packages I can lean on to create an impactful site. API routes give a clear place to enforce validation and security, and integration with SQL or NoSQL databases is straightforward. The task outlines that *"You may mock persistence and external services (e.g. using in-memory storage or static JSON), but structure your code as if these were real integrations."* — I plan to reflect that in the project. I'll use a JSON file to define the overall structure and content of the website. The task also mentions: *"Design the data structure so marketing teams could extend this later. Your model should allow new section types to be added in future without requiring significant backend changes."* Using JSON lets me outline types and content that can be easily edited or extended.

With that in mind, I'm planning to use MongoDB — a NoSQL database that stores data in a JSON-like format. That keeps things straightforward for a marketing team and would allow form submissions or future confidential data to be stored in an easy-to-read structure.

The final build lives in the [landing_page](./landing_page/) folder. See [landing_page/README.md](./landing_page/README.md) for setup instructions.

I used Cursor (Composer 2.5) to edit and structure this README and the landing page setup docs — hyperlinks, setup instructions, spelling and flow — based on the task brief, my descriptions and the instructions I provided. **[AI used]**

## Build progress

Page data is driven by [`home.json`](./landing_page/data/pages/home.json), served through a Next.js API route at `/api/pages/[slug]` and fetched by the home page via [`fetchPage.ts`](./landing_page/lib/fetchPage.ts). Each section is rendered through [`SectionRenderer`](./landing_page/components/SectionRenderer.tsx) as its own block component.

I created the remaining blocks I currently see fit for the landing page — header, hero, about, services, logo partners, CTA, contact form, and footer — and started adding functionality. I spent time setting up validation for the form, testing submissions as JSON first, then created an [`/api/leads`](./landing_page/app/api/leads/route.ts) route to handle actual submissions into MongoDB.

While doing that, I used AI to quickly template the logo partners, CTA, services, and footer blocks based on my previously coded components. Once that was done, I used AI to test validation for errors and improvements. **[AI used]**

A seed script has been created for local database setup — see [landing_page/README.md](./landing_page/README.md).

I have since added new sections — **why us**, **testimonials**, and **case studies** — after looking through some competitor websites and concepts from other sites.

Additionally, I took on board some additional server-side validation around the **service** field on the contact form, highlighted by AI. **[AI used]**

I sourced new images for the new blocks and worked through the visual design.

I added a [`/api/newsletter`](./landing_page/app/api/newsletter/route.ts) route to submit newsletter sign-ups through to the database.

## Final product

I have now completed the task objectives. The small full-stack application uses a content model for a landing page, serving the needs of the client outlined in the [brief](./Task%20Assets/Website_Breif.txt).

I created a backend API using Next.js route handlers — pulling page content from JSON via [`/api/pages/[slug]`](./landing_page/app/api/pages/%5Bslug%5D/route.ts), with additional routes for form submissions ([`/api/leads`](./landing_page/app/api/leads/route.ts)) and newsletter sign-ups ([`/api/newsletter`](./landing_page/app/api/newsletter/route.ts)) as a nice-to-have.

The frontend loads JSON from the API into an ordered section renderer ([`SectionRenderer`](./landing_page/components/SectionRenderer.tsx)), which displays blocks aligned with the brand and brief.

Both the contact form and newsletter submissions have validation on the client and server side for security.

Using my time effectively, I focused on the needs of the task first and utilised AI for documentation and speeding up design and templating processes. The final product can be found in [`landing_page`](./landing_page/) — see [setup instructions](./landing_page/README.md).

I had some spare time (about 30 minutes) before hitting the 3 hour 30 minute mark, and used it to update the visuals — adding motions, animations, and branding shapes to bring the page to life. While the focus is on functionality, providing a site that does not meet a quality standard I hold myself to would not be right.

## Trade-offs

Page content is mocked with JSON rather than stored in MongoDB. This is explicitly allowed by the task and keeps content version-controlled and easy to extend — while lead and newsletter submissions use real database persistence. The API and data layer are structured so page content could be swapped to a CMS or database without changing the frontend.

If I had more time within the task window, I would have added rate limiting on the form endpoints and additional security such as origin/domain validation so submissions could only come from the site itself. Minor, but something I would have done.

## What I would improve with more time

I would likely add a CMS. While WordPress is a go-to, for this type of stack I would suggest something like [Payload CMS](https://payloadcms.com/) — a full Next.js CMS that integrates well with the current structure. It can be set up as a headless or headless-serverless website using its local API, and offers strong capabilities in security, authentication, layout, and an easy-to-use format for clients or internal teams.

I would also add rate limiting and origin checks on API routes, expand automated test coverage for validation and submission flows, and run a full accessibility audit across all blocks.

## Where AI was used

- **Client discovery and website brief** — AI was used to turn my research bullet points into a structured brief within the time limit.
- **Logo concepts** — AI was used to generate logo iterations from the colour palette and client brief.
- **HTML prototyping** — AI was used to build three static style explorations and refine sections into the final prototype.
- **README and setup documentation** — AI was used to restructure and lay out the README and setup instructions effectively, based on the task brief and my descriptions.
- **Landing page blocks** — AI was used to quickly template the logo partners, CTA, services, and footer blocks based on my existing components.
- **Form validation** — AI was used to test validation for errors and suggest improvements, including additional server-side rules for the service field.
