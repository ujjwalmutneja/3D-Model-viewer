# 3D Model Viewer

A full-stack web application for browsing and viewing 3D models. Built with React, Three.js, Firebase, and Cloudinary.

## Features

- Browse a searchable list of 3D models
- View models interactively in the browser
- Upload new models (backend API)
- Delete models (backend API)
- Responsive, animated UI with Tailwind CSS

---

## Project Structure

```
viewer/
├── backend/
│   ├── .env
│   ├── firebase.js
│   ├── package.json
│   ├── server.js
│   └── routes/
│       └── model.js
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── firebase.js
│       ├── index.js
│       ├── index.css
│       └── components/
│           └── ModelViewer.js
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

---

### 1. Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```


2. **Start the backend server:**

   ```sh
   npm start
   ```

   The backend runs on [http://localhost:5000](http://localhost:5000).

---

### 2. Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend:**

   ```sh
   npm start
   ```

   The frontend runs on [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Browse Models:** Use the search bar to filter models.
- **View Model:** Click a model name to view it in 3D.
- **Upload/Delete:** Use backend API endpoints (`/upload`, `/delete/:id`) for model management.

---

## API Endpoints

### Backend (`http://localhost:5000`)

- `GET /models` — List all models
- `POST /upload` — Upload a new model (`name`, `description`, `driveLink`)
- `DELETE /delete/:id` — Delete a model by ID
- `POST /upload-file` — Upload a file from a URL to Cloudinary

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Three.js, @react-three/fiber, @react-three/drei
- **Backend:** Express, Firebase Admin SDK, Cloudinary, Multer, dotenv
- **Database:** Firestore

---

## Customization

- **Add Models:** Use the `/upload` endpoint or add directly in Firestore.
- **Change Styling:** Edit `frontend/src/App.css` and Tailwind config.

---

## License

MIT

---

## Credits

- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)
