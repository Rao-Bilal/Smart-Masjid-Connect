import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function QuranHubPage() {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dailyayah')
      .then(res => res.json())
      .then(data => { if (data.success) setAyah(data.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-20 text-xl animate-pulse">Loading Content...</div>;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-slate-800">Quran & Islamic Hub</h1>
      </div>

      {ayah ? (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-800 font-bold rounded-full text-sm tracking-widest uppercase">Ayah of the Day</span>
          
          <h2 className="text-4xl md:text-5xl font-arabic text-slate-800 leading-loose" dir="rtl">
            {ayah.arabicText}
          </h2>
          
          <div className="space-y-4">
            <p className="text-lg text-slate-500 italic">"{ayah.transliteration}"</p>
            <p className="text-xl text-slate-700 font-medium">"{ayah.englishTranslation}"</p>
          </div>
          
          <div className="inline-block bg-slate-50 px-6 py-2 rounded-lg text-slate-600 font-semibold border border-slate-200">
            Surah {ayah.surahName} • Ayah {ayah.ayahNumber}
          </div>

          {ayah.tafsirSnippet && (
            <div className="mt-8 p-6 bg-slate-50 rounded-xl text-left border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Tafsir (Explanation):</h4>
              <p className="text-slate-600">{ayah.tafsirSnippet}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-slate-500">No Ayah available for today.</p>
      )}
    </div>
  );
}