import { useState, useEffect } from 'react';

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', category: 'General', content: '', contactInfo: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then(res => res.json())
      .then(data => { if (data.success) setNotices(data.data); })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
      const data = await res.json();
      if (data.success) {
        alert("Your notice has been submitted and is waiting for admin approval!");
        setNewNotice({ title: '', category: 'General', content: '', contactInfo: '' });
      }
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="container mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Community Notice Board</h1>
        {notices.length === 0 ? <p className="text-slate-500">No notices currently posted.</p> :
          <div className="grid gap-6">
            {notices.map(notice => (
              <div key={notice._id} className="bg-white p-6 rounded-xl shadow border border-slate-100">
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full uppercase">{notice.category}</span>
                <h3 className="text-2xl font-bold mt-4">{notice.title}</h3>
                <p className="text-slate-600 mt-2">{notice.content}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500 font-mono">
                  Contact: {notice.contactInfo} • Posted: {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        }
      </div>

      {/* Submit Form Sidebar */}
      <div className="bg-white p-8 rounded-2xl shadow border border-slate-100 h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Post a Notice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="w-full p-3 border rounded-lg" required />
          <select value={newNotice.category} onChange={e => setNewNotice({...newNotice, category: e.target.value})} className="w-full p-3 border rounded-lg">
            <option>General</option><option>Lost & Found</option><option>For Sale</option><option>Job</option><option>Help Request</option>
          </select>
          <textarea placeholder="Message Details" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="w-full p-3 border rounded-lg h-32" required></textarea>
          <input type="text" placeholder="Contact Info (Phone/Email)" value={newNotice.contactInfo} onChange={e => setNewNotice({...newNotice, contactInfo: e.target.value})} className="w-full p-3 border rounded-lg" required />
          <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700">Submit for Approval</button>
        </form>
        <p className="text-xs text-slate-400 mt-4 text-center">Notices auto-expire after 30 days. All submissions are reviewed by the Intezamia.</p>
      </div>
    </div>
  );
}