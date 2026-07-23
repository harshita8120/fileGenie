# Local Setup Guide

## 1. Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — required for document conversion (runs Gotenberg)
- A MongoDB connection string — either a local MongoDB instance, or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

## 2. Start Gotenberg (required for document conversion)

Gotenberg runs as a separate Docker container and must be running before you start the backend.

```bash
docker run --rm -p 3000:3000 gotenberg/gotenberg:8
```

Leave this running in its own terminal. Verify it's up:
```bash
curl http://localhost:3000/health
```

> Note: image and audio conversion work fine without this — only document conversion requires Gotenberg.

## 3. Backend Setup

```bash
cd backend
npm install
```

Create a `backend/.env` file:
```env
PORT=4500
MONGO_URI=your_mongodb_connection_string
GOTENBERG_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

You should see `MongoDB connected` and `Server running at http://localhost:4500`.

## 4. Frontend Setup

In a **new** terminal:
```bash
cd frontend
npm install
```

Create a `frontend/.env` file:
```env
VITE_API_URL=http://localhost:4500/api
```

Start the frontend:
```bash
npm run dev
```

Visit the URL Vite prints (typically `http://localhost:5173`).

## 5. Verify everything works

- Convert an image (e.g., JPG → PNG) — tests the core backend + MongoDB flow.
- Convert an audio file (e.g., MP3 → WAV) — tests ffmpeg integration.
- Convert a document (e.g., DOCX → PDF) — tests the Gotenberg integration; if this fails, confirm Gotenberg is running (step 2).