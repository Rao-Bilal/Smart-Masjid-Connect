import React, { useState } from 'react';

const RamadanPortal = () => {
  const [activeTab, setActiveTab] = useState('itikaf');

  // Basic Form States
  const [itikafForm, setItikafForm] = useState({ name: '', phone: '', age: '', cnic: '' });
  const [iftarForm, setIftarForm] = useState({ sponsorName: '', phone: '', sponsoredDate: '', contributionType: 'Full Meal' });

  const handleItikafSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/ramadan/itikaf/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itikafForm)
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIftarSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/ramadan/iftar/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(iftarForm)
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Ramadan Portal</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`flex-1 py-3 text-lg font-semibold ${activeTab === 'itikaf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('itikaf')}
        >
          Itikaf Application
        </button>
        <button 
          className={`flex-1 py-3 text-lg font-semibold ${activeTab === 'iftar' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('iftar')}
        >
          Iftar Sponsorship
        </button>
      </div>

      {/* Itikaf Form */}
      {activeTab === 'itikaf' && (
        <form onSubmit={handleItikafSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" placeholder="Full Name" onChange={e => setItikafForm({...itikafForm, name: e.target.value})} required />
          <input className="w-full p-3 border rounded" placeholder="Phone Number" onChange={e => setItikafForm({...itikafForm, phone: e.target.value})} required />
          <input className="w-full p-3 border rounded" placeholder="CNIC (e.g. 12345-1234567-1)" onChange={e => setItikafForm({...itikafForm, cnic: e.target.value})} required />
          <input className="w-full p-3 border rounded" type="number" placeholder="Age" onChange={e => setItikafForm({...itikafForm, age: e.target.value})} required />
          <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">Apply for Itikaf</button>
        </form>
      )}

      {/* Iftar Form */}
      {activeTab === 'iftar' && (
        <form onSubmit={handleIftarSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" placeholder="Sponsor Name / Family Name" onChange={e => setIftarForm({...iftarForm, sponsorName: e.target.value})} required />
          <input className="w-full p-3 border rounded" placeholder="Phone Number" onChange={e => setIftarForm({...iftarForm, phone: e.target.value})} required />
          <input className="w-full p-3 border rounded" type="date" onChange={e => setIftarForm({...iftarForm, sponsoredDate: e.target.value})} required />
          <select className="w-full p-3 border rounded" onChange={e => setIftarForm({...iftarForm, contributionType: e.target.value})}>
            <option>Full Meal</option>
            <option>Dates & Water</option>
            <option>Financial Contribution</option>
          </select>
          <button className="w-full bg-orange-500 text-white p-3 rounded font-bold hover:bg-orange-600">Sponsor Iftar</button>
        </form>
      )}
    </div>
  );
};

export default RamadanPortal;