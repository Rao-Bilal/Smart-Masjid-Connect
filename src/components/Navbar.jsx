// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; 
import masjidLogoImage from '../assets/logo-mosque.jpg'; 

export default function Navbar({ setLang, lang, t }) {
  const [isOpen, setIsOpen] = useState(false);

  // === HIERARCHICAL NAV STRUCTURE ===
  const navStructure = [
    { type: 'link', key: 'navHome', path: '/' },
    {
      type: 'dropdown',
      titleKey: 'navAboutUs',
      items: [
        { key: 'navAbout', path: '/about' },
        { key: 'navIntezamia', path: '/intezamia' },
      ]
    },
    {
      type: 'dropdown',
      titleKey: 'navCommunity',
      items: [
        { key: 'navAnnouncements', path: '/announcements' },
        { key: 'navJanaza', path: '/janaza' },            
        { key: 'navEvents', path: '/events' },    
        { key: 'navNotices', path: '/notices' },
        { key: 'navLostFound', path: '/lost-and-found' },
        { key: 'navFiqhAgent', path: '/fiqh-agent' },  
      ]
    },
    {
      type: 'dropdown',
      titleKey: 'navIslamicHub',
      items: [
        { key: 'navPrayers', path: '/prayers' },
        { key: 'navQuran', path: '/quran' },
        { key: 'navRamadan', path: '/ramadan' },
      ]
    },
    // Admin Portal Link
    { type: 'link', key: 'navAdmin', path: '/admin' } 
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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navStructure.map((navItem, index) => (
            navItem.type === 'link' ? (
              // Standard Link
              <Link key={index} to={navItem.path} className="text-masjid-dark hover:text-masjid-gold font-semibold text-sm transition-colors">
                {t[navItem.key]}
              </Link>
            ) : (
              // Dropdown Menu using Tailwind Group Hover
              <div key={index} className="relative group">
                <button className="flex items-center gap-1 text-masjid-dark hover:text-masjid-gold font-semibold text-sm py-2 transition-colors">
                  {t[navItem.titleKey]}
                  <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                </button>
                
                {/* The Dropdown Card */}
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-slate-100 overflow-hidden transform origin-top scale-95 group-hover:scale-100">
                  <div className="py-2">
                    {navItem.items.map(subItem => (
                      <Link 
                        key={subItem.key} 
                        to={subItem.path} 
                        className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-masjid-gold transition-colors"
                      >
                        {t[subItem.key]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Action Buttons & Language Toggle - Desktop Only */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="px-4 py-1.5 border border-slate-300 text-masjid-dark rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors"
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
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-6 shadow-inner max-h-[80vh] overflow-y-auto">
          {navStructure.map((navItem, index) => (
            navItem.type === 'link' ? (
              <Link 
                key={index} 
                to={navItem.path} 
                onClick={() => setIsOpen(false)} 
                className="block text-lg text-masjid-dark hover:text-masjid-gold font-bold transition-colors"
              >
                {t[navItem.key]}
              </Link>
            ) : (
              // Mobile Grouped Section
              <div key={index} className="pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t[navItem.titleKey]}
                </div>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100">
                  {navItem.items.map(subItem => (
                    <Link 
                      key={subItem.key} 
                      to={subItem.path} 
                      onClick={() => setIsOpen(false)}
                      className="block text-masjid-dark hover:text-masjid-gold font-semibold transition-colors"
                    >
                      {t[subItem.key]}
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
          
          {/* Mobile Actions: Language & Donate */}
          <div className="pt-6 pb-2 flex flex-col gap-3 border-t border-slate-100">
            <button 
              onClick={() => { setLang(lang === 'en' ? 'ur' : 'en'); setIsOpen(false); }}
              className="w-full px-4 py-3 border border-slate-300 text-masjid-dark rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              {lang === 'en' ? 'Switch to اردو' : 'Switch to English'}
            </button>
            <Link 
              to="/donate" 
              onClick={() => setIsOpen(false)}
              className="w-full bg-masjid-gold text-white px-4 py-3 rounded-xl font-bold text-center hover:bg-masjid-gold/90 transition-colors shadow-sm"
            >
              {t.navDonate}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}