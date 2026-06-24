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

I am working on the main structure of the website first — outlining how sections sit on the page, where they appear, the colour scheme, and use of images. Page data is already driven by [`home.json`](./landing_page/data/pages/home.json), loaded server-side through [`getPage.ts`](./landing_page/lib/getPage.ts) and rendered as section components. Eventually I will add a contact form as the main call to action for the landing page, with a Next.js API route handling validation and secure submission to MongoDB, in line with the task requirements.

So far I have built the header, hero, and about us sections. Once I have outlined all the sections I believe should be on the landing page, I will focus on functionality — validations, security, and the contact form — while keeping the design in line with the final prototype.

## Where AI was used

- **Client discovery and website brief** — AI was used to turn my research bullet points into a structured brief within the time limit.
- **Logo concepts** — AI was used to generate logo iterations from the colour palette and client brief.
- **HTML prototyping** — AI was used to build three static style explorations and refine sections into the final prototype.
- **README and setup documentation** — AI was used to restructure and lay out the README and setup instructions effectively, based on the task brief and my descriptions.
