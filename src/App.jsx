// // src/App.jsx
// import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// // Import all our Pages
// import HomePage from './pages/HomePage'
// import IntroPage from './pages/IntroPage'
// import PrayersPage from './pages/PrayersPage'
// import AnnouncementsPage from './pages/AnnouncementsPage'
// import DonatePage from './pages/DonatePage'
// import IntezamiaPage from './pages/IntezamiaPage'
// import AdminPanel from './pages/AdminPanel.jsx';
// import EventsPage from './pages/EventsPage.jsx'
// import NoticeBoardPage from './pages/NoticeBoardPage.jsx'
// import QuranHubPage from './pages/QuranHubPage.jsx'


// import JanazaPage from './pages/JanazaPage.jsx';

// import LostAndFoundPage from './pages/LostAndFoundPage';
// import AdminDashboard from './pages/AdminDashboard';


// // NEW PORTAL IMPORT
// import RamadanPortal from './pages/RamadanPortal.jsx'
// import FiqhAgentPage from './pages/FiqhAgentPage.jsx';

// // === LOCALIZATION DATA ===
// const localizations = {
//   en: {
//     projectName: "Smart MasjidConnect",
//     urduMasjidName: "مدینہ مسجد ساہیوال", 
//     navHome: "Home",
//     navAbout: "Introduction", 
//     navPrayers: "Prayers",
//     navAnnouncements: "Announcements",
//     navEvents: "Events",
//     navQuran: "Quran Hub",
//     navNotices: "Notice Board",
//     navRamadan: "Ramadan",          // Added for Navbar
//     navDonate: "Donate Now",
//     navIntezamia: "Intezamia", 
//     heroWelcome: "Welcome To Madina Masjid Sahiwal",
//     hadithTitle: "Daily Hadith",
//     hadithText: "He who believes in Allah and the Last Day, let him show hospitality to his guest.",
//     nextPrayer: "Next Prayer",
//     saveChange: "Save Changes",
//     navAboutUs: "About Us",
// navCommunity: "Community",
// navIslamicHub: "Islamic Hub",
// navLostFound: "Lost & Found",
// navJanaza: "Janaza Alerts",
// navFiqhAgent: "Fiqh Agent",
// "navAdmin": "Admin Portal",

//   },
//   ur: {
//     projectName: "اسمارٹ مسجد کنیکٹ",
//     urduMasjidName: "مدینہ مسجد ساہیوال", 
//     navHome: "ہوم",
//     navAbout: "مسجد کا تعارف", 
//     navPrayers: "نماز کے اوقات",
//     navAnnouncements: "اعلانات",
//     navEvents: "تقاریب",
//     navQuran: "قرآن مرکز",
//     navNotices: "کمیونٹی بورڈ",
//     navRamadan: "رمضان",            // Added for Navbar
//     navDonate: "عطیہ کریں",
//     navIntezamia: "انتظامیہ", 
//     heroWelcome: "مدینہ مسجد ساہیوال میں خوش آمدید",
//     hadithTitle: "روزانہ حدیث",
//     hadithText: "جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے، اسے چاہیے کہ اپنے مہمان کی مہمان نوازی کرے۔",
//     nextPrayer: "اگلی نماز",
//     saveChange: "تبدیلی محفوظ کریں",
//     navAboutUs: "ہمارے بارے میں",
// navCommunity: "کمیونٹی",
// navIslamicHub: "اسلامی مرکز",
// navLostFound: "گمشدہ اور یافتہ",
// navJanaza: "جنازہ کے اعلانات",
// navFiqhAgent: "فقہ ایجنٹ",
// "navAdmin": "ایڈمن پورٹل",
//   }
// };

// function App() {
//   const [lang, setLang] = useState('en'); // 'en' or 'ur'
//   const t = localizations[lang];

//   return (
//     // Handle RTL/LTR based on language
//     <div className={`flex flex-col min-h-screen ${lang === 'ur' ? 'font-serif text-right' : 'font-sans text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      
//       {/* Header and language toggle pass localization */}
//       <Navbar setLang={setLang} lang={lang} t={t} />
      
//       {/* === MAIN ROUTING AREA === */}
//       <main className="flex-grow">
//         <Routes>
//           {/* Default Route (the Home Page) */}
//           <Route path="/" element={<HomePage t={t} />} />
          
//           {/* Core Pages Routes */}
//           <Route path="/about" element={<IntroPage t={t} />} />
//           <Route path="/prayers" element={<PrayersPage t={t} />} />
//           <Route path="/announcements" element={<AnnouncementsPage t={t} />} />
//           <Route path="/donate" element={<DonatePage t={t} />} />
//           <Route path="/intezamia" element={<IntezamiaPage t={t} />} />
//           <Route path="/events" element={<EventsPage t={t} />} />
//           <Route path="/quran" element={<QuranHubPage t={t} />} />
//           <Route path="/notices" element={<NoticeBoardPage t={t} />} />

//           {/* New Feature Routes */}
//           <Route path="/ramadan" element={<RamadanPortal />} /> 
//           <Route path="/admin" element={<AdminPanel />} /> 
          
//           <Route path="/lost-and-found" element={<LostAndFoundPage />} />
// <Route path="/janaza" element={<JanazaPage />} />

// <Route path="/fiqh-agent" element={<FiqhAgentPage />} />

// <Route path="/lost-and-found" element={<LostAndFoundPage />} />

// <Route path="/admin" element={<AdminDashboard />} />
//           {/* Fallback (optional: a basic 404 handler) */}
//           <Route path="*" element={<div className="text-center p-20 text-xl font-bold">404 - Page Not Found</div>} />
//         </Routes>
//       </main>

//       <Footer t={t} />
//     </div>
//   )
// }

// export default App



// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all our Pages
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import PrayersPage from './pages/PrayersPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import DonatePage from './pages/DonatePage';
import IntezamiaPage from './pages/IntezamiaPage';
import AdminPanel from './pages/AdminPanel.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NoticeBoardPage from './pages/NoticeBoardPage.jsx';
import QuranHubPage from './pages/QuranHubPage.jsx';
import JanazaPage from './pages/JanazaPage.jsx';
import LostAndFoundPage from './pages/LostAndFoundPage';
import RamadanPortal from './pages/RamadanPortal.jsx';
import FiqhAgentPage from './pages/FiqhAgentPage.jsx';

// NEW ADMIN LOGIN PORTAL
import AdminLogin from './pages/AdminLogin.jsx';

// === LOCALIZATION DATA ===
const localizations = {
  en: {
    projectName: "Smart MasjidConnect",
    urduMasjidName: "مدینہ مسجد ساہیوال", 
    navHome: "Home",
    navAbout: "Introduction", 
    navPrayers: "Prayers",
    navAnnouncements: "Announcements",
    navEvents: "Events",
    navQuran: "Quran Hub",
    navNotices: "Notice Board",
    navRamadan: "Ramadan",          
    navDonate: "Donate Now",
    navIntezamia: "Intezamia", 
    heroWelcome: "Welcome To Madina Masjid Sahiwal",
    hadithTitle: "Daily Hadith",
    hadithText: "He who believes in Allah and the Last Day, let him show hospitality to his guest.",
    nextPrayer: "Next Prayer",
    saveChange: "Save Changes",
    navAboutUs: "About Us",
    navCommunity: "Community",
    navIslamicHub: "Islamic Hub",
    navLostFound: "Lost & Found",
    navJanaza: "Janaza Alerts",
    navFiqhAgent: "Fiqh Agent",
    navAdmin: "Admin Portal",
  },
  ur: {
    projectName: "اسمارٹ مسجد کنیکٹ",
    urduMasjidName: "مدینہ مسجد ساہیوال", 
    navHome: "ہوم",
    navAbout: "مسجد کا تعارف", 
    navPrayers: "نماز کے اوقات",
    navAnnouncements: "اعلانات",
    navEvents: "تقاریب",
    navQuran: "قرآن مرکز",
    navNotices: "کمیونٹی بورڈ",
    navRamadan: "رمضان",            
    navDonate: "عطیہ کریں",
    navIntezamia: "انتظامیہ", 
    heroWelcome: "مدینہ مسجد ساہیوال میں خوش آمدید",
    hadithTitle: "روزانہ حدیث",
    hadithText: "جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے، اسے چاہیے کہ اپنے مہمان کی مہمان نوازی کرے۔",
    nextPrayer: "اگلی نماز",
    saveChange: "تبدیلی محفوظ کریں",
    navAboutUs: "ہمارے بارے میں",
    navCommunity: "کمیونٹی",
    navIslamicHub: "اسلامی مرکز",
    navLostFound: "گمشدہ اور یافتہ",
    navJanaza: "جنازہ کے اعلانات",
    navFiqhAgent: "فقہ ایجنٹ",
    navAdmin: "ایڈمن پورٹل",
  }
};

// === CREATING THE SHIELD (PROTECTED ROUTE) ===
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  // If token exists, allow access. If not, bounce back to login page.
  return token ? children : <Navigate to="/admin-login" />;
};

function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'ur'
  const t = localizations[lang];

  return (
    // Handle RTL/LTR based on language
    <div className={`flex flex-col min-h-screen ${lang === 'ur' ? 'font-serif text-right' : 'font-sans text-left'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      
      {/* Header and language toggle pass localization */}
      <Navbar setLang={setLang} lang={lang} t={t} />
      
      {/* === MAIN ROUTING AREA === */}
      <main className="flex-grow">
        <Routes>
          {/* Default Route (the Home Page) */}
          <Route path="/" element={<HomePage t={t} />} />
          
          {/* Core Pages Routes */}
          <Route path="/about" element={<IntroPage t={t} />} />
          <Route path="/prayers" element={<PrayersPage t={t} />} />
          <Route path="/announcements" element={<AnnouncementsPage t={t} />} />
          <Route path="/donate" element={<DonatePage t={t} />} />
          <Route path="/intezamia" element={<IntezamiaPage t={t} />} />
          <Route path="/events" element={<EventsPage t={t} />} />
          <Route path="/quran" element={<QuranHubPage t={t} />} />
          <Route path="/notices" element={<NoticeBoardPage t={t} />} />

          {/* New Feature Routes */}
          <Route path="/ramadan" element={<RamadanPortal />} /> 
          <Route path="/lost-and-found" element={<LostAndFoundPage />} />
          <Route path="/janaza" element={<JanazaPage />} />
          <Route path="/fiqh-agent" element={<FiqhAgentPage />} />

          {/* === SECURED ADMIN ROUTES === */}
          {/* The Public Login Page */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* The Protected Dashboard */}
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminPanel />
              </ProtectedAdminRoute>
            } 
          />
          
          {/* Fallback (a basic 404 handler) */}
          <Route path="*" element={<div className="text-center p-20 text-xl font-bold">404 - Page Not Found</div>} />
        </Routes>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default App;