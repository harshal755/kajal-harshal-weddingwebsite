# Kajal & Harshal — Wedding Invitation

A responsive wedding invitation website inspired by the supplied reference. Built with Next.js, React, TypeScript and custom CSS.

## Confirmed details in this version
- Couple: Kajal & Harshal
- Wedding date: Saturday, 5 December 2026
- Venue: Netaji Mangal Karyalay, Hadapsar, Pune
- Venue address used for directions: Manjri Road, Subhash Nagar, Chaitanya Colony, Hadapsar, Pune, Maharashtra 411028

## Run locally

1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Deploy to Vercel

1. Create a GitHub repository and upload the contents of this folder.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository. Vercel should detect Next.js automatically.
4. Keep the default build command (`npm run build`) and deploy.
5. Share the generated `.vercel.app` URL with guests.

## Before sharing widely

- Confirm the exact ceremony start time. The countdown currently counts down to the beginning of 5 December 2026 (midnight, India time), because no ceremony time was supplied.
- Confirm whether the displayed venue address is the correct entrance / hall for your booking.
- Add family names, additional functions, times, contact details or photos only after they are confirmed.

## Easy customizations

- Main content and venue link: `app/page.tsx`
- Colours, typography and layout: `app/globals.css`
- Page title and sharing description: `app/layout.tsx`
- Calendar event: `public/kajal-harshal-wedding.ics`
