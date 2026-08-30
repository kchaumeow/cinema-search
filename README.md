# Cinema Poisk

A film and series catalogue built on the [kinopoisk.dev](https://api.poiskkino.dev/documentation) API.

## Getting an API token

The API requires a key. Get one from the Telegram bot
[@poiskkinodev_bot](https://t.me/poiskkinodev_bot) and pass it to every command
below as the `TOKEN` environment variable.

Note that the free demo tier only serves the first 10 pages of results and a
page size of at most 10.

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
    - List of films and series
    - Pagination
    - Selectable page size (5, 7 or 10 — 10 by default)
    - Filtering by genre, country, year and age rating
    - Search by title
    - Navigation from a result to its detail page
    - *Extras:*
        - Filters and page number live in the URL, so a result set can be shared by copying the link
        - Search history (last 20 queries)
        - Suggestions from previously entered queries while typing
        - Suggestions filtered by substring match
        - Search debounced by one second after the last keystroke

2. **Detail page**
    - Title or logo, description and rating
    - Cast, paginated five at a time
    - Seasons and episodes for series
    - User reviews, paginated
    - Posters in a carousel
    - Similar titles as a grid
    - Placeholder text wherever the API returns nothing
    - Back button that returns to the results with filters and page number intact
    - *Extras:*
        - Sign-in flow
        - Random title page with the same filters

3. **Technical notes**
    - Single-page app — navigation never reloads the page (no Next.js)
    - React Router v6 for routing
    - Responsive layout for both mobile and desktop
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
