# Legends - legends.app

Next.js (App Router) + React. No Tailwind, no UI libraries: all styles in `app/globals.css` (+ `app/online.css` for the online session page).
Interactions are plain DOM code in `lib/site.js`; drawings are canvas code in `lib/city.js` (home city) and `lib/scene.js` (page headers).

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Pages
| Route | File |
|---|---|
| `/` | `app/page.jsx` - scroll hero (`components/HeroScroll.jsx`: LEGENDS with the event film inside the letters, fly-through, film framed on cream), about, events (next dinner + list, online), blog, membership |
| `/events` | `app/events/page.jsx` - in person (next dinner + cards), online (sessions, upcoming first) |
| `/events/<slug>` | `app/events/[slug]/page.jsx` - dinner page (video hero, why, guest list, form with the table, evening, gallery, FAQ) |
| `/events/legends-online-06` | `app/events/legends-online-06/page.jsx` - online session page |
| `/blog` | `app/blog/page.jsx` - essays |
| `/blog/<slug>` | `app/blog/[slug]/page.jsx` - essay page |

## Content
- `data/events.js` - dinners (city, date, summit week). Past dates drop off at build time. Hero video per city: `legends.app/events/<slug>/media/hero.mp4`.
- `data/online.js` - next Legends Online session (TODO: confirm speaker/date) and previous sessions.
- `data/blog.js` - essays. The full text is pulled from `belegends.club/blog/<slug>` at build time and refreshed every hour (`lib/essay.js`, needs `node-html-parser`). If that fails the page links to the original.
- `components/ApplyModal.jsx` - Apply to join / Member login modal.
- Forms (apply, invitation, online registration) are prototypes: TODO send to the CRM in `lib/site.js` (`track()` already pushes `application_submitted` to the GTM dataLayer).
