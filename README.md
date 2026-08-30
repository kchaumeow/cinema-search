# Cinema Poisk

A film and series catalogue built on [The Movie Database](https://developer.themoviedb.org/docs) API.

## Getting an API token

Create a free TMDB account, open **Settings → API**, and copy the
**API Read Access Token** (the long JWT, not the shorter v3 API key). Pass it
to every command below as the `TOKEN` environment variable — the app sends it
as `Authorization: Bearer <token>`.

The free tier has no daily request cap; the only limit is roughly 50 requests
per second per IP address.

## Install

```bash
npm i
```

### Run in development

```bash
TOKEN=YOUR_TOKEN npm run dev
# on Windows the TOKEN prefix is handled by cross-env
```

### Run in production mode

```bash
TOKEN=YOUR_TOKEN npm run start
```

The app is served at http://localhost:7070.

### Run the tests

```bash
npm test
```

### Docker

```bash
docker build --build-arg TOKEN=YOUR_TOKEN -t your_tag .
```

```bash
docker run -it -p 7070:80 --rm your_tag
# your_tag must match the tag used in the build step
```

## Features

1. **Catalogue**
    - Films and series, switchable from the header of the list
    - Pagination — TMDB serves a fixed 20 results per page
    - Filtering by genre, origin country and release year; films can also be
      filtered by US age certification
    - Search across films and series by title
    - Navigation from a result to its detail page
    - *Extras:*
        - Media type, filters and page number live in the URL, so a result set
          can be shared by copying the link
        - Search history (last 20 queries)
        - Suggestions from previously entered queries while typing
        - Search debounced by one second after the last keystroke

2. **Detail page**
    - Title, poster, rating, year, genres and overview
    - Cast, paginated five at a time
    - Seasons and episodes for series
    - User reviews, paginated
    - Posters in a carousel
    - Similar titles as a grid
    - Placeholder text wherever the API returns nothing
    - Back button that returns to the results with filters and page intact
    - *Extras:*
        - Sign-in flow
        - Random title page with the same filters

3. **Technical notes**
    - Single-page app — navigation never reloads the page (no Next.js)
    - React Router v6 for routing
    - Responsive layout for both mobile and desktop
    - Films and series are normalised into one shape in the API layer, so
      components never branch on media type
    - The detail page is a single request — cast, images and similar titles
      come back via `append_to_response`
    - Requests belonging to the previous page are aborted on navigation
    - Written in TypeScript
    - Dockerfile for containerised builds
    - Unit tests

## Stack

+ React
+ TypeScript
+ Vitest
+ React Router v6
+ Chakra UI + Choc UI
+ use-debounce
+ Webpack 5
+ RTK + RTK Query
