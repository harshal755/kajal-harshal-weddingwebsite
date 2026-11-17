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
Edit `wedding-details.json` to change names, date, venue, schedule times, captions, and music path. To add music, put an audio file in `public/music/` and set `musicSrc` to its public path (for example `/music/your-song.mp3`).

## Deploy
The project root is this folder (the folder containing `package.json` and `app/`). Use `/` as the Vercel Root Directory.
