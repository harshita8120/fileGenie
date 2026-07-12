# FileGenie

FileGenie is a fast, secure, full-stack web application designed for hassle-free file format conversion. Users can convert images, documents, and audio files completely free without compromising their data privacy.

## Features & Site Content

- **100% Free & Secure:** No ads, no hidden paywalls, and absolutely no cookie tracking.
- **Privacy First:** Uploaded files are processed securely and deleted from our servers within 24 hours.
- **Multi-Format Support:**
  - **Image:** Convert between popular image formats.
  - **Document:** Seamlessly switch text and data file extensions.
  - **Audio:** High-fidelity conversion.

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite (Fast HMR & Optimized Bundling)
- **Backend:** Node.js + Express.js (RESTful API Routing)
- **Database:** MongoDB (User metadata & optional file session logging)
- **Libraries:** Sharp (for image conversions)

---

## Libraries

- **sharp** does the actual image conversions, built on libvips.
- **multer** handles multipart/form-data parsing and file upload middleware for Express.
- **file-type** does the actual binary/magic-byte detection for verifying real file types.
- **node-cron** powers the cleanup job's scheduling.
- **tsx** dev-time TS runner.

## Project Structure

```text
fileGenie/
├── backend/          # Express API server & database logic
├── frontend/         # React application (Vite dev server)
├── README.md         # Project documentation
└── Setup.md         # Project local setup guidelines
```

---