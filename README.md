# LEONIDA LIFE

🎮 **Live Demo:** https://leonida-life.vercel.app

## Create the Chaos. Watch Leonida React.

Leonida Life is an original fictional interactive experience built for the **Build with React Image Editor Challenge**. Choose an incident, upload local evidence, transform it with Unlayer's React Image Editor, publish it, and watch that exact edited image ripple through a fictional social feed, breaking-news broadcast, public-safety system, and final Chaos Report.

It is a fictional world with original copy, UI, and art direction. It does not use Rockstar, GTA, or real-world media/police branding or artwork.

## The experience

1. Choose the chaos — select one of six fictional Leonida incidents.
2. Upload evidence — select a local JPG, PNG, or WEBP image (up to 20 MB).
3. Edit evidence — crop, resize, filter, draw, add text, shapes, stickers, and frames with React Image Editor.
4. Publish to Leonida — launch the staged public reaction.
5. Watch Leonida react — see the same image become a Leonida Live post, LCN broadcast, and Leonida Public Safety record.
6. Generate a Chaos Report — review the fictional final impact, then download or share the edited evidence.

## Why React Image Editor matters

React Image Editor is the central creation mechanic, not a decorative integration. A local image is converted to a data URL and passed to `ImageEditor`; its real `onSave({ dataUrl, blob })` result becomes the single artifact that drives the whole narrative.

```text
local file
  → FileReader data URL
  → React Image Editor
  → onSave({ dataUrl, blob })
  → application state
  → social post / breaking news / public-safety evidence / Chaos Report
  → download or native share
```

The experience exposes the editor's supported crop, resize, filter, draw, text, shapes, stickers, and frame tools. The saved flattened image is intentionally reused everywhere after the editor; it is never replaced with a mock visual.

## Built with

- React
- TypeScript
- Vite
- `@unlayer/react-image-editor`
- CSS custom properties and CSS animation
- Native browser APIs: FileReader, Blob, download anchors, Web Share, Clipboard

## Run locally

Requires Node.js 20 or later. Node 22 is the repository's primary CI version.

```sh
npm ci
npm --prefix demo ci
npm --prefix demo run dev
```

The Vite app normally runs at `http://localhost:5173`.

## Validate

```sh
npm --prefix demo run typecheck
npm --prefix demo run build
npm run lint
npm test
```

## Project structure

```text
src/                         # Preserved React Image Editor library wrapper
demo/
  src/
    components/              # Leonida Life experience screens
    data/                    # Scenario and reaction/report data
    types/                   # Experience types
    App.tsx                  # Bounded phase/reaction reducer
```

The hackathon application lives in `demo/`. Its Vite configuration intentionally aliases `@unlayer/react-image-editor` to the repository's root `src/index.ts`, so the experience uses this fork's local library implementation while retaining one React copy.

## Deploy to Vercel

This repository includes a root-level [`vercel.json`](vercel.json) because the demo's Vite alias needs access to the parent `src/` directory. Deploy from the **repository root**, not from `demo/` as Vercel's Root Directory.

The supplied configuration uses:

```text
Root Directory: repository root
Install Command: npm ci
Build Command: npm --prefix demo ci && npm --prefix demo run build
Output Directory: demo/dist
Framework: Vite
```

No SPA rewrite is required: the experience does not use client-side routes. Do not deploy from this repository without your own authorized Vercel project/account access.

## Screenshots

Screenshots are intentionally not referenced until final captured assets are added. Recommended submission captures:

- Landing screen
- Evidence Lab / React Image Editor
- Leonida Live reaction
- LCN Breaking News
- Final Chaos Report

## Upstream React Image Editor

Leonida Life is built in a fork of [Unlayer's React Image Editor](https://github.com/unlayer/react-image-editor), an MIT-licensed React wrapper for the Unlayer Image Editor. The published library source and its tests remain preserved under `src/` and `test/`.

The package supports React 18 or later and ships an editor with crop, resize, draw, text, shapes, stickers, frames, filters, localization, themes, and optional account-configured AI Assistant support. See the source types in [`src/types.ts`](src/types.ts) for the wrapper API.

```tsx
import ImageEditor from '@unlayer/react-image-editor';

<ImageEditor
  image={imageDataUrl}
  options={{ theme: 'dark' }}
  onSave={({ dataUrl, blob }) => {
    // Persist or reuse the saved edited output.
  }}
/>;
```

## License

The underlying React Image Editor library is Copyright (c) 2026 Unlayer and licensed under the [MIT License](LICENSE). Leonida Life is an original fictional hackathon experience built with that library.
