import { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => { if (data.success) setEvents(data.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-20 text-xl animate-pulse">Loading Events...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-10 text-center">Islamic Event Calendar</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? <p className="col-span-full text-center text-slate-500">No upcoming events at this time.</p> : 
          events.map(ev => (
            <div key={ev._id} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex justify-between items-center">
                <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">{ev.category}</span>
                <Calendar className="text-amber-600 w-5 h-5" />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">{ev.title}</h2>
                  <h2 className="text-2xl font-bold text-slate-800 font-arabic" dir="rtl">{ev.urTitle}</h2>
                </div>
                <div className="text-sm text-slate-500 font-mono space-y-1">
                  <p>Gregorian: {new Date(ev.dateGregorian).toLocaleDateString('en-GB')}</p>
                  <p>Hijri: {ev.dateHijri}</p>
                </div>
                <p className="text-slate-600">{ev.description}</p>
                <p className="text-slate-600 text-right font-arabic" dir="rtl">{ev.urDescription}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm pt-4 border-t border-slate-100">
                  <MapPin className="w-4 h-4" /> {ev.location}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}