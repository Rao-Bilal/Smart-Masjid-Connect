// src/components/admin/RamadanManager.jsx
import React, { useState, useEffect } from 'react';
import { Moon, Utensils, CheckCircle, XCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function RamadanManager() {
  const [itikafApps, setItikafApps] = useState([]);
  const [iftarSponsors, setIftarSponsors] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ramadan/itikaf/pending`).then(res => res.json())
      .then(data => setItikafApps(Array.isArray(data) ? data : data.data || []));
      
    fetch(`${API_BASE_URL}/ramadan/iftar/pending`).then(res => res.json())
      .then(data => setIftarSponsors(Array.isArray(data) ? data : data.data || []));
  }, []);

  const updateStatus = async (endpoint, id, status, setter, list) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}/status`, { 
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) 
      });
      if (res.ok) setter(list.filter(item => item._id !== id));
    } catch (err) { alert("Error: " + err.message); }
  };

  return (
    <div className="grid grid-rows-2 gap-6">
        {/* Itikaf Section */}
        <div className={`${cardClass} flex-1 overflow-hidden flex flex-col border-t-4 border-indigo-500`}>
            <div className="flex items-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-indigo-500"/>
                <h2 className="text-xl font-bold text-slate-800">Itikaf Applications ({itikafApps.length})</h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {itikafApps.length === 0 ? <p className="text-sm text-slate-400">No pending applications.</p> : itikafApps.map(app => (
                    <div key={app._id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                        <div><h4 className="font-bold text-sm">{app.name}</h4><p className="text-xs text-slate-500">{app.contactInfo} | {app.days} Days</p></div>
                        <div className="flex gap-2">
                            <button onClick={() => updateStatus('ramadan/itikaf', app._id, 'Approved', setItikafApps, itikafApps)} className="text-green-600 bg-green-100 p-1.5 rounded hover:bg-green-200"><CheckCircle size={18}/></button>
                            <button onClick={() => updateStatus('ramadan/itikaf', app._id, 'Rejected', setItikafApps, itikafApps)} className="text-red-600 bg-red-100 p-1.5 rounded hover:bg-red-200"><XCircle size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Iftar Section */}
        <div className={`${cardClass} flex-1 overflow-hidden flex flex-col border-t-4 border-emerald-500`}>
            <div className="flex items-center gap-3 mb-4">
                <Utensils className="w-6 h-6 text-emerald-500"/>
                <h2 className="text-xl font-bold text-slate-800">Iftar Sponsorships ({iftarSponsors.length})</h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {iftarSponsors.length === 0 ? <p className="text-sm text-slate-400">No pending sponsorships.</p> : iftarSponsors.map(sponsor => (
                    <div key={sponsor._id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg bg-slate-50">
                        <div><h4 className="font-bold text-sm">{sponsor.sponsorName}</h4><p className="text-xs text-slate-500">{new Date(sponsor.date).toLocaleDateString()} | Rs. {sponsor.amount}</p></div>
                        <div className="flex gap-2">
                            <button onClick={() => updateStatus('ramadan/iftar', sponsor._id, 'Approved', setIftarSponsors, iftarSponsors)} className="text-green-600 bg-green-100 p-1.5 rounded hover:bg-green-200"><CheckCircle size={18}/></button>
                            <button onClick={() => updateStatus('ramadan/iftar', sponsor._id, 'Rejected', setIftarSponsors, iftarSponsors)} className="text-red-600 bg-red-100 p-1.5 rounded hover:bg-red-200"><XCircle size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}