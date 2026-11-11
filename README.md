# ISO/IEC 29110 for Business

A single-page guide to ISO/IEC 29110 (lifecycle profiles for Very Small Entities) for owners and managers of small software businesses. It covers the business case, a fit check, the four profiles, the Basic profile in business terms, Deployment Packages, an adoption roadmap, certification, roles, key documents and FAQ.

## Publish at https://iso29110.github.io

1. Create a free GitHub organization named `iso29110` (or use an account with that name).
2. In it, create a public repository named exactly `iso29110.github.io`.
3. Upload **all files** from the site folder (every `.html` page, `prakit-sangpar.jpg`, `style.css`, `site.js`) and this README to the root of the `main` branch. Upload them together so the links between pages work.
4. Go to **Settings → Pages** and check that it deploys from branch `main`, folder `/ (root)`.
5. After a minute or two the site is live at `https://iso29110.github.io`.

## Site structure

| File | Page |
|---|---|
| `index.html` | Home: introduction and links to every topic |
| `wg24.html` | WG24, history and founding countries |
| `business-value.html` | Business value and fit check |
| `profiles.html` | The four profiles; selecting Level 1 shows Entry profile details, Level 2 shows Basic profile details (PM/SI, what's new in 2025, annexes). Direct links: `profiles.html#entry`, `profiles.html#basic` |
| `profiles-systems.html` | Systems engineering profiles (ISO/IEC 29110-5-6-1 to 5-6-4), with sections `#se-entry`, `#se-basic`, `#se-intermediate`, `#se-advanced` |
| `profiles-service.html` | Service delivery profile (ISO/IEC 29110-5-3) |
| `profiles-org.html` | Organisational management profile (ISO/IEC 29110-5-2-1:2025) |
| `profiles-agile.html` | Agile & DevOps guidelines: ISO/IEC 29110-5-4:2025 (`#agile`) and ISO/IEC 29110-5-5 (`#devops`) |
| `profiles-specific.html` | Specific profiles: space software engineering guidelines (ISO/IEC 29110-7-1:2026) |
| `deployment-packages.html` | Deployment Packages overview, with links to the two subpages |
| `dp-software.html` | Software engineering Deployment Packages by level: Entry, Basic, Intermediate, Advanced (`#entry`, `#basic`, `#intermediate`, `#advanced`) |
| `dp-systems.html` | Systems engineering Deployment Packages, linking to the INCOSE resource |
| `roadmap.html` | Adoption roadmap, roles and key documents (work products) |
| `certification.html` | Certification |
| `publications.html` | Published articles and case studies, grouped by year, each linked to its source |
| `members.html` | WG24 members by country (Members menu) |
| `faq.html` | FAQ |
| `prakit-sangpar.jpg` | Photo used in the WG24 members section |
| `style.css` | Shared styles for all pages |
| `site.js` | Shared scripts: dark mode and the interactive parts |

Every page has the same navigation bar and footer. To change the footer, edit it on every page (it is the `<footer>` block near the bottom of each file).

## Editing content

The text of each topic is in its own `.html` file. The interactive data (profiles, PM/SI activities, Deployment Packages, roles, work products, WG24 members) are plain JavaScript arrays in `site.js`, so you can edit or add items without touching the layout.

## Sources

- ISO/IEC 29110-5-1-1:2025, software engineering guidelines for the Entry profile (free): https://www.iso.org/standard/85420.html
- ISO/IEC 29110-5-1-2:2025, software engineering guidelines for the Basic profile (free): https://www.iso.org/standard/82669.html
- Deployment Packages repository (Prof. Claude Y. Laporte, ÉTS Montréal): https://profs.etsmtl.ca/claporte/english/VSE/VSE-packages.html

## Adding WG24 members

Members appear on `members.html`. 
In `site.js`, find the `/* ---------- wg24 members ---------- */` block. Each country has a list `p:[]`. Add a person like this:

```js
{name:'Full Name',initials:'FN',role:'WG24 member · Country',
 bio:['First paragraph.','Second paragraph.'],
 contrib:['Something they contributed'],
 photo:'their-photo.jpg'}   // optional: upload a square photo next to index.html
```

## Adding publications

Open `publications.html` and find the year heading (for example `<div class="pub-year" id="y2026">`). Copy one `<li class="pub">…</li>` item inside that year's list and change the link, title, authors, venue and type. For a new year, copy a whole `<div class="pub-year">` block, change its `id` and heading, and add a matching link to the year buttons at the top of the page.
