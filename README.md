# Kajal & Harshal Wedding Invitation

A Next.js wedding invitation site. All event information and image captions are editable in `wedding-details.json`.

## Run locally
1. Install Node.js 20 or later.
2. Open this folder in a terminal.
3. Run `npm install` and then `npm run dev`.
4. Open http://localhost:3000.

## Photos
All 12 couple photographs are stored in `public/photos/` and listed in `wedding-details.json`. Replace a file using the same filename to update a photo, or change the `src` in the JSON.

## Edit wedding details
Edit `wedding-details.json` to change names, date, venue, schedule times, photo captions, map links and the featured music embed. The current featured track is a YouTube-hosted Kesariya flute cover; update the `music.embedUrl`, `music.title`, and `music.artist` fields to change it. The embedded player requires the guest to press Play; browsers generally block sound autoplay.

## Deploy
The project root is this folder (the folder containing `package.json` and `app/`). Use `/` as the Vercel Root Directory.

## Venue map
The responsive Google Maps preview uses `mapsEmbedUrl`; the separate `mapsUrl` opens full directions in Google Maps.
