// // src/components/Navbar.jsx
// import { Link } from 'react-router-dom';
// import masjidLogoImage from '../assets/logo-mosque.jpg'; 

// export default function Navbar({ setLang, lang, t }) {
//   // === LOCAL LINKS MAPPING ===
//   // Added the new PRD modules here so they auto-render in the navbar
//   const navLinks = [
//     { key: 'navHome', path: '/' },
//     { key: 'navPrayers', path: '/prayers' },
//     { key: 'navAbout', path: '/about' }, 
//     { key: 'navAnnouncements', path: '/announcements' },
//     { key: 'navEvents', path: '/events' },     
//     { key: 'navQuran', path: '/quran' },       
//     { key: 'navNotices', path: '/notices' },   
//     { key: 'navIntezamia', path: '/intezamia' }, 
//   ];

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* Logo and Project Name */}
//         <Link to="/" className="flex items-center gap-3 hover:opacity-90">
//           <img 
//             src={masjidLogoImage} 
//             alt="Masjid Logo" 
//             className="h-10 w-10 rounded-full object-cover object-center border-2 border-masjid-gold/30 shadow-md" 
//           />
//           <div className="flex flex-col">
//             <span className="text-xl font-extrabold text-masjid-dark tracking-tight">{t.projectName}</span>
//             {lang === 'en' && <span className="text-xs text-slate-500 font-serif tracking-wide" dir="rtl">{t.urduMasjidName}</span>}
//           </div>
//         </Link>

//         {/* Navigation Links - Hidden on mobile */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map(link => (
//             <Link key={link.key} to={link.path} className="text-masjid-dark hover:text-masjid-gold font-semibold transition-colors whitespace-nowrap">
//               {t[link.key]}
//             </Link>
//           ))}
//         </div>

//         {/* Action Buttons & Language Toggle */}
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
//             className="px-4 py-1.5 border border-masjid-dark text-masjid-dark rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors"
//           >
//             {lang === 'en' ? 'اردو' : 'English'}
//           </button>
          
//           <Link to="/donate" className="bg-masjid-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-masjid-gold/90 transition-transform transform hover:scale-105 shadow-md whitespace-nowrap">
//             {t.navDonate}
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }

// src/components/Navbar.jsx
import { useState } from 'react'; // Added useState for mobile menu toggle
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Added icons for the hamburger menu
import masjidLogoImage from '../assets/logo-mosque.jpg'; 

export default function Navbar({ setLang, lang, t }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const navLinks = [
    { key: 'navHome', path: '/' },
    { key: 'navPrayers', path: '/prayers' },
    { key: 'navAbout', path: '/about' }, 
    { key: 'navAnnouncements', path: '/announcements' },
    { key: 'navEvents', path: '/events' },     
    { key: 'navQuran', path: '/quran' },       
    { key: 'navNotices', path: '/notices' },   
    { key: 'navIntezamia', path: '/intezamia' }, 
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo and Project Name */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90">
          <img 
            src={masjidLogoImage} 
            alt="Masjid Logo" 
            className="h-10 w-10 rounded-full object-cover object-center border-2 border-masjid-gold/30 shadow-md" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-masjid-dark tracking-tight">{t.projectName}</span>
            {lang === 'en' && <span className="text-xs text-slate-500 font-serif tracking-wide" dir="rtl">{t.urduMasjidName}</span>}
          </div>
        </Link>

        {/* Desktop Navigation Links - Changed from md:flex to lg:flex to fit 8 links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.key} to={link.path} className="text-masjid-dark hover:text-masjid-gold font-semibold text-sm transition-colors whitespace-nowrap">
              {t[link.key]}
            </Link>
          ))}
        </div>

        {/* Action Buttons & Language Toggle - Desktop Only */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="px-4 py-1.5 border border-masjid-dark text-masjid-dark rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            {lang === 'en' ? 'اردو' : 'English'}
          </button>
          
          <Link to="/donate" className="bg-masjid-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-masjid-gold/90 transition-transform transform hover:scale-105 shadow-md whitespace-nowrap">
            {t.navDonate}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="lg:hidden p-2 text-masjid-dark hover:text-masjid-gold transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 shadow-inner">
          {navLinks.map(link => (
            <Link 
              key={link.key} 
              to={link.path} 
              onClick={() => setIsOpen(false)} // Close menu when a link is clicked
              className="block text-masjid-dark hover:text-masjid-gold font-semibold transition-colors"
            >
              {t[link.key]}
            </Link>
          ))}
          
          {/* Mobile Actions: Language & Donate */}
          <div className="pt-4 flex flex-col gap-3 border-t border-slate-100">
            <button 
              onClick={() => { setLang(lang === 'en' ? 'ur' : 'en'); setIsOpen(false); }}
              className="w-full px-4 py-2 border border-masjid-dark text-masjid-dark rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              {lang === 'en' ? 'Switch to اردو' : 'Switch to English'}
            </button>
            <Link 
              to="/donate" 
              onClick={() => setIsOpen(false)}
              className="w-full bg-masjid-gold text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-masjid-gold/90 transition-colors"
            >
              {t.navDonate}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}