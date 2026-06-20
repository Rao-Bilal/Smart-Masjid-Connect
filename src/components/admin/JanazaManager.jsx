import React, { useState, useEffect } from 'react';
import { Users, Trash2, Save, MapPin, Clock, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function JanazaManager() {
  const [janazas, setJanazas] = useState([]);
  const [formData, setFormData] = useState({ 
    deceasedName: '', 
    namazTime: '', 
    graveyardLocation: '', 
    googleMapsLink: '' 
  });

  const fetchJanazas = () => {
    fetch(`${API_BASE_URL}/janaza`).then(res => res.json())
      .then(data => setJanazas(Array.isArray(data) ? data : data.data || []));
  };

  useEffect(() => { fetchJanazas(); }, []);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/janaza`, { 
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) 
      });
      if (res.ok) {
        setFormData({ deceasedName: '', namazTime: '', graveyardLocation: '', googleMapsLink: '' });
        fetchJanazas();
      }
    } catch (err) { alert("Error saving Janaza."); }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/janaza/${id}/status`, { 
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) 
    });
    fetchJanazas();
  };

  const deleteJanaza = async (id) => {
    if(!window.confirm("Delete this Janaza record permanently?")) return;
    await fetch(`${API_BASE_URL}/janaza/${id}`, { method: 'DELETE' });
    fetchJanazas();
  };

  return (
    <div className={`${cardClass} flex flex-col h-full border-t-4 border-slate-800`}>
        <div className="flex items-center gap-3 mb-6">
            <Users className="w-9 h-9 text-slate-800" />
            <h2 className="text-2xl font-bold text-masjid-dark">Janaza Alerts & Volunteers</h2>
        </div>
        
        {/* Create Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-2">New Announcement</h3>
            <input type="text" name="deceasedName" value={formData.deceasedName} onChange={handleInput} className={inputClass} placeholder="Deceased Person's Name" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="namazTime" value={formData.namazTime} onChange={handleInput} className={inputClass} placeholder="Janaza Time (e.g. After Asr)" required />
                <input type="text" name="graveyardLocation" value={formData.graveyardLocation} onChange={handleInput} className={inputClass} placeholder="Graveyard Name" required />
            </div>
            <input type="text" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleInput} className={inputClass} placeholder="Google Maps Link (Optional)" />
            <button type="submit" className={btnPrimary}><Save size={20}/> Broadcast Janaza Alert</button>
        </form>

        {/* Active List */}
        <h3 className="font-bold text-masjid-dark mb-4 flex items-center gap-2">
            Active Records <span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded-full">{janazas.length}</span>
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
            {janazas.length === 0 ? <p className="text-slate-500 text-center py-10">No active Janaza alerts.</p> : janazas.map(j => (
                <div key={j._id} className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="font-bold text-lg text-slate-800">{j.deceasedName}</h4>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Clock size={14}/> {j.namazTime}</span>
                                <span className="flex items-center gap-1"><MapPin size={14}/> {j.graveyardLocation}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => updateStatus(j._id, 'Completed')} className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Mark Completed"><CheckCircle size={20}/></button>
                            <button onClick={() => deleteJanaza(j._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Delete"><Trash2 size={20}/></button>
                        </div>
                    </div>

                    {/* Volunteer Preview */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Volunteers</span>
                        <div className="flex -space-x-2">
                            {j.volunteers.length > 0 ? (
                                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">
                                    {j.volunteers.length} People Registered
                                </span>
                            ) : <span className="text-xs text-slate-400 italic">No volunteers yet</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}