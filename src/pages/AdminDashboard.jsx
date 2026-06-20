import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('lostfound');

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Imam Command Center</h1>
        <p className="text-slate-600">Manage Masjid operations and AI knowledge base.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8 border-b pb-4">
        <button 
          onClick={() => setActiveTab('lostfound')}
          className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'lostfound' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Lost & Found
        </button>
        <button 
          onClick={() => setActiveTab('fiqh')}
          className={`px-6 py-2 font-bold rounded-lg transition ${activeTab === 'fiqh' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Fiqh Knowledge Engine
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-200 shadow-inner">
        {activeTab === 'lostfound' && <FoundItemLogger />}
        {activeTab === 'fiqh' && <FiqhRuleInjector />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT 1: Log Found Items (Handles Images) ---
const FoundItemLogger = () => {
  const [formData, setFormData] = useState({ itemName: '', description: '', location: '', contactInfo: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('itemName', formData.itemName);
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('contactInfo', formData.contactInfo);
    if (image) submitData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/lostfound/report-found', {
        method: 'POST',
        body: submitData // NO headers needed for FormData!
      });

      if (res.ok) {
        setMessage('✅ Item successfully logged in the system.');
        setFormData({ itemName: '', description: '', location: '', contactInfo: '' });
        setImage(null);
        document.getElementById('imageInput').value = ""; 
      } else {
        setMessage('❌ Failed to add item.');
      }
    } catch (error) {
      setMessage('❌ Server error.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border-t-4 border-green-500">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Log a Found Item</h2>
      {message && <p className="mb-4 font-semibold text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Item Name (e.g., Casio Watch)" required value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} className="w-full px-4 py-2 border rounded-md" />
        <textarea placeholder="Description (Color, marks, etc.)" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-md" />
        <input type="text" placeholder="Location Found (e.g., Near shoe rack)" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border rounded-md" />
        <input type="text" placeholder="Where can they collect it? (e.g., Admin Office)" required value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} className="w-full px-4 py-2 border rounded-md" />
        
        <div className="border-2 border-dashed border-slate-300 p-4 rounded-md text-center bg-slate-50">
          <label className="block text-sm font-bold text-slate-600 mb-2">Upload Photo of Item</label>
          <input type="file" id="imageInput" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-bold transition">Log Item into System</button>
      </form>
    </div>
  );
};

// --- SUB-COMPONENT 2: Fiqh Knowledge Injector ---
const FiqhRuleInjector = () => {
  const [ruleData, setRuleData] = useState({ text: '', source: '', category: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/fiqh/add-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleData)
      });
      if (res.ok) {
        setMessage('✅ Rule added & embedded instantly!');
        setRuleData({ text: '', source: '', category: '' });
      } else {
        setMessage('❌ Failed to add rule.');
      }
    } catch (error) {
      setMessage('❌ Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border-t-4 border-indigo-600">
      <h2 className="text-2xl font-bold mb-2 text-slate-800">Add Fiqh Ruling</h2>
      <p className="text-sm text-slate-500 mb-6">This will instantly train the AI Assistant on this new fact.</p>
      {message && <p className="mb-4 font-semibold text-center">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700">Ruling (Roman Urdu)</label>
          <textarea required placeholder="e.g., Juma ki namaz ke baad 4 rakat sunnat muakkadah hain..." value={ruleData.text} onChange={e => setRuleData({...ruleData, text: e.target.value})} className="w-full px-4 py-2 mt-1 border rounded-md" rows="4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700">Source</label>
            <input type="text" required placeholder="e.g., Sahih Bukhari" value={ruleData.source} onChange={e => setRuleData({...ruleData, source: e.target.value})} className="w-full px-4 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700">Category</label>
            <input type="text" required placeholder="e.g., Namaz" value={ruleData.category} onChange={e => setRuleData({...ruleData, category: e.target.value})} className="w-full px-4 py-2 mt-1 border rounded-md" />
          </div>
        </div>
        <button type="submit" disabled={loading} className={`w-full text-white py-3 rounded-md font-bold transition ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
          {loading ? 'Embedding Fact...' : 'Inject into Knowledge Base'}
        </button>
      </form>
    </div>
  );
};