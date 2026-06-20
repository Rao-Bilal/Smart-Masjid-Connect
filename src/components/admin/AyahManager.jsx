import React, { useState, useEffect } from 'react';
import { BookOpen, Save, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function AyahManager() {
  const [ayahs, setAyahs] = useState([]);
  const [newAyah, setNewAyah] = useState({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dailyayah/all`).then(res => res.json()).then(data => { if (data.success) setAyahs(data.data); });
  }, []);

  const handleInput = (e) => setNewAyah({ ...newAyah, [e.target.name]: e.target.value });
  const startEdit = (ayah) => { setEditId(ayah._id); setNewAyah({ ...ayah }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(editId ? `${API_BASE_URL}/dailyayah/${editId}` : `${API_BASE_URL}/dailyayah`, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAyah) });
      const data = await res.json();
      if (data.success) {
        if (editId) setAyahs(ayahs.map(a => a._id === editId ? data.data : a));
        else setAyahs([data.data, ...ayahs]);
        setEditId(null); setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' }); 
      }
    } catch (err) { alert("Error saving."); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete Ayah?")) return;
    try { if ((await (await fetch(`${API_BASE_URL}/dailyayah/${id}`, { method: 'DELETE' })).json()).success) setAyahs(ayahs.filter(a => a._id !== id)); } catch (err) {}
  };

  return (
    <div className={`${cardClass} space-y-6 flex flex-col`}>
        <div className="flex items-center gap-3"><BookOpen className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">{editId ? "Edit Ayah" : "Add Daily Ayah"}</h2></div>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4"><input type="text" name="surahName" value={newAyah.surahName} onChange={handleInput} className={inputClass} placeholder="Surah Name" required /><input type="number" name="ayahNumber" value={newAyah.ayahNumber} onChange={handleInput} className={inputClass} placeholder="Ayah Number" required /></div>
            <textarea name="arabicText" value={newAyah.arabicText} onChange={handleInput} className={`${inputClass} h-16 text-right font-arabic`} placeholder="Arabic Text" dir="rtl" required></textarea>
            <textarea name="transliteration" value={newAyah.transliteration} onChange={handleInput} className={`${inputClass} h-12`} placeholder="Transliteration" required></textarea>
            <textarea name="englishTranslation" value={newAyah.englishTranslation} onChange={handleInput} className={`${inputClass} h-12`} placeholder="English Translation" required></textarea>
            <div className="flex gap-2">
                <button type="submit" className={btnPrimary}><Save size={20}/> {editId ? "Update Ayah" : "Save Ayah"}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' }); }} className="bg-slate-200 text-slate-700 px-6 py-3 mt-4 rounded-lg font-bold w-full">Cancel</button>}
            </div>
        </form>

        <h2 className="text-xl font-bold text-masjid-dark mb-2">Manage Ayahs</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[200px]">
            {ayahs.map(a => (
                <div key={a._id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                    <div><h4 className="font-bold text-sm">{a.surahName} ({a.ayahNumber})</h4></div>
                    <div className="flex gap-1"><button onClick={() => startEdit(a)} className="text-blue-500 p-1"><Edit size={16}/></button><button onClick={() => handleDelete(a._id)} className="text-red-500 p-1"><Trash2 size={16}/></button></div>
                </div>
            ))}
        </div>
    </div>
  );
}