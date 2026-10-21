# ISO/IEC 29110 Study Guide

A single-page, interactive guide to ISO/IEC 29110 (lifecycle profiles for Very Small Entities) for students.

## Publish on GitHub Pages

1. Create a new public repository on GitHub, e.g. `iso29110`.
2. Upload `index.html` (and this README) to the root of the `main` branch.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. After a minute the site is live at `https://<your-username>.github.io/iso29110/`.

Tip: name the repository `<your-username>.github.io` instead if you want it at the root URL.

## Editing content

All content lives in `index.html`. The interactive data (profiles, PM/SI activities, roles, work products, quiz) are plain JavaScript arrays near the bottom of the file, so you can edit or add items without touching the layout.
