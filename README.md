# 🕌 Smart MasjidConnect
**A Comprehensive, MERN-Stack Enterprise Resource Planning (ERP) System for Modern Mosque Management.**

Smart MasjidConnect bridges the gap between traditional mosque administration and modern community engagement. Built for Final Year Project (FYP) evaluation, this platform features a public-facing community portal and a highly secure, JWT-authenticated Administrative Hub for the Imam and mosque committee.

---

## ✨ Key Features

### 🌍 Public Community Portal
* **Live Prayer Times & Announcements:** Real-time updates for Jamaat timings.
* **Community Board & Janaza Alerts:** Integrated volunteer tracking for funeral arrangements.
* **Ramadan Operations:** Digital applications for Itikaf and Iftar sponsorships.
* **Lost & Found:** Report lost items or claim found items with image uploads.
* **Islamic Hub:** Daily Ayah, Ahadith, and an AI-powered Fiqh Agent for rapid Islamic Q&A.
* **Bilingual Support:** Seamlessly toggle between English and Urdu (اردو).

### 🔒 Secure Admin Hub (Command Center)
* **JWT Authentication:** Enterprise-grade security for administrative routes.
* **Maktab / Madrasa Management:** Track student enrollment, syllabus progress, and daily attendance.
* **Centralized Dashboard:** A modular, sleek sidebar interface to manage all community requests, approve notices, and update digital assets in real-time.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS, Lucide React, React Router DOM
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Multer (Image Uploads)
* **Database:** MongoDB, Mongoose ORM

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)
* [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone [https://github.com/Rao-Bilal/Smart-Masjid-Connect.git](https://github.com/Rao-Bilal/Smart-Masjid-Connect.git)
cd Smart-Masjid-Connect





2. Backend Setup:



# Install backend dependencies
npm install

# Create the uploads folder for lost & found images
mkdir uploads

# Start the backend server (Runs on http://localhost:5000)
node server.js


3. Frontend Setup:

# Install frontend dependencies
npm install

# Start the Vite React development server
npm run dev



🔐 System Access & Usage
The Public Portal
Navigate to http://localhost:5173 to view the public-facing community application.





Project Structure Overview



Smart-Masjid-Connect/
├── controllers/       # Backend business logic (Janaza, Maktab, Auth, etc.)
├── models/            # Mongoose database schemas
├── routes/            # Express API endpoints
├── middlewares/       # Security (JWT verification) and Uploads (Multer)
├── src/               # React Frontend Code
│   ├── components/    # Reusable UI components & Admin Modules
│   ├── pages/         # Core application pages
│   └── App.jsx        # Main routing and Protected Routes logic
├── uploads/           # User-uploaded images (Ignored by Git)
└── server.js          # Main Express server entry point








🛡️ Security Notes
Environment Variables: Never commit .env files. Ensure secrets like database URIs and JWT keys are kept secure.

Uploads Directory: The uploads/ folder is explicitly added to .gitignore to prevent user-generated files from bloating the repository.

Designed and Developed for FYP Evaluation.