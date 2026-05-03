# Braden Website Frontend

This frontend reads all editable content from Sanity.

## Content Backend

- CMS backend: Sanity
- Studio location in this repo: `website/`
- Sveltia/Decap config has been removed from `frontend/public/admin/config.yml`

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Run Sanity Studio (Content Editing)

```bash
cd website
npm install
npm run dev
```

You can also open the hosted studio:

- https://23vvbmgr.sanity.studio

## Environment Variables

Frontend reads Sanity settings from Vite env values:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

Example values are in `website/frontend.env`.

## Bulk Upload Images

Use Sanity Studio Media Library (enabled with `sanity-plugin-media`) for bulk image upload, then attach images to `portfolioImage` documents.
