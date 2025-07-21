
# 🚀 Skill to Startup Matcher

Skill to Startup Matcher is a full-stack platform that connects individuals with startup ideas based on their skills and interests. It allows users to log in securely, showcase their skills, match with startups, collaborate on project boards, and communicate in real-time chat.

---

## 🌐 Live Demo

👉 [Visit the App](https://skilltostartupmatcher.vercel.app)

---

## 📂 Project Structure

```
Skill_to_Startup_Matcher/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── assets/             # Images, logos
│   │   ├── components/         # Reusable components
│   │   │   ├── Auth/           # Signup/Login UI
│   │   │   ├── Board/          # Project board components
│   │   │   ├── Chat/           # Real-time chat UI
│   │   │   └── Team/           # Team management
│   │   ├── pages/              # Route-based pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProjectBoard.jsx
│   │   │   └── Signup.jsx / Login.jsx
│   │   ├── services/           # API and Firebase interaction
│   │   ├── firebase.js         # Firebase client SDK setup
│   │   └── App.jsx / main.jsx
│   └── vite.config.js
├── server/                     # Node.js Backend
│   ├── config/                 # Firebase Admin setup
│   ├── controllers/           # Controller logic
│   ├── routes/                # Express routes
│   ├── services/              # Custom Firebase service logic
│   └── index.js               # Main Express entry
├── .env                        # Environment variables
├── README.md
└── package.json               # Root config
```

---

## ⚙️ Features

- 🔐 Firebase Authentication (Login/Signup with token verification)
- 💼 Skill & Startup Matching
- 🧠 Dynamic Dashboard
- 🗂 Kanban-Style Project Boards
- 💬 Real-time Chat (per project)
- 👥 Team Management & Requests
- 📦 Vercel/Firebase Deployment Ready

---

## 🛠️ Tech Stack

**Frontend:**
- React.js + Tailwind CSS
- Firebase (Auth, Firestore)
- Vite, Framer Motion

**Backend:**
- Node.js + Express
- Firebase Admin SDK
- Firestore (NoSQL Database)

**Hosting:**
- Vercel (Frontend)
- Firebase Hosting + Functions (Backend)
- GitHub

---

## 🧪 Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/arnitgupta1234/Skill_to_Startup_Matcher.git
cd Skill_to_Startup_Matcher
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

> 🔑 You'll also need a `firebaseServiceAccountKey.json` in `server/config/`

Then run the server:

```bash
npm run dev
```

---

### 3. Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Then run the app:

```bash
npm run dev
```

Open in browser: `http://localhost:5173`

---

## 🚀 Deployment

### Frontend (Vercel)
- Connect GitHub repo to [Vercel](https://vercel.com)
- Set environment variables in Vercel → Project Settings → Environment Variables
- Deploy directly from the `client/` folder as the root

### Backend (Firebase or Railway)
- Use Firebase Functions (or a custom Node hosting service like Render or Railway)
- Make sure your Firebase service account and Firestore permissions are correctly configured

---

## 🧱 Future Improvements

- AI-based skill-matching engine
- Project milestones and file sharing
- Role-based access control
- Mobile app support (React Native)
- Notifications (Push/Email)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Credits

Built by [Arnit Gupta](https://github.com/arnitgupta1234) and contributors.
