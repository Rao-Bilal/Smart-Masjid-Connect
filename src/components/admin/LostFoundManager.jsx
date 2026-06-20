import React, { useState, useEffect } from 'react';
import { Search, ClipboardList, Save, CheckCircle, XCircle, BellRing } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function LostFoundManager() {
  const [lostRequests, setLostRequests] = useState([]);
  const [claimRequests, setClaimRequests] = useState([]); // <-- NEW STATE FOR CLAIMS
  
  const [formData, setFormData] = useState({ itemName: '', description: '', location: '', contactInfo: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const fetchItems = () => {
    fetch(`${API_BASE_URL}/lostfound/admin`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data) ? data : data.data || [];
        
        // 1. Items reported lost by Namazis
        setLostRequests(items.filter(item => item.type === 'LOST' && item.status !== 'Resolved'));
        
        // 2. Found items that someone is trying to claim
        setClaimRequests(items.filter(item => item.type === 'FOUND' && item.status === 'Claim Pending'));
      }).catch(err => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogFoundItem = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('itemName', formData.itemName);
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('contactInfo', formData.contactInfo);
    if (image) submitData.append('image', image);

    try {
      const res = await fetch(`${API_BASE_URL}/lostfound/report-found`, { method: 'POST', body: submitData });
      if (res.ok) {
        setMessage('✅ Found item logged.');
        setFormData({ itemName: '', description: '', location: '', contactInfo: '' }); 
        setImage(null); document.getElementById('imageInput').value = ""; 
        fetchItems(); // Refresh lists
      } else setMessage('❌ Failed to add item.');
    } catch (error) { setMessage('❌ Server error.'); }
  };

  // Mark a lost item request as found/resolved
  const markAsFound = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/lostfound/${id}/status`, { 
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Resolved' }) 
      });
      if (res.ok) fetchItems();
    } catch (err) { alert("Error updating status."); }
  };

  // Approve or Reject someone's claim on a found item
  const handleClaimResolution = async (id, action) => {
    try {
      const res = await fetch(`${API_BASE_URL}/lostfound/${id}/resolve-claim`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action })
      });
      if (res.ok) fetchItems();
    } catch (err) { alert("Error resolving claim."); }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      
      {/* COLUMN 1: Log Found Item Form */}
      <div className={`${cardClass} space-y-6`}>
        <div className="flex items-center gap-3"><Search className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Log Found Item</h2></div>
        {message && <p className="mb-2 text-sm font-semibold text-green-600">{message}</p>}
        <form onSubmit={handleLogFoundItem} className="space-y-4">
          <input type="text" placeholder="Item Name" required value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} className={inputClass} />
          <textarea placeholder="Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={`${inputClass} h-20 resize-none`} />
          <input type="text" placeholder="Location Found" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClass} />
          <input type="text" placeholder="Collection Point" required value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} className={inputClass} />
          <div className="pt-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Upload Image</label>
              <input type="file" id="imageInput" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-bold file:bg-masjid-gold/10 file:text-masjid-dark hover:file:bg-masjid-gold/20 cursor-pointer" />
          </div>
          <button type="submit" className={btnPrimary}><Save size={20}/> Log Item</button>
        </form>
      </div>

      {/* COLUMN 2 & 3: Queues */}
      <div className="xl:col-span-2 grid grid-rows-2 gap-6 h-full">
        
        {/* ROW 1: Pending Claims (Found Items) */}
        <div className={`${cardClass} flex-1 overflow-hidden flex flex-col border-t-4 border-blue-500`}>
          <div className="flex items-center gap-3 mb-4"><BellRing className="w-7 h-7 text-blue-500" /><h2 className="text-xl font-bold text-masjid-dark">Pending Claims ({claimRequests.length})</h2></div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {claimRequests.length === 0 ? <p className="text-sm text-slate-400">No pending claims.</p> : claimRequests.map(req => (
                  <div key={req._id} className="p-4 border border-blue-200 rounded-xl bg-blue-50 flex justify-between items-center shadow-sm">
                      <div>
                          <span className="text-xs bg-blue-200 text-blue-800 font-bold px-2 py-1 rounded uppercase">Verification Needed</span>
                          <h4 className="text-lg font-bold mt-2">{req.itemName}</h4>
                          <p className="text-sm text-slate-600 mt-1">Claimant Phone: <strong className="text-slate-800">{req.claimantContact}</strong></p>
                      </div>
                      <div className="flex gap-2">
                          <button onClick={() => handleClaimResolution(req._id, 'approve')} className="text-green-600 bg-green-100 p-2 rounded-lg hover:bg-green-200" title="Approve & Mark Returned"><CheckCircle size={24}/></button>
                          <button onClick={() => handleClaimResolution(req._id, 'reject')} className="text-red-600 bg-red-100 p-2 rounded-lg hover:bg-red-200" title="Reject & Mark Unclaimed"><XCircle size={24}/></button>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        {/* ROW 2: Lost Item Requests */}
        <div className={`${cardClass} flex-1 overflow-hidden flex flex-col border-t-4 border-orange-500`}>
          <div className="flex items-center gap-3 mb-4"><ClipboardList className="w-7 h-7 text-orange-500" /><h2 className="text-xl font-bold text-masjid-dark">Lost Item Reports ({lostRequests.length})</h2></div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {lostRequests.length === 0 ? <p className="text-sm text-slate-400">No active lost item reports.</p> : lostRequests.map(req => (
                  <div key={req._id} className="p-4 border border-orange-200 rounded-xl bg-orange-50 flex justify-between items-center shadow-sm">
                      <div>
                          <h4 className="text-lg font-bold">{req.itemName}</h4>
                          <p className="text-sm text-slate-600 mt-1">{req.description}</p>
                          <p className="text-xs text-slate-500 mt-1">📍 {req.location} | 📞 {req.contactInfo}</p>
                      </div>
                      <button onClick={() => markAsFound(req._id)} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition">Mark Resolved</button>
                  </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}