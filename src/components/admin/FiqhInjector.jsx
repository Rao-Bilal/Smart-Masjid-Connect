import React, { useState } from 'react';
import { Database } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function FiqhInjector() {
  const [ruleData, setRuleData] = useState({ text: '', source: '', category: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/fiqh/add-rule`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ruleData) });
      if (res.ok) { setMessage('✅ Rule embedded into AI!'); setRuleData({ text: '', source: '', category: '' }); } 
      else setMessage('❌ Failed to add rule.');
    } catch (error) { setMessage('❌ Server error.'); } 
    finally { setLoading(false); }
  };

  return (
    <div className={`${cardClass} space-y-6 h-full`}>
      <div className="flex items-center gap-3"><Database className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Add Fiqh Ruling</h2></div>
      {message && <p className="mb-2 text-sm font-semibold text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea required placeholder="Ruling in Roman Urdu..." value={ruleData.text} onChange={e => setRuleData({...ruleData, text: e.target.value})} className={`${inputClass} h-32 resize-none`} />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" required placeholder="Source" value={ruleData.source} onChange={e => setRuleData({...ruleData, source: e.target.value})} className={inputClass} />
          <input type="text" required placeholder="Category" value={ruleData.category} onChange={e => setRuleData({...ruleData, category: e.target.value})} className={inputClass} />
        </div>
        <button type="submit" disabled={loading} className={`${btnPrimary} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
           <Database size={20}/> {loading ? 'Embedding Fact...' : 'Inject Rule'}
        </button>
      </form>
    </div>
  );
}