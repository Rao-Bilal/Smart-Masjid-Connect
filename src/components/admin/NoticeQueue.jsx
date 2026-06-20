import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function NoticeQueue() {
  const [pendingNotices, setPendingNotices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/notices/pending`).then(res => res.json())
      .then(data => { if (data.success) setPendingNotices(data.data); });
  }, []);

  const resolveNotice = async (id, status) => {
      try {
          const res = await fetch(`${API_BASE_URL}/notices/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
          if ((await res.json()).success) setPendingNotices(pendingNotices.filter(n => n._id !== id));
      } catch (err) { alert("Error updating status."); }
  };

  return (
    <div className={`${cardClass} space-y-6`}>
        <h2 className="text-2xl font-bold text-masjid-dark">Public Notice Board Queue ({pendingNotices.length})</h2>
        <p className="text-sm text-slate-500">Approve or reject notices submitted by community members.</p>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {pendingNotices.length === 0 ? <p className="text-slate-500 text-center py-5">No pending notices at the moment.</p> : 
                pendingNotices.map(notice => (
                    <div key={notice._id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-start shadow-sm">
                        <div>
                            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">{notice.category}</span>
                            <h4 className="text-lg font-bold mt-2">{notice.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{notice.content}</p>
                            <p className="text-xs text-slate-400 mt-2 font-mono">Contact: {notice.contactInfo}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => resolveNotice(notice._id, 'approved')} className="text-green-600 hover:bg-green-100 p-2 rounded-full transition" title="Approve">
                                <CheckCircle size={24}/>
                            </button>
                            <button onClick={() => resolveNotice(notice._id, 'rejected')} className="text-red-600 hover:bg-red-100 p-2 rounded-full transition" title="Reject">
                                <XCircle size={24}/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  );
}