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

---

## Project Structure

```text
fileGenie/
├── backend/          # Express API server & database logic
├── frontend/         # React application (Vite dev server)
└── README.md         # Project documentation
```

---

## Installation & Setup

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### 2. Backend Setup
1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and add your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---


