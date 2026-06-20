import React, { useState, useEffect } from 'react';
import { CalendarDays, PlusCircle, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`).then(res => res.json()).then(data => { if (data.success) setEvents(data.data); });
  }, []);

  const handleInput = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  const startEdit = (ev) => { setEditId(ev._id); setNewEvent({ ...ev, dateGregorian: ev.dateGregorian.split('T')[0] }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editId ? `${API_BASE_URL}/events/${editId}` : `${API_BASE_URL}/events`, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
      const data = await res.json();
      if (data.success) { 
        if (editId) setEvents(events.map(ev => ev._id === editId ? data.data : ev));
        else setEvents([...events, data.data]);
        setEditId(null); setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' }); 
      }
    } catch (err) { alert("Error saving."); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete event?")) return;
    try { if ((await (await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' })).json()).success) setEvents(events.filter(ev => ev._id !== id)); } catch (err) {}
  };

  return (
    <div className={`${cardClass} space-y-6 flex flex-col`}>
        <div className="flex items-center gap-3"><CalendarDays className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">{editId ? "Edit Event" : "Add Calendar Event"}</h2></div>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4"><input type="text" name="title" value={newEvent.title} onChange={handleInput} className={inputClass} placeholder="English Title" required /><input type="text" name="urTitle" value={newEvent.urTitle} onChange={handleInput} className={`${inputClass} text-right`} placeholder="Urdu Title" dir="rtl" required /></div>
            <div className="grid grid-cols-2 gap-4"><input type="date" name="dateGregorian" value={newEvent.dateGregorian} onChange={handleInput} className={inputClass} required /><input type="text" name="dateHijri" value={newEvent.dateHijri} onChange={handleInput} className={inputClass} placeholder="Hijri Date" required /></div>
            <div className="grid grid-cols-2 gap-4"><select name="category" value={newEvent.category} onChange={handleInput} className={inputClass}><option>Islamic Holidays</option><option>Masjid Events</option><option>Educational</option><option>Community</option></select><input type="text" name="location" value={newEvent.location} onChange={handleInput} className={inputClass} placeholder="Location" required /></div>
            <textarea name="description" value={newEvent.description} onChange={handleInput} className={`${inputClass} h-16`} placeholder="English Description" required></textarea>
            <textarea name="urDescription" value={newEvent.urDescription} onChange={handleInput} className={`${inputClass} h-16 text-right`} placeholder="Urdu Description" dir="rtl" required></textarea>
            <div className="flex gap-2">
                <button type="submit" className={btnPrimary}><PlusCircle size={20}/> {editId ? "Update" : "Add Event"}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' }); }} className="bg-slate-200 text-slate-700 px-6 py-3 mt-4 rounded-lg font-bold w-full">Cancel</button>}
            </div>
        </form>

        <h2 className="text-xl font-bold text-masjid-dark mb-2">Manage Events</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[200px]">
            {events.map(ev => (
                <div key={ev._id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                    <div><h4 className="font-bold text-sm">{ev.title}</h4></div>
                    <div className="flex gap-1"><button onClick={() => startEdit(ev)} className="text-blue-500 p-1"><Edit size={16}/></button><button onClick={() => handleDelete(ev._id)} className="text-red-500 p-1"><Trash2 size={16}/></button></div>
                </div>
            ))}
        </div>
    </div>
  );
}