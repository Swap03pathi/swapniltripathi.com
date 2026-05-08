# Stellarium Web Engine (static bundle)

This folder is served as `/stellarium/` in dev and production (`import.meta.env.BASE_URL` is respected in code).

## Already in this repo

- `static/` — copied from upstream `apps/simple-html/static` (fonts Roboto, demo images, polyfills). Needed for `setFont` paths in `RealSkyBackground.tsx`.

## You must add (build output)

Upstream does **not** ship prebuilt `stellarium-web-engine.js` / `.wasm` on npm. Generate them locally:

1. Clone **<https://github.com/Stellarium/stellarium-web-engine>**
2. Install **Emscripten** + **scons** (see upstream `README.md`).
3. From the repo root:

   ```bash
   source "$PATH_TO_EMSDK/emsdk_env.sh"
   make js
   ```

4. Copy into **this folder** (`public/stellarium/`):

   - `build/stellarium-web-engine.js` → `./stellarium-web-engine.js`
   - `build/stellarium-web-engine.wasm` → `./stellarium-web-engine.wasm`

Your layout should match:

```txt
public/stellarium/
  stellarium-web-engine.js
  stellarium-web-engine.wasm
  static/
  README.md          (this file)
```

Until those two files exist, the site falls back to the lightweight `StarField` canvas (`BackgroundLayer.tsx`).

## Sky catalog data (stars, planets, Milky Way, …)

The engine needs HiPS/star catalog URLs. Locally, upstream demos use something like `../test-skydata/` — that bundle is huge and usually **not committed**.

For deployment, host that tree yourself (HTTPS, CORS-aware) or point at mirrors you control.

Set comma-separated prefixes in `.env`:

```bash
VITE_STELLARIUM_SKYDATA_BASE_URLS=https://your-cdn.example.com/path/to/test-skydata
```

(or multiple URLs separated by commas; each must expose the paths used in upstream `apps/simple-html/stellarium-web-engine.html`).

## Dev-only celestial pick debugging

Optional:

```bash
VITE_STELLARIUM_DEBUG_PICK=1
```

Enables guarded click logging → `pickObject` / console (implementation varies by build).

## AGPL note

The Stellarium Web Engine is **AGPL-licensed**. If you ship modified engine builds or AGPL-covered assets alongside your closed code, comply with AGPL terms.
