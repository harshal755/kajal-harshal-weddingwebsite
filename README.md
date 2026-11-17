# Kajal & Harshal — Wedding Invitation

A mobile-first, photo-led wedding invitation with an animated envelope opening, parallax photo chapters, a live countdown to the wedding muhurta, an event itinerary, venue directions, and an interactive photo gallery.

## Wedding details included

- **Couple:** Kajal & Harshal
- **Date:** Saturday, 5 December 2026
- **Venue:** Netaji Mangal Karyalay, Hadapsar, Pune
- **Haldi:** 9:17 AM
- **Saptapadi:** 1:17 PM
- **Lunch:** 1:00 PM – 5:00 PM
- **Varmala & wedding muhurta:** 6:17 PM
- **Countdown target:** 5 December 2026, 6:17 PM India time

The ceremony timings are displayed as supplied. In particular, Saptapadi and lunch overlap in the supplied timings; confirm that is intentional before sharing the invitation widely.

## Photo handling

The 12 image uploads included one exact duplicate, so the project includes all **11 distinct photographs**. They are saved as optimized WebP website copies in `public/photos/`. Your original uploads have not been changed. The gallery includes all 11 distinct images and opens each one in a full-screen viewer.

## Run locally

1. Install Node.js LTS.
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and upload the contents of this project folder.
2. Sign in to Vercel and select **Add New → Project**.
3. Import the GitHub repository. Vercel should detect Next.js automatically.
4. Keep the default build command (`npm run build`) and deploy.
5. Vercel will provide a public `.vercel.app` URL that can be shared with guests.

## Easy updates later

Most wedding content is centralized in `wedding-details.json`:

- Names, date, venue and Google Maps link
- Countdown target
- Ceremony names, times and descriptions
- Photo captions and alternative text
- Optional music file path

To replace or add photographs, put optimized image files in `public/photos/` and update the `photos` array in `wedding-details.json`.

### Add background music later

The music control is already prepared but hidden until a track is selected. To enable it:

1. Add an audio file you have permission to use to `public/music/` (for example, `wedding-instrumental.mp3`).
2. Set `musicSrc` in `wedding-details.json` to `/music/wedding-instrumental.mp3`.

Guests must press Play; browsers generally block autoplay with sound. The music can be changed or removed later.

## Project structure

- `app/page.tsx` — page layout and interactions
- `app/globals.css` — colors, typography, responsive layout and animations
- `app/layout.tsx` — page metadata
- `wedding-details.json` — editable wedding content
- `public/photos/` — optimized copies of the supplied photos
- `public/kajal-harshal-wedding.ics` — all-day calendar entry with the ceremony schedule

## Before the public launch

- Confirm whether the Saptapadi time of 1:17 PM and lunch window of 1:00–5:00 PM intentionally overlap.
- Confirm the exact venue listing/map pin and entrance.
- Select the background music, if desired.
- Add any family names or phone numbers only if you want them public.

The page respects reduced-motion preferences and uses manual user interaction for the opening and music playback.
