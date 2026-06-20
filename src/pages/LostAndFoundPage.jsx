import React, { useState, useEffect } from 'react';

// --- SUB-COMPONENT: The Report Form ---
const ReportLostForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ itemName: '', description: '', location: '', contactInfo: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/lostfound/report-lost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('Aapki report jama ho gayi hai. Allah asani farmaye.');
        setFormData({ itemName: '', description: '', location: '', contactInfo: '' });
        setTimeout(onSuccess, 3000); // Close form after 3 seconds
      } else {
        setMessage('Masla aa raha hai, dobara koshish karein.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200 mb-10">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Report an Item You Lost</h2>
      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 font-medium">Item Name</label>
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 font-medium">Your Contact Number</label>
          <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 font-medium">Where did you lose it?</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md" placeholder="e.g., Main Hall, Wudu Area" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md" placeholder="Color, brand, identifying marks..." />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-bold transition">Submit Report</button>
        </div>
      </form>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LostAndFoundPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lostfound');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch lost items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (id) => {
    const phone = prompt("Please enter your phone number to verify your claim:");
    if (!phone) return;

    try {
      const res = await fetch(`http://localhost:5000/api/lostfound/${id}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      alert(data.message);
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error("Failed to submit claim:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="mb-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Lost & Found Registry</h1>
        <p className="text-slate-600 mb-6">Browse items found on the Masjid premises, or report something you lost.</p>
        
        <button 
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-slate-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition shadow-md"
        >
          {showReportForm ? "Cancel Report" : "+ Report a Lost Item"}
        </button>
      </div>

      {showReportForm && <ReportLostForm onSuccess={() => setShowReportForm(false)} />}

      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Items Found by Administration</h2>

      {loading ? (
        <div className="text-center text-slate-500 py-10">Loading items...</div>
      ) : items.length === 0 ? (
        <div className="bg-slate-50 p-10 text-center rounded-xl border border-slate-200 text-slate-500">
          No found items currently reported.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item._id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              
              {/* Render image if it exists */}
              {item.imageUrl ? (
                <div className="h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img 
                    src={`http://localhost:5000${item.imageUrl}`} 
                    alt={item.itemName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 w-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm border-b border-slate-200">
                  No Image Available
                </div>
              )}

              <div className="p-6 flex-grow">
                <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                  {item.status}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.itemName}</h3>
                <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                <div className="text-sm text-slate-500 space-y-1 border-t border-slate-100 pt-4 mt-auto">
                  <p><strong>Found At:</strong> {item.location}</p>
                  <p><strong>Date:</strong> {new Date(item.dateReported).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => handleClaim(item._id)}
                  disabled={item.status !== 'Unclaimed'}
                  className={`w-full py-2 rounded-lg font-bold transition-colors ${
                    item.status === 'Unclaimed' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {item.status === 'Unclaimed' ? 'Claim This Item' : 'Claim Pending'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}