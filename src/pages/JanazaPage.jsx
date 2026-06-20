import React, { useState, useEffect } from 'react';

export default function JanazaPage() {
  const [janazas, setJanazas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVolunteerId, setActiveVolunteerId] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', task: 'Grave Digging' });

  useEffect(() => {
    fetchJanazas();
  }, []);

  const fetchJanazas = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/janaza');
      if (res.ok) {
        const data = await res.json();
        setJanazas(data);
      }
    } catch (error) {
      console.error("Failed to fetch Janaza announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVolunteerSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/janaza/${id}/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert(data.message);
      setActiveVolunteerId(null);
      setForm({ name: '', phone: '', task: 'Grave Digging' });
      fetchJanazas();
    } catch (error) {
      console.error("Failed to volunteer:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-10 border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Janaza Announcements</h1>
        <p className="text-slate-600 text-lg">Inna lillahi wa inna ilayhi raji'un. Coordinate and volunteer for community funeral arrangements.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-500">Loading records...</div>
      ) : janazas.length === 0 ? (
        <div className="bg-slate-50 p-8 text-center rounded-xl border border-slate-200 text-slate-500">
          No active Janaza announcements at this time.
        </div>
      ) : (
        <div className="space-y-6">
          {janazas.map(janaza => (
            <div key={janaza._id} className="bg-white border-l-4 border-slate-800 shadow-md rounded-r-xl p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{janaza.deceasedName}</h2>
                  <div className="mt-4 space-y-2 text-slate-600">
                    <p><strong>Namaz-e-Janaza:</strong> {janaza.namazTime}</p>
                    <p><strong>Graveyard:</strong> {janaza.graveyardLocation}</p>
                    {janaza.googleMapsLink && (
                      <a href={janaza.googleMapsLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-semibold">
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                   <button 
                    onClick={() => setActiveVolunteerId(activeVolunteerId === janaza._id ? null : janaza._id)}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors text-center"
                   >
                     {activeVolunteerId === janaza._id ? 'Cancel' : 'Volunteer to Help'}
                   </button>
                   <div className="text-sm text-slate-500 text-right mt-2">
                     {janaza.volunteers.length} volunteers so far
                   </div>
                </div>
              </div>

              {/* Volunteer Form Dropdown */}
              {activeVolunteerId === janaza._id && (
                <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-br-xl">
                  <h4 className="font-bold text-slate-800 mb-4">Sign up to assist the family</h4>
                  <form onSubmit={(e) => handleVolunteerSubmit(e, janaza._id)} className="flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder="Your Name" required className="flex-1 p-2 border rounded focus:ring-2 focus:ring-slate-800 outline-none" onChange={e => setForm({...form, name: e.target.value})} />
                    <input type="text" placeholder="Phone Number" required className="flex-1 p-2 border rounded focus:ring-2 focus:ring-slate-800 outline-none" onChange={e => setForm({...form, phone: e.target.value})} />
                    <select className="flex-1 p-2 border rounded focus:ring-2 focus:ring-slate-800 outline-none bg-white" onChange={e => setForm({...form, task: e.target.value})}>
                      <option>Grave Digging</option>
                      <option>Transport/Ambulance</option>
                      <option>Food/Condolences</option>
                    </select>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}