# Topeka Christian Football Association

A responsive two-page website for TCFA's first season in 2026. The visual identity uses a red, white, and charcoal palette with high school football imagery. The Forms page includes the current Participation Application.

## Run locally

```bash
npm install
npm run dev
```

The production check is `npm run build` and the type check is `npm run lint`.

## Connect the shared Drive

1. Use the configured shared Google Drive folder and make sure families have viewer access. Documents and football photos can live in the same folder.
2. Copy `.env.example` to `.env` and set `VITE_GOOGLE_DRIVE_FOLDER_URL` to that folder URL.
3. For automatic filtering, open `google-apps-script/Code.gs`, replace `FOLDER_ID`, deploy it as a web app, and set `VITE_GOOGLE_DRIVE_FEED_URL` to the deployment URL.
4. Upload documents to the folder with `FINAL` in the filename. The forms page will display only those files from the feed.

Without a feed URL, the forms page displays the included sample documents and still links families to the shared folder. Replace the sample content in `src/App.tsx` when the real season documents are ready.

## Pages

- `/` — home page, club story, values, and season CTA
- `/forms` — downloadable forms and information directory
