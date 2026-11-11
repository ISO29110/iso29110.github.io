# ISO/IEC 29110 for Business

A single-page guide to ISO/IEC 29110 (lifecycle profiles for Very Small Entities) for owners and managers of small software businesses. It covers the business case, a fit check, the four profiles, the Basic profile in business terms, Deployment Packages, an adoption roadmap, certification, roles, key documents and FAQ.

## Publish at https://iso29110.github.io

1. Create a free GitHub organization named `iso29110` (or use an account with that name).
2. In it, create a public repository named exactly `iso29110.github.io`.
3. Upload **all files** from the site folder (every `.html` page, `style.css`, `site.js`) and this README to the root of the `main` branch. Upload them together so the links between pages work.
4. Go to **Settings → Pages** and check that it deploys from branch `main`, folder `/ (root)`.
5. After a minute or two the site is live at `https://iso29110.github.io`.

## Site structure

| File | Page |
|---|---|
| `index.html` | Home: introduction and links to every topic |
| `wg24.html` | WG24 and history |
| `business-value.html` | Business value |
| `fit-check.html` | Is it for you? |
| `profiles.html` | The four profiles |
| `basic-profile.html` | Basic profile (PM and SI), what's new in 2025, annexes |
| `deployment-packages.html` | Deployment Packages |
| `roadmap.html` | Adoption roadmap |
| `certification.html` | Certification |
| `roles.html` | Roles |
| `documents.html` | Key documents (work products) |
| `faq.html` | FAQ |
| `style.css` | Shared styles for all pages |
| `site.js` | Shared scripts: dark mode and the interactive parts |

Every page has the same navigation bar and footer. To change the footer, edit it on every page (it is the `<footer>` block near the bottom of each file).

## Editing content

The text of each topic is in its own `.html` file. The interactive data (profiles, PM/SI activities, Deployment Packages, roles, work products) are plain JavaScript arrays in `site.js`, so you can edit or add items without touching the layout.

## Sources

- ISO/IEC 29110-5-1-1:2025, software engineering guidelines for the Entry profile (free): https://www.iso.org/standard/85420.html
- ISO/IEC 29110-5-1-2:2025, software engineering guidelines for the Basic profile (free): https://www.iso.org/standard/82669.html
- Deployment Packages repository (Prof. Claude Y. Laporte, ÉTS Montréal): https://profs.etsmtl.ca/claporte/english/VSE/VSE-packages.html
