# Movies App Challenge

## Personal Notes

I have been working with NextJS for the last 4 years and I haven't worked with pure React in over 5 years, and the last version I used was React 17.2. So the hardest part for me was to investigate about how to configure SSR without using syntactic sugar from frameworks that adds the configuration automatically.

Understanding the lifecycle between entry.rsc, entry.ssr, and entry.browser took some time to investigate.

I chose:

- React Router v7 + Vite with the plugin to set RSC and SSR.
- TanStack Query for SSR (dehydrate) and parallel data fetching.

There’s still room for optimization (streaming segmentation, better performance tuning).

## Stack

- **React 19**
- **React Router v7** (not using the Framework version)
- **TanStack Query v5**
- **SSR + RSC with Vite**
- **Zustand** persist wishlist.

## Documentation used

- [TanStack Query – SSR (Hydration/Dehydration)](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)

- [Vite – React RSC Plugin (entry.rsc/entry.ssr/entry.browser)](https://es.vite.dev/guide/ssr)

- [React Router v7 – SSR / RSC](https://reactrouter.com/how-to/react-server-components?utm_source=chatgpt.com)

- [TMDB – Discover Movies API](https://developer.themoviedb.org/reference/discover-movie)

- [A developer handmade documentation for RSC in React Router](https://raphaelbronsveld.com/blog/rsc-in-rr-first-impressions?utm_source=chatgpt.com)

---

## URL to test the app

[Deployed APP Link to test it](https://mh-movies-app-challenge-production.up.railway.app/)

## Quick Start

```bash
# 1) Requirements
# - Node.js >= 22.12.0 (or >= 20.19.0) ✅
# - pnpm (recommended) or npm

# 2) Install dependencies
pnpm install

# 3) Environment variables
TMDB_API_TOKEN=<<YOUR_BEARER_TOKEN>>
TMDB_BASE_URL=https://api.themoviedb.org/3
PORT=Port desired to run the build (for example 3000)

# 4) Development (SSR with Vite middleware)
pnpm dev               # http://localhost:5173

# 5) Production (build + Express server with SSR/RSC)
pnpm build
pnpm start             # http://localhost:3000
```

## Project Structure

```bash
Project Structure
src/
  features/              # movies, wishlist, movie-details, etc.
  pages/                 # RSC routes (root, movies, movie-detail, wishlist)
  providers/             # QueryProvider.client
  shared/                # UI components, styles, utils
  entry.browser.tsx      # Client hydration
  entry.ssr.tsx          # HTML streaming SSR
  entry.rsc.tsx          # React Server Components router
  routes.ts              # Declarative routes (React Router v7)
  server.js              # Dev server (Express + Vite middleware)
  server.prod.mjs        # Prod server (Express + dist bundles)
  index.scss             # Reset + themes + global styles
```

## RSC/SSR with Vite: this project uses three entry points

```bash
entry.rsc.tsx: handles RSC requests (server).
entry.ssr.tsx: composes HTML and embeds payload.
entry.browser.tsx: hydrates on the client.
```

## Routes

```bash
/ → Home (MoviesGrid): 3 carousels (Action, Comedy, Horror).
SSR prefetch + dehydrate with TanStack Query.

/movie/:id/:category → MovieDetails: detail + wishlist button.
                     → scrollToTop on mount, category used for themes.

/wishlist → Wishlist: (Mobile) Carousel + (Desktop) grid
```
