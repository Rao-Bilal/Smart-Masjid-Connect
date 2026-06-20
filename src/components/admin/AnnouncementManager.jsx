import React, { useState, useEffect } from 'react';
import { Megaphone, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnounce, setNewAnnounce] = useState({ title: '', content: '', priority: 'medium' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/announcements`).then(res => res.json())
      .then(data => { if (data.success) setAnnouncements(data.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))); });
  }, []);

  const handleInput = (e) => setNewAnnounce({ ...newAnnounce, [e.target.name]: e.target.value });

  const startEdit = (ann) => { setEditId(ann._id); setNewAnnounce({ title: ann.title, content: ann.content, priority: ann.priority }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId ? `${API_BASE_URL}/announcements/${editId}` : `${API_BASE_URL}/announcements`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newAnnounce, author: "Admin" }) });
      const data = await res.json();
      if (data.success) {
        if (editId) setAnnouncements(announcements.map(a => a._id === editId ? data.data : a));
        else setAnnouncements([data.data, ...announcements]); 
        setEditId(null); setNewAnnounce({ title: '', content: '', priority: 'medium' }); alert("Saved!");
      }
    } catch (err) { alert("Error: " + err.message); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this announcement?")) return;
    try { if ((await (await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' })).json()).success) setAnnouncements(announcements.filter(a => a._id !== id)); } 
    catch (err) { alert("Error deleting."); }
  };

  return (
    <div className="grid grid-rows-2 gap-6 h-full">
      {/* Form Area */}
      <div className={`${cardClass} space-y-6 flex-1`}>
          <div className="flex items-center gap-3"><Megaphone className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">{editId ? "Edit Announcement" : "New Announcement"}</h2></div>
          <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={newAnnounce.title} onChange={handleInput} className={inputClass} placeholder="Title" required />
              <textarea name="content" value={newAnnounce.content} onChange={handleInput} className={`${inputClass} h-20 resize-none`} placeholder="Content" required></textarea>
              <select name="priority" value={newAnnounce.priority} onChange={handleInput} className={inputClass}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
              <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>{editId ? "Update" : "Post"}</button>
                  {editId && <button type="button" onClick={() => { setEditId(null); setNewAnnounce({ title: '', content: '', priority: 'medium' }); }} className="bg-slate-200 text-slate-700 px-6 py-3 mt-4 rounded-lg font-bold hover:bg-slate-300 w-full">Cancel</button>}
              </div>
          </form>
      </div>
      
      {/* List Area */}
      <div className={`${cardClass} flex-1 overflow-hidden flex flex-col`}>
          <h2 className="text-xl font-bold text-masjid-dark mb-4">Manage Announcements</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {announcements.map(ann => (
                  <div key={ann._id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                      <div><h4 className="font-bold text-sm">{ann.title}</h4></div>
                      <div className="flex gap-1"><button onClick={() => startEdit(ann)} className="text-blue-500 p-1 hover:bg-blue-100 rounded"><Edit size={16}/></button><button onClick={() => handleDelete(ann._id)} className="text-red-500 p-1 hover:bg-red-100 rounded"><Trash2 size={16}/></button></div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}