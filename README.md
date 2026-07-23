# FileGenie

FileGenie is a fast, secure, full-stack web application for hassle-free file format conversion. Convert images, documents, and audio files — completely free, with no accounts, no ads, and no cookie tracking.

## Features

- **100% Free & Secure:** No ads, no paywalls, no cookie tracking, no login required.
- **Privacy First:** Converted files are automatically deleted from our servers after a short expiry window (10 minutes).
- **Multi-Format Support:**
  - **Image:** JPEG, PNG, WEBP, AVIF, TIFF, GIF — convert between any of these.
  - **Document:** DOCX, PPTX, TXT, XLSX → PDF.
  - **Audio:** MP3, WAV, FLAC, AAC, OGG, M4A, OPUS — convert between any of these.

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript (ESM)
- **Database:** MongoDB (Mongoose) — stores only converted-file metadata and expiry, no user accounts or personal data
- **Docker container:** [Gotenberg](https://gotenberg.dev/) (self-hosted, Docker-based, wraps LibreOffice + Chromium)

---

## Core Libraries

- **sharp** does the actual image conversions, built on libvips.
- **multer** handles multipart/form-data parsing and file upload middleware for Express.
- **file-type** does the actual binary/magic-byte detection for verifying real file types.
- **node-cron** powers the cleanup job's scheduling.
- **tsx** is the dev-time TS runner.
- **ffmpeg-static** + Node's **child_process** — audio conversion, spawns the bundled ffmpeg binary directly

## Project Structure

```text
fileGenie/
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── temp/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── README.md
└── Setup.md
```

---

## Getting Started

See [Setup.md](./Setup.md) for full local development setup instructions, including required environment variables and the Gotenberg/Docker prerequisite for document conversion.

---

## Usage of AI

**Claude Sonnet 4.5** has been used for research and debugging.