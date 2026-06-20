// // // src/pages/AdminPanel.jsx
// // import { useState, useEffect } from 'react';
// // import { Trash2, PlusCircle, Save, CalendarDays, Megaphone } from 'lucide-react'; // Requires: npm install lucide-react

// // const API_BASE_URL = 'http://localhost:5000/api'; // Adjust port if needed

// // // --- NATIVE DATE HELPERS FOR BACKEND STORAGE (Behind the scenes) ---
// // const getTodayDateEn = () => {
// //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //   return new Date().toLocaleDateString('en-GB', options);
// // };
// // const getTodayDateUr = () => {
// //     return new Date().toLocaleDateString('ur-PK', { day: 'numeric', month: 'long' });
// // };


// // export default function AdminPanel() {
// //   // === 1. STATE MANAGEMENT ===
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Form State (New Announcement)
// //   const [newAnnounce, setNewAnnounce] = useState({ title: '', content: '', priority: 'medium' });

// //   // Form State (Update Prayers)
// //   // (UPDATED): Date fields REMOVED from state. We generate them on submit.
// //   const [prayerForm, setPrayerForm] = useState({
// //     nextPrayerTime: '',
// //     fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '', jumah: ''
// //   });


// //   // === 2. INITIAL DATA FETCHING ===
// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       // Fetch Announcements
// //       const annRes = await fetch(`${API_BASE_URL}/announcements`);
// //       if (!annRes.ok) throw new Error('Failed to fetch announcements.');
// //       const annData = await annRes.json();
// //       if (annData.success) {
// //         setAnnouncements(annData.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
// //       }

// //       // Fetch Current Prayers
// //       const prayRes = await fetch(`${API_BASE_URL}/prayertimes/current`);
// //       if (!prayRes.ok && prayRes.status !== 404) throw new Error('Failed to fetch prayer times.');
          
// //       if (prayRes.ok) {
// //           const prayData = await prayRes.json();
// //           if (prayData.success && prayData.data) {
// //             // (UPDATED): Only populating times from DB. Dates are ignored here.
// //             setPrayerForm({
// //               nextPrayerTime: prayData.data.nextPrayerTime,
// //               fajr: prayData.data.times.find(t => t.name === 'Fajr')?.time || '',
// //               dhuhr: prayData.data.times.find(t => t.name === 'Dhuhr')?.time || '',
// //               asr: prayData.data.times.find(t => t.name === 'Asr')?.time || '',
// //               maghrib: prayData.data.times.find(t => t.name === 'Maghrib')?.time || '',
// //               isha: prayData.data.times.find(t => t.name === 'Isha')?.time || '',
// //               jumah: prayData.data.times.find(t => t.name === 'Jumah')?.time || '',
// //             });
// //           }
// //       }

// //     } catch (err) {
// //       console.error("Initialization Error:", err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   // === 3. HANDLERS: ANNOUNCEMENTS (Unchanged) ===
// //   const handleAnnounceInput = (e) => {
// //     setNewAnnounce({ ...newAnnounce, [e.target.name]: e.target.value });
// //   };

// //   const submitAnnouncement = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/announcements`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ ...newAnnounce, author: "Admin" }) 
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setAnnouncements([data.data, ...announcements]); 
// //         setNewAnnounce({ title: '', content: '', priority: 'medium' }); 
// //         alert("Announcement Added Successfully!");
// //       } else { alert("Error: " + data.message); }
// //     } catch (err) { alert("Fetch Error: " + err.message); }
// //   };

// //   const deleteAnnouncement = async (id) => {
// //     if(!window.confirm("Are you sure you want to delete this announcement?")) return;
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
// //       const data = await res.json();
// //       if (data.success) {
// //         setAnnouncements(announcements.filter(ann => ann._id !== id)); 
// //         alert("Announcement Deleted Successfully.");
// //       } else { alert("Error: " + data.message); }
// //     } catch (err) { alert("Fetch Error: " + err.message); }
// //   };


// //   // === 4. HANDLERS: PRAYER TIMES (Updated to handle dateEn/dateUr automatically) ===
// //   const handlePrayerInput = (e) => {
// //     setPrayerForm({ ...prayerForm, [e.target.name]: e.target.value });
// //   };

// //   const submitPrayerUpdate = async (e) => {
// //     e.preventDefault();
// //     // (UPDATED): Dates are generated automatically right here before sending to DB.
// //     // This keeps your database schema happy without the admin having to type it.
// //     const payload = {
// //       dateEn: getTodayDateEn(), // Automatically generated
// //       dateUr: getTodayDateUr(), // Automatically generated
// //       nextPrayerTime: prayerForm.nextPrayerTime,
// //       times: [
// //         { name: 'Fajr', time: prayerForm.fajr, urName: 'فجر' },
// //         { name: 'Dhuhr', time: prayerForm.dhuhr, urName: 'ظہر' },
// //         { name: 'Asr', time: prayerForm.asr, urName: 'عصر' },
// //         { name: 'Maghrib', time: prayerForm.maghrib, urName: 'مغرب' },
// //         { name: 'Isha', time: prayerForm.isha, urName: 'عشاء' },
// //         { name: 'Jumah', time: prayerForm.jumah, urName: 'جمعہ' },
// //       ]
// //     };

// //     try {
// //       const res = await fetch(`${API_BASE_URL}/prayertimes`, {
// //         method: 'POST', 
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         alert("Prayer Times Updated in Database! Today's Date added automatically.");
// //       } else { alert("Error: " + data.message); }
// //     } catch (err) { alert("Fetch Error: " + err.message); }
// //   };


// //   // === 5. UI LAYOUT & STYLING ===
// //   if (loading) return <div className="p-10 text-center animate-pulse text-xl text-slate-500">Loading Admin Panel...</div>;
// //   if (error) return <div className="p-10 text-center text-xl text-red-500">Error loading Admin Panel: {error}</div>;

// //   const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold focus:border-masjid-gold outline-none transition";
// //   const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
// //   const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";
// //   const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition duration-150 active:scale-95";

// //   return (
// //     <div className="container mx-auto px-6 py-12 space-y-12 bg-slate-50 min-h-screen">
// //       <h1 className="text-4xl font-extrabold text-masjid-dark mb-10 pb-4 border-b-4 border-masjid-gold inline-block">Masjid Admin Panel (Database Lab Demo)</h1>

// //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
// //         {/* === SECTION 1: UPDATE PRAYER TIMES FORM === */}
// //         <div className={`xl:col-span-2 ${cardClass} space-y-8`}>
// //             <div className="flex items-center gap-4">
// //                 <CalendarDays className="w-10 h-10 text-masjid-accent" />
// //                 <h2 className="text-2xl font-bold text-masjid-dark">Update Prayer Times</h2>
// //             </div>
            
// //             <form onSubmit={submitPrayerUpdate} className="space-y-6">
// //                 {/* (UPDATED): Removed the row with Date En and Date Ur inputs. */}
// //                 <div className="grid grid-cols-1 gap-6">
// //                     <div>
// //                         <label className={labelClass}>Next Prayer (Must match a time below, e.g., 1:30 PM)</label>
// //                         <input type="text" name="nextPrayerTime" value={prayerForm.nextPrayerTime} onChange={handlePrayerInput} className={inputClass} placeholder="e.g., 1:30 PM" required />
// //                         <p className="text-xs text-slate-400 mt-1">Note: Today's Date will be automatically added when you submit.</p>
// //                     </div>
// //                 </div>

// //                 {/* Individual Prayer Times Row */}
// //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100">
// //                     {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumah'].map(prayer => (
// //                         <div key={prayer}>
// //                             <label className={`${labelClass} capitalize`}>{prayer}</label>
// //                             <input type="text" name={prayer} value={prayerForm[prayer]} onChange={handlePrayerInput} className={`${inputClass} font-mono text-center`} placeholder="00:00 AM" required />
// //                         </div>
// //                     ))}
// //                 </div>

// //                 <div className="flex justify-end pt-4">
// //                     <button type="submit" className={btnPrimary}><Save size={20}/> Update Database</button>
// //                 </div>
// //             </form>
// //         </div>

// //         {/* === SECTION 2: ADD NEW ANNOUNCEMENT FORM === */}
// //         <div className={`${cardClass} space-y-6`}>
// //             <div className="flex items-center gap-3">
// //                 <PlusCircle className="w-9 h-9 text-masjid-accent" />
// //                 <h2 className="text-2xl font-bold text-masjid-dark">Add New Announcement</h2>
// //             </div>
// //             <form onSubmit={submitAnnouncement} className="space-y-5">
// //                 <div>
// //                     <label className={labelClass}>Announcement Title</label>
// //                     <input type="text" name="title" value={newAnnounce.title} onChange={handleAnnounceInput} className={inputClass} placeholder="E.g., Eid Ul Adha Qurbani" required />
// //                 </div>
// //                 <div>
// //                     <label className={labelClass}>Content</label>
// //                     <textarea name="content" value={newAnnounce.content} onChange={handleAnnounceInput} className={`${inputClass} h-32 resize-none`} placeholder="Detailed message..." required></textarea>
// //                 </div>
// //                 <div>
// //                     <label className={labelClass}>Priority</label>
// //                     <select name="priority" value={newAnnounce.priority} onChange={handleAnnounceInput} className={inputClass}>
// //                         <option value="low">Low</option>
// //                         <option value="medium">Medium</option>
// //                         <option value="high">High (Urgent)</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" className={`${btnPrimary} w-full justify-center`}><Megaphone size={20}/> Post to Database</button>
// //             </form>
// //         </div>
// //       </div>

// //       {/* === SECTION 3: VIEW & DELETE ANNOUNCEMENTS LIST === */}
// //       <div className={`${cardClass} space-y-8`}>
// //         <div className="flex items-center justify-between">
// //             <h2 className="text-2xl font-bold text-masjid-dark">Current Announcements in Database ({announcements.length})</h2>
// //             <button onClick={fetchData} className="text-sm text-masjid-gold hover:underline">Refresh List</button>
// //         </div>
        
// //         <div className="space-y-5 max-h-[500px] overflow-y-auto pr-3">
// //             {announcements.map(ann => (
// //                 <div key={ann._id} className="flex items-center justify-between gap-6 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition">
// //                     <div className="flex-1 space-y-1">
// //                         <div className='flex items-center gap-3'>
// //                              <span className={`text-xs font-bold px-2 py-0.5 rounded ${ann.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
// //                                  {(ann.priority || 'medium').toUpperCase()}
// //                              </span>
// //                              <h4 className="text-lg font-semibold text-masjid-dark">{ann.title}</h4>
// //                         </div>
// //                         <p className="text-sm text-slate-600 line-clamp-2">{ann.content}</p>
// //                         <p className="text-xs text-slate-400 font-mono">ID: {ann._id} | Created: {new Date(ann.createdAt).toLocaleString()}</p>
// //                     </div>
// //                     <button 
// //                         onClick={() => deleteAnnouncement(ann._id)}
// //                         className="p-3 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition active:scale-95"
// //                         title="Delete Announcement"
// //                     >
// //                         <Trash2 size={20} />
// //                     </button>
// //                 </div>
// //             ))}
// //             {announcements.length === 0 && <div className='text-center py-10 text-slate-500'>No announcements found in database. Use the form above to add one.</div>}
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }



// // src/pages/AdminPanel.jsx
// // ###############################################
// //###############################
// // import { useState, useEffect } from 'react';
// // import { Trash2, PlusCircle, Save, CalendarDays, Megaphone, CheckCircle, XCircle, BookOpen, Edit } from 'lucide-react';
// // const API_BASE_URL = 'http://localhost:5000/api'; 

// // const getTodayDateEn = () => {
// //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //   return new Date().toLocaleDateString('en-GB', options);
// // };
// // const getTodayDateUr = () => {
// //     return new Date().toLocaleDateString('ur-PK', { day: 'numeric', month: 'long' });
// // };

// // export default function AdminPanel() {
// //   // === 1. STATE MANAGEMENT ===
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [events, setEvents] = useState([]);
// //   const [pendingNotices, setPendingNotices] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [newAnnounce, setNewAnnounce] = useState({ title: '', content: '', priority: 'medium' });
// //   const [prayerForm, setPrayerForm] = useState({ nextPrayerTime: '', fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '', jumah: '' });
  
// //   // New States for PRD Modules
// //   const [newEvent, setNewEvent] = useState({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
// //   const [newAyah, setNewAyah] = useState({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });

// //   // === 2. INITIAL DATA FETCHING ===
// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       // Fetch Announcements
// //       const annRes = await fetch(`${API_BASE_URL}/announcements`);
// //       if (annRes.ok) {
// //         const annData = await annRes.json();
// //         if (annData.success) setAnnouncements(annData.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
// //       }

// //       // Fetch Prayers
// //       const prayRes = await fetch(`${API_BASE_URL}/prayertimes/current`);
// //       if (prayRes.ok) {
// //           const prayData = await prayRes.json();
// //           if (prayData.success && prayData.data) {
// //             setPrayerForm({
// //               nextPrayerTime: prayData.data.nextPrayerTime,
// //               fajr: prayData.data.times.find(t => t.name === 'Fajr')?.time || '',
// //               dhuhr: prayData.data.times.find(t => t.name === 'Dhuhr')?.time || '',
// //               asr: prayData.data.times.find(t => t.name === 'Asr')?.time || '',
// //               maghrib: prayData.data.times.find(t => t.name === 'Maghrib')?.time || '',
// //               isha: prayData.data.times.find(t => t.name === 'Isha')?.time || '',
// //               jumah: prayData.data.times.find(t => t.name === 'Jumah')?.time || '',
// //             });
// //           }
// //       }

// //       // Fetch Events
// //       const evRes = await fetch(`${API_BASE_URL}/events`);
// //       if (evRes.ok) {
// //           const evData = await evRes.json();
// //           if (evData.success) setEvents(evData.data);
// //       }

// //       // Fetch Pending Notices
// //       const notRes = await fetch(`${API_BASE_URL}/notices/pending`);
// //       if (notRes.ok) {
// //           const notData = await notRes.json();
// //           if (notData.success) setPendingNotices(notData.data);
// //       }

// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // === HANDLERS (Announcements & Prayers) ===
// //   const handleAnnounceInput = (e) => setNewAnnounce({ ...newAnnounce, [e.target.name]: e.target.value });
// //   const handlePrayerInput = (e) => setPrayerForm({ ...prayerForm, [e.target.name]: e.target.value });

// //   const submitAnnouncement = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/announcements`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newAnnounce, author: "Admin" }) });
// //       const data = await res.json();
// //       if (data.success) { setAnnouncements([data.data, ...announcements]); setNewAnnounce({ title: '', content: '', priority: 'medium' }); alert("Announcement Added!"); }
// //     } catch (err) { alert("Error: " + err.message); }
// //   };

// //   const deleteAnnouncement = async (id) => {
// //     if(!window.confirm("Delete this announcement?")) return;
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
// //       const data = await res.json();
// //       if (data.success) setAnnouncements(announcements.filter(ann => ann._id !== id));
// //     } catch (err) { alert("Error: " + err.message); }
// //   };

// //   const submitPrayerUpdate = async (e) => {
// //     e.preventDefault();
// //     const payload = {
// //       dateEn: getTodayDateEn(), dateUr: getTodayDateUr(), nextPrayerTime: prayerForm.nextPrayerTime,
// //       times: [
// //         { name: 'Fajr', time: prayerForm.fajr, urName: 'فجر' }, { name: 'Dhuhr', time: prayerForm.dhuhr, urName: 'ظہر' },
// //         { name: 'Asr', time: prayerForm.asr, urName: 'عصر' }, { name: 'Maghrib', time: prayerForm.maghrib, urName: 'مغرب' },
// //         { name: 'Isha', time: prayerForm.isha, urName: 'عشاء' }, { name: 'Jumah', time: prayerForm.jumah, urName: 'جمعہ' },
// //       ]
// //     };
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/prayertimes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
// //       if ((await res.json()).success) alert("Prayer Times Updated!");
// //     } catch (err) { alert("Error: " + err.message); }
// //   };

// //   // === NEW HANDLERS: EVENTS ===
// //   const handleEventInput = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
// //   const submitEvent = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
// //       const data = await res.json();
// //       if (data.success) { setEvents([...events, data.data]); setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' }); alert("Event Added!"); }
// //     } catch (err) { alert("Error: " + err.message); }
// //   };
// //   const deleteEvent = async (id) => {
// //     if(!window.confirm("Delete this event?")) return;
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' });
// //       if ((await res.json()).success) setEvents(events.filter(ev => ev._id !== id));
// //     } catch (err) { alert("Error: " + err.message); }
// //   };

// //   // === NEW HANDLERS: NOTICES ===
// //   const resolveNotice = async (id, status) => {
// //       try {
// //           const res = await fetch(`${API_BASE_URL}/notices/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
// //           if ((await res.json()).success) setPendingNotices(pendingNotices.filter(n => n._id !== id));
// //       } catch (err) { alert("Error: " + err.message); }
// //   };

// //   // === NEW HANDLERS: DAILY AYAH ===
// //   const handleAyahInput = (e) => setNewAyah({ ...newAyah, [e.target.name]: e.target.value });
// //   const submitAyah = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/dailyayah`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAyah) });
// //       if ((await res.json()).success) { setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' }); alert("Ayah Added!"); }
// //     } catch (err) { alert("Error: " + err.message); }
// //   };

// //   // === UI LAYOUT ===
// //   if (loading) return <div className="p-10 text-center animate-pulse text-xl text-slate-500">Loading Admin Panel...</div>;
// //   if (error) return <div className="p-10 text-center text-xl text-red-500">Error: {error}</div>;

// //   const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold focus:border-masjid-gold outline-none transition";
// //   const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
// //   const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";
// //   const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition duration-150 active:scale-95 w-full justify-center mt-4";

// //   return (
// //     <div className="container mx-auto px-6 py-12 space-y-12 bg-slate-50 min-h-screen">
// //       <h1 className="text-4xl font-extrabold text-masjid-dark mb-10 pb-4 border-b-4 border-masjid-gold inline-block">Smart Masjid Connect - Admin Hub</h1>

// //       {/* --- ROW 1: PRAYERS & ANNOUNCEMENTS (Existing) --- */}
// //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
// //         <div className={`xl:col-span-2 ${cardClass} space-y-8`}>
// //             <div className="flex items-center gap-4"><CalendarDays className="w-10 h-10 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Update Prayer Times</h2></div>
// //             <form onSubmit={submitPrayerUpdate} className="space-y-6">
// //                 <div className="grid grid-cols-1 gap-6">
// //                     <div>
// //                         <label className={labelClass}>Next Prayer Time</label>
// //                         <input type="text" name="nextPrayerTime" value={prayerForm.nextPrayerTime} onChange={handlePrayerInput} className={inputClass} placeholder="e.g., 1:30 PM" required />
// //                     </div>
// //                 </div>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100">
// //                     {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumah'].map(prayer => (
// //                         <div key={prayer}>
// //                             <label className={`${labelClass} capitalize`}>{prayer}</label>
// //                             <input type="text" name={prayer} value={prayerForm[prayer]} onChange={handlePrayerInput} className={`${inputClass} font-mono text-center`} placeholder="00:00 AM" required />
// //                         </div>
// //                     ))}
// //                 </div>
// //                 <button type="submit" className={btnPrimary}><Save size={20}/> Update Times</button>
// //             </form>
// //         </div>

// //         <div className={`${cardClass} space-y-6`}>
// //             <div className="flex items-center gap-3"><Megaphone className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">New Announcement</h2></div>
// //             <form onSubmit={submitAnnouncement} className="space-y-5">
// //                 <input type="text" name="title" value={newAnnounce.title} onChange={handleAnnounceInput} className={inputClass} placeholder="Title" required />
// //                 <textarea name="content" value={newAnnounce.content} onChange={handleAnnounceInput} className={`${inputClass} h-24 resize-none`} placeholder="Content" required></textarea>
// //                 <select name="priority" value={newAnnounce.priority} onChange={handleAnnounceInput} className={inputClass}>
// //                     <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
// //                 </select>
// //                 <button type="submit" className={btnPrimary}>Post Announcement</button>
// //             </form>
// //         </div>
// //       </div>

// //       {/* --- ROW 2: ISLAMIC CALENDAR & DAILY AYAH --- */}
// //       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
// //         {/* ADD EVENT */}
// //         <div className={`${cardClass} space-y-6`}>
// //             <div className="flex items-center gap-3"><CalendarDays className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Add Calendar Event</h2></div>
// //             <form onSubmit={submitEvent} className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <input type="text" name="title" value={newEvent.title} onChange={handleEventInput} className={inputClass} placeholder="English Title" required />
// //                     <input type="text" name="urTitle" value={newEvent.urTitle} onChange={handleEventInput} className={`${inputClass} text-right`} placeholder="Urdu Title" dir="rtl" required />
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <input type="date" name="dateGregorian" value={newEvent.dateGregorian} onChange={handleEventInput} className={inputClass} required />
// //                     <input type="text" name="dateHijri" value={newEvent.dateHijri} onChange={handleEventInput} className={inputClass} placeholder="Hijri Date (e.g. 10 Muharram 1448)" required />
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <select name="category" value={newEvent.category} onChange={handleEventInput} className={inputClass}>
// //                         <option>Islamic Holidays</option><option>Masjid Events</option><option>Educational</option><option>Community</option>
// //                     </select>
// //                     <input type="text" name="location" value={newEvent.location} onChange={handleEventInput} className={inputClass} placeholder="Location" required />
// //                 </div>
// //                 <textarea name="description" value={newEvent.description} onChange={handleEventInput} className={`${inputClass} h-20`} placeholder="English Description" required></textarea>
// //                 <textarea name="urDescription" value={newEvent.urDescription} onChange={handleEventInput} className={`${inputClass} h-20 text-right`} placeholder="Urdu Description" dir="rtl" required></textarea>
// //                 <button type="submit" className={btnPrimary}><PlusCircle size={20}/> Add Event</button>
// //             </form>
// //         </div>

// //         {/* ADD DAILY AYAH */}
// //         <div className={`${cardClass} space-y-6`}>
// //             <div className="flex items-center gap-3"><BookOpen className="w-9 h-9 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Add Daily Ayah</h2></div>
// //             <form onSubmit={submitAyah} className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <input type="text" name="surahName" value={newAyah.surahName} onChange={handleAyahInput} className={inputClass} placeholder="Surah Name" required />
// //                     <input type="number" name="ayahNumber" value={newAyah.ayahNumber} onChange={handleAyahInput} className={inputClass} placeholder="Ayah Number" required />
// //                 </div>
// //                 <textarea name="arabicText" value={newAyah.arabicText} onChange={handleAyahInput} className={`${inputClass} h-20 text-right text-xl font-arabic`} placeholder="Arabic Text" dir="rtl" required></textarea>
// //                 <textarea name="transliteration" value={newAyah.transliteration} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Transliteration" required></textarea>
// //                 <textarea name="englishTranslation" value={newAyah.englishTranslation} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="English Translation" required></textarea>
// //                 <textarea name="tafsirSnippet" value={newAyah.tafsirSnippet} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Tafsir Snippet (Optional)"></textarea>
// //                 <button type="submit" className={btnPrimary}><Save size={20}/> Save Ayah</button>
// //             </form>
// //         </div>
// //       </div>

// //       {/* --- ROW 3: APPROVAL QUEUE & LISTS --- */}
// //       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
// //         {/* PENDING NOTICES */}
// //         <div className={`${cardClass} space-y-6`}>
// //             <h2 className="text-2xl font-bold text-masjid-dark">Notice Board Queue ({pendingNotices.length})</h2>
// //             <div className="space-y-4 max-h-[400px] overflow-y-auto">
// //                 {pendingNotices.length === 0 ? <p className="text-slate-500 text-center py-5">No pending notices.</p> : 
// //                     pendingNotices.map(notice => (
// //                         <div key={notice._id} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
// //                             <div className="flex justify-between items-start">
// //                                 <div>
// //                                     <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">{notice.category}</span>
// //                                     <h4 className="text-lg font-bold mt-2">{notice.title}</h4>
// //                                     <p className="text-sm text-slate-600 mt-1">{notice.content}</p>
// //                                     <p className="text-xs text-slate-400 mt-2">Contact: {notice.contactInfo}</p>
// //                                 </div>
// //                                 <div className="flex gap-2">
// //                                     <button onClick={() => resolveNotice(notice._id, 'approved')} className="text-green-600 hover:bg-green-100 p-2 rounded-full"><CheckCircle size={24}/></button>
// //                                     <button onClick={() => resolveNotice(notice._id, 'rejected')} className="text-red-600 hover:bg-red-100 p-2 rounded-full"><XCircle size={24}/></button>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))
// //                 }
// //             </div>
// //         </div>

// //         {/* EXISTING ANNOUNCEMENTS LIST */}
// //         <div className={`${cardClass} space-y-6`}>
// //             <h2 className="text-2xl font-bold text-masjid-dark">Manage Announcements</h2>
// //             <div className="space-y-4 max-h-[400px] overflow-y-auto">
// //                 {announcements.map(ann => (
// //                     <div key={ann._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl">
// //                         <div>
// //                             <h4 className="font-bold">{ann.title}</h4>
// //                             <p className="text-xs text-slate-500">{new Date(ann.createdAt).toLocaleDateString()}</p>
// //                         </div>
// //                         <button onClick={() => deleteAnnouncement(ann._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={20}/></button>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/AdminPanel.jsx
// import { useState, useEffect } from 'react';
// import { Trash2, PlusCircle, Save, CalendarDays, Megaphone, CheckCircle, XCircle, BookOpen, Edit } from 'lucide-react';
// const API_BASE_URL = 'http://localhost:5000/api'; 

// const getTodayDateEn = () => {
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date().toLocaleDateString('en-GB', options);
// };
// const getTodayDateUr = () => {
//     return new Date().toLocaleDateString('ur-PK', { day: 'numeric', month: 'long' });
// };

// export default function AdminPanel() {
//   // === 1. STATE MANAGEMENT ===
//   const [announcements, setAnnouncements] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [ayahs, setAyahs] = useState([]); // List to manage all Ayahs
//   const [pendingNotices, setPendingNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Edit Tracking IDs
//   const [editAnnounceId, setEditAnnounceId] = useState(null);
//   const [editEventId, setEditEventId] = useState(null);
//   const [editAyahId, setEditAyahId] = useState(null);

//   const [newAnnounce, setNewAnnounce] = useState({ title: '', content: '', priority: 'medium' });
//   const [prayerForm, setPrayerForm] = useState({ nextPrayerTime: '', fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '', jumah: '' });
  
//   const [newEvent, setNewEvent] = useState({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
//   const [newAyah, setNewAyah] = useState({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });

//   // === 2. INITIAL DATA FETCHING ===
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch Announcements
//       const annRes = await fetch(`${API_BASE_URL}/announcements`);
//       if (annRes.ok) {
//         const annData = await annRes.json();
//         if (annData.success) setAnnouncements(annData.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
//       }

//       // Fetch Prayers
//       const prayRes = await fetch(`${API_BASE_URL}/prayertimes/current`);
//       if (prayRes.ok) {
//           const prayData = await prayRes.json();
//           if (prayData.success && prayData.data) {
//             setPrayerForm({
//               nextPrayerTime: prayData.data.nextPrayerTime,
//               fajr: prayData.data.times.find(t => t.name === 'Fajr')?.time || '',
//               dhuhr: prayData.data.times.find(t => t.name === 'Dhuhr')?.time || '',
//               asr: prayData.data.times.find(t => t.name === 'Asr')?.time || '',
//               maghrib: prayData.data.times.find(t => t.name === 'Maghrib')?.time || '',
//               isha: prayData.data.times.find(t => t.name === 'Isha')?.time || '',
//               jumah: prayData.data.times.find(t => t.name === 'Jumah')?.time || '',
//             });
//           }
//       }

//       // Fetch Events
//       const evRes = await fetch(`${API_BASE_URL}/events`);
//       if (evRes.ok) {
//           const evData = await evRes.json();
//           if (evData.success) setEvents(evData.data);
//       }

//       // Fetch All Ayahs for management
//       const ayahRes = await fetch(`${API_BASE_URL}/dailyayah/all`);
//       if (ayahRes.ok) {
//           const ayahData = await ayahRes.json();
//           if (ayahData.success) setAyahs(ayahData.data);
//       }

//       // Fetch Pending Notices
//       const notRes = await fetch(`${API_BASE_URL}/notices/pending`);
//       if (notRes.ok) {
//           const notData = await notRes.json();
//           if (notData.success) setPendingNotices(notData.data);
//       }

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // === HANDLERS: ANNOUNCEMENTS ===
//   const handleAnnounceInput = (e) => setNewAnnounce({ ...newAnnounce, [e.target.name]: e.target.value });

//   const startEditAnnouncement = (ann) => {
//     setEditAnnounceId(ann._id);
//     setNewAnnounce({ title: ann.title, content: ann.content, priority: ann.priority });
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   };

//   const submitAnnouncement = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editAnnounceId ? 'PUT' : 'POST';
//       const url = editAnnounceId ? `${API_BASE_URL}/announcements/${editAnnounceId}` : `${API_BASE_URL}/announcements`;
//       const res = await fetch(url, { 
//           method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newAnnounce, author: "Admin" }) 
//       });
//       const data = await res.json();
//       if (data.success) {
//         if (editAnnounceId) {
//           setAnnouncements(announcements.map(a => a._id === editAnnounceId ? data.data : a));
//           setEditAnnounceId(null);
//           alert("Announcement Updated!");
//         } else {
//           setAnnouncements([data.data, ...announcements]); 
//           alert("Announcement Added!");
//         }
//         setNewAnnounce({ title: '', content: '', priority: 'medium' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteAnnouncement = async (id) => {
//     if(!window.confirm("Delete this announcement?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) setAnnouncements(announcements.filter(ann => ann._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: PRAYERS ===
//   const handlePrayerInput = (e) => setPrayerForm({ ...prayerForm, [e.target.name]: e.target.value });

//   const submitPrayerUpdate = async (e) => {
//     e.preventDefault();
//     const payload = {
//       dateEn: getTodayDateEn(), dateUr: getTodayDateUr(), nextPrayerTime: prayerForm.nextPrayerTime,
//       times: [
//         { name: 'Fajr', time: prayerForm.fajr, urName: 'فجر' }, { name: 'Dhuhr', time: prayerForm.dhuhr, urName: 'ظہر' },
//         { name: 'Asr', time: prayerForm.asr, urName: 'عصر' }, { name: 'Maghrib', time: prayerForm.maghrib, urName: 'مغرب' },
//         { name: 'Isha', time: prayerForm.isha, urName: 'عشاء' }, { name: 'Jumah', time: prayerForm.jumah, urName: 'جمعہ' },
//       ]
//     };
//     try {
//       const res = await fetch(`${API_BASE_URL}/prayertimes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
//       if ((await res.json()).success) alert("Prayer Times Updated!");
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: EVENTS ===
//   const handleEventInput = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

//   const startEditEvent = (ev) => {
//     setEditEventId(ev._id);
//     setNewEvent({
//       title: ev.title, 
//       urTitle: ev.urTitle, 
//       description: ev.description, 
//       urDescription: ev.urDescription, 
//       dateGregorian: ev.dateGregorian.split('T')[0], 
//       dateHijri: ev.dateHijri, 
//       category: ev.category, 
//       location: ev.location 
//     });
//     window.scrollTo({ top: 500, behavior: 'smooth' });
//   };

//   const submitEvent = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editEventId ? 'PUT' : 'POST';
//       const url = editEventId ? `${API_BASE_URL}/events/${editEventId}` : `${API_BASE_URL}/events`;
//       const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
//       const data = await res.json();
//       if (data.success) { 
//         if (editEventId) {
//           setEvents(events.map(ev => ev._id === editEventId ? data.data : ev));
//           setEditEventId(null);
//           alert("Event Updated!");
//         } else {
//           setEvents([...events, data.data]);
//           alert("Event Added!");
//         }
//         setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteEvent = async (id) => {
//     if(!window.confirm("Delete this event?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' });
//       if ((await res.json()).success) setEvents(events.filter(ev => ev._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: NOTICES ===
//   const resolveNotice = async (id, status) => {
//       try {
//           const res = await fetch(`${API_BASE_URL}/notices/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
//           if ((await res.json()).success) setPendingNotices(pendingNotices.filter(n => n._id !== id));
//       } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: DAILY AYAH ===
//   const handleAyahInput = (e) => setNewAyah({ ...newAyah, [e.target.name]: e.target.value });

//   const startEditAyah = (ayah) => {
//     setEditAyahId(ayah._id);
//     setNewAyah({ ...ayah });
//     window.scrollTo({ top: 500, behavior: 'smooth' });
//   };

//   const submitAyah = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editAyahId ? 'PUT' : 'POST';
//       const url = editAyahId ? `${API_BASE_URL}/dailyayah/${editAyahId}` : `${API_BASE_URL}/dailyayah`;
//       const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAyah) });
//       const data = await res.json();
//       if (data.success) {
//         if (editAyahId) {
//           setAyahs(ayahs.map(a => a._id === editAyahId ? data.data : a));
//           setEditAyahId(null);
//           alert("Ayah Updated!");
//         } else {
//           setAyahs([data.data, ...ayahs]);
//           alert("Ayah Added!");
//         }
//         setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteAyah = async (id) => {
//     if(!window.confirm("Delete this Ayah record?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/dailyayah/${id}`, { method: 'DELETE' });
//       if ((await res.json()).success) setAyahs(ayahs.filter(a => a._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === UI LAYOUT ===
//   if (loading) return <div className="p-10 text-center animate-pulse text-xl text-slate-500">Loading Admin Panel...</div>;
//   if (error) return <div className="p-10 text-center text-xl text-red-500">Error: {error}</div>;

//   const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold focus:border-masjid-gold outline-none transition";
//   const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
//   const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";
//   const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition duration-150 active:scale-95 w-full justify-center mt-4";

//   return (
//     <div className="container mx-auto px-6 py-12 space-y-12 bg-slate-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-masjid-dark mb-10 pb-4 border-b-4 border-masjid-gold inline-block">Smart Masjid Connect - Admin Hub</h1>

//       {/* --- ROW 1: PRAYERS & ANNOUNCEMENTS --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
//         <div className={`xl:col-span-2 ${cardClass} space-y-8`}>
//             <div className="flex items-center gap-4"><CalendarDays className="w-10 h-10 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Update Prayer Times</h2></div>
//             <form onSubmit={submitPrayerUpdate} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6">
//                     <div>
//                         <label className={labelClass}>Next Prayer Time</label>
//                         <input type="text" name="nextPrayerTime" value={prayerForm.nextPrayerTime} onChange={handlePrayerInput} className={inputClass} placeholder="e.g., 1:30 PM" required />
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100">
//                     {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumah'].map(prayer => (
//                         <div key={prayer}>
//                             <label className={`${labelClass} capitalize`}>{prayer}</label>
//                             <input type="text" name={prayer} value={prayerForm[prayer]} onChange={handlePrayerInput} className={`${inputClass} font-mono text-center`} placeholder="00:00 AM" required />
//                         </div>
//                     ))}
//                 </div>
//                 <button type="submit" className={btnPrimary}><Save size={20}/> Update Times</button>
//             </form>
//         </div>

//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <Megaphone className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                     {editAnnounceId ? "Edit Announcement" : "New Announcement"}
//                 </h2>
//             </div>
//             <form onSubmit={submitAnnouncement} className="space-y-5">
//                 <input type="text" name="title" value={newAnnounce.title} onChange={handleAnnounceInput} className={inputClass} placeholder="Title" required />
//                 <textarea name="content" value={newAnnounce.content} onChange={handleAnnounceInput} className={`${inputClass} h-24 resize-none`} placeholder="Content" required></textarea>
//                 <select name="priority" value={newAnnounce.priority} onChange={handleAnnounceInput} className={inputClass}>
//                     <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
//                 </select>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                         {editAnnounceId ? "Update" : "Post"}
//                     </button>
//                     {editAnnounceId && (
//                         <button type="button" onClick={() => { setEditAnnounceId(null); setNewAnnounce({ title: '', content: '', priority: 'medium' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//       </div>

//       {/* --- ROW 2: ISLAMIC CALENDAR & DAILY AYAH --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <CalendarDays className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                   {editEventId ? "Edit Event" : "Add Calendar Event"}
//                 </h2>
//             </div>
//             <form onSubmit={submitEvent} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="text" name="title" value={newEvent.title} onChange={handleEventInput} className={inputClass} placeholder="English Title" required />
//                     <input type="text" name="urTitle" value={newEvent.urTitle} onChange={handleEventInput} className={`${inputClass} text-right`} placeholder="Urdu Title" dir="rtl" required />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="date" name="dateGregorian" value={newEvent.dateGregorian} onChange={handleEventInput} className={inputClass} required />
//                     <input type="text" name="dateHijri" value={newEvent.dateHijri} onChange={handleEventInput} className={inputClass} placeholder="Hijri Date (e.g. 10 Muharram 1448)" required />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <select name="category" value={newEvent.category} onChange={handleEventInput} className={inputClass}>
//                         <option>Islamic Holidays</option><option>Masjid Events</option><option>Educational</option><option>Community</option>
//                     </select>
//                     <input type="text" name="location" value={newEvent.location} onChange={handleEventInput} className={inputClass} placeholder="Location" required />
//                 </div>
//                 <textarea name="description" value={newEvent.description} onChange={handleEventInput} className={`${inputClass} h-20`} placeholder="English Description" required></textarea>
//                 <textarea name="urDescription" value={newEvent.urDescription} onChange={handleEventInput} className={`${inputClass} h-20 text-right`} placeholder="Urdu Description" dir="rtl" required></textarea>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                       <PlusCircle size={20}/> {editEventId ? "Update Event" : "Add Event"}
//                     </button>
//                     {editEventId && (
//                         <button type="button" onClick={() => { setEditEventId(null); setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>

//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <BookOpen className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                   {editAyahId ? "Edit Ayah" : "Add Daily Ayah"}
//                 </h2>
//             </div>
//             <form onSubmit={submitAyah} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="text" name="surahName" value={newAyah.surahName} onChange={handleAyahInput} className={inputClass} placeholder="Surah Name" required />
//                     <input type="number" name="ayahNumber" value={newAyah.ayahNumber} onChange={handleAyahInput} className={inputClass} placeholder="Ayah Number" required />
//                 </div>
//                 <textarea name="arabicText" value={newAyah.arabicText} onChange={handleAyahInput} className={`${inputClass} h-20 text-right text-xl font-arabic`} placeholder="Arabic Text" dir="rtl" required></textarea>
//                 <textarea name="transliteration" value={newAyah.transliteration} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Transliteration" required></textarea>
//                 <textarea name="englishTranslation" value={newAyah.englishTranslation} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="English Translation" required></textarea>
//                 <textarea name="tafsirSnippet" value={newAyah.tafsirSnippet} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Tafsir Snippet (Optional)"></textarea>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                       <Save size={20}/> {editAyahId ? "Update Ayah" : "Save Ayah"}
//                     </button>
//                     {editAyahId && (
//                         <button type="button" onClick={() => { setEditAyahId(null); setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//       </div>

//       {/* --- ROW 3: APPROVAL QUEUE & LISTS --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Notice Board Queue ({pendingNotices.length})</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                 {pendingNotices.length === 0 ? <p className="text-slate-500 text-center py-5">No pending notices.</p> : 
//                     pendingNotices.map(notice => (
//                         <div key={notice._id} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">{notice.category}</span>
//                                     <h4 className="text-lg font-bold mt-2">{notice.title}</h4>
//                                     <p className="text-sm text-slate-600 mt-1">{notice.content}</p>
//                                     <p className="text-xs text-slate-400 mt-2">Contact: {notice.contactInfo}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button onClick={() => resolveNotice(notice._id, 'approved')} className="text-green-600 hover:bg-green-100 p-2 rounded-full"><CheckCircle size={24}/></button>
//                                     <button onClick={() => resolveNotice(notice._id, 'rejected')} className="text-red-600 hover:bg-red-100 p-2 rounded-full"><XCircle size={24}/></button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>

//         {/* ANNOUNCEMENTS LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Announcements</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {announcements.map(ann => (
//                     <div key={ann._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{ann.title}</h4>
//                             <p className="text-xs text-slate-500">{new Date(ann.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditAnnouncement(ann)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Announcement">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteAnnouncement(ann._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Announcement">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* EVENTS LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Events</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {events.map(ev => (
//                     <div key={ev._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{ev.title}</h4>
//                             <p className="text-xs text-slate-500">{new Date(ev.dateGregorian).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditEvent(ev)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Event">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteEvent(ev._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Event">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* AYAH LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Ayahs</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {ayahs.map(a => (
//                     <div key={a._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{a.surahName} (Ayah: {a.ayahNumber})</h4>
//                             <p className="text-xs text-slate-500">{new Date(a.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditAyah(a)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Ayah">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteAyah(a._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Ayah">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }





















// // src/pages/AdminPanel.jsx
// import { useState, useEffect } from 'react';
// import { Trash2, PlusCircle, Save, CalendarDays, Megaphone, CheckCircle, XCircle, BookOpen, Edit, Search, Database } from 'lucide-react';
// const API_BASE_URL = 'http://localhost:5000/api'; 

// // === SHARED UI CLASSES (Moved outside so all components can use them) ===
// const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold focus:border-masjid-gold outline-none transition";
// const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
// const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";
// const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition duration-150 active:scale-95 w-full justify-center mt-4";

// const getTodayDateEn = () => {
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date().toLocaleDateString('en-GB', options);
// };
// const getTodayDateUr = () => {
//     return new Date().toLocaleDateString('ur-PK', { day: 'numeric', month: 'long' });
// };

// export default function AdminPanel() {
//   // === 1. STATE MANAGEMENT ===
//   const [announcements, setAnnouncements] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [ayahs, setAyahs] = useState([]); 
//   const [pendingNotices, setPendingNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Edit Tracking IDs
//   const [editAnnounceId, setEditAnnounceId] = useState(null);
//   const [editEventId, setEditEventId] = useState(null);
//   const [editAyahId, setEditAyahId] = useState(null);

//   const [newAnnounce, setNewAnnounce] = useState({ title: '', content: '', priority: 'medium' });
//   const [prayerForm, setPrayerForm] = useState({ nextPrayerTime: '', fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '', jumah: '' });
  
//   const [newEvent, setNewEvent] = useState({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
//   const [newAyah, setNewAyah] = useState({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });

//   // === 2. INITIAL DATA FETCHING ===
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const annRes = await fetch(`${API_BASE_URL}/announcements`);
//       if (annRes.ok) {
//         const annData = await annRes.json();
//         if (annData.success) setAnnouncements(annData.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
//       }

//       const prayRes = await fetch(`${API_BASE_URL}/prayertimes/current`);
//       if (prayRes.ok) {
//           const prayData = await prayRes.json();
//           if (prayData.success && prayData.data) {
//             setPrayerForm({
//               nextPrayerTime: prayData.data.nextPrayerTime,
//               fajr: prayData.data.times.find(t => t.name === 'Fajr')?.time || '',
//               dhuhr: prayData.data.times.find(t => t.name === 'Dhuhr')?.time || '',
//               asr: prayData.data.times.find(t => t.name === 'Asr')?.time || '',
//               maghrib: prayData.data.times.find(t => t.name === 'Maghrib')?.time || '',
//               isha: prayData.data.times.find(t => t.name === 'Isha')?.time || '',
//               jumah: prayData.data.times.find(t => t.name === 'Jumah')?.time || '',
//             });
//           }
//       }

//       const evRes = await fetch(`${API_BASE_URL}/events`);
//       if (evRes.ok) {
//           const evData = await evRes.json();
//           if (evData.success) setEvents(evData.data);
//       }

//       const ayahRes = await fetch(`${API_BASE_URL}/dailyayah/all`);
//       if (ayahRes.ok) {
//           const ayahData = await ayahRes.json();
//           if (ayahData.success) setAyahs(ayahData.data);
//       }

//       const notRes = await fetch(`${API_BASE_URL}/notices/pending`);
//       if (notRes.ok) {
//           const notData = await notRes.json();
//           if (notData.success) setPendingNotices(notData.data);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // === HANDLERS: ANNOUNCEMENTS ===
//   const handleAnnounceInput = (e) => setNewAnnounce({ ...newAnnounce, [e.target.name]: e.target.value });

//   const startEditAnnouncement = (ann) => {
//     setEditAnnounceId(ann._id);
//     setNewAnnounce({ title: ann.title, content: ann.content, priority: ann.priority });
//     window.scrollTo({ top: 0, behavior: 'smooth' }); 
//   };

//   const submitAnnouncement = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editAnnounceId ? 'PUT' : 'POST';
//       const url = editAnnounceId ? `${API_BASE_URL}/announcements/${editAnnounceId}` : `${API_BASE_URL}/announcements`;
//       const res = await fetch(url, { 
//           method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newAnnounce, author: "Admin" }) 
//       });
//       const data = await res.json();
//       if (data.success) {
//         if (editAnnounceId) {
//           setAnnouncements(announcements.map(a => a._id === editAnnounceId ? data.data : a));
//           setEditAnnounceId(null);
//           alert("Announcement Updated!");
//         } else {
//           setAnnouncements([data.data, ...announcements]); 
//           alert("Announcement Added!");
//         }
//         setNewAnnounce({ title: '', content: '', priority: 'medium' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteAnnouncement = async (id) => {
//     if(!window.confirm("Delete this announcement?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/announcements/${id}`, { method: 'DELETE' });
//       const data = await res.json();
//       if (data.success) setAnnouncements(announcements.filter(ann => ann._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: PRAYERS ===
//   const handlePrayerInput = (e) => setPrayerForm({ ...prayerForm, [e.target.name]: e.target.value });

//   const submitPrayerUpdate = async (e) => {
//     e.preventDefault();
//     const payload = {
//       dateEn: getTodayDateEn(), dateUr: getTodayDateUr(), nextPrayerTime: prayerForm.nextPrayerTime,
//       times: [
//         { name: 'Fajr', time: prayerForm.fajr, urName: 'فجر' }, { name: 'Dhuhr', time: prayerForm.dhuhr, urName: 'ظہر' },
//         { name: 'Asr', time: prayerForm.asr, urName: 'عصر' }, { name: 'Maghrib', time: prayerForm.maghrib, urName: 'مغرب' },
//         { name: 'Isha', time: prayerForm.isha, urName: 'عشاء' }, { name: 'Jumah', time: prayerForm.jumah, urName: 'جمعہ' },
//       ]
//     };
//     try {
//       const res = await fetch(`${API_BASE_URL}/prayertimes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
//       if ((await res.json()).success) alert("Prayer Times Updated!");
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: EVENTS ===
//   const handleEventInput = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

//   const startEditEvent = (ev) => {
//     setEditEventId(ev._id);
//     setNewEvent({
//       title: ev.title, 
//       urTitle: ev.urTitle, 
//       description: ev.description, 
//       urDescription: ev.urDescription, 
//       dateGregorian: ev.dateGregorian.split('T')[0], 
//       dateHijri: ev.dateHijri, 
//       category: ev.category, 
//       location: ev.location 
//     });
//     window.scrollTo({ top: 500, behavior: 'smooth' });
//   };

//   const submitEvent = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editEventId ? 'PUT' : 'POST';
//       const url = editEventId ? `${API_BASE_URL}/events/${editEventId}` : `${API_BASE_URL}/events`;
//       const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEvent) });
//       const data = await res.json();
//       if (data.success) { 
//         if (editEventId) {
//           setEvents(events.map(ev => ev._id === editEventId ? data.data : ev));
//           setEditEventId(null);
//           alert("Event Updated!");
//         } else {
//           setEvents([...events, data.data]);
//           alert("Event Added!");
//         }
//         setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteEvent = async (id) => {
//     if(!window.confirm("Delete this event?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' });
//       if ((await res.json()).success) setEvents(events.filter(ev => ev._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: NOTICES ===
//   const resolveNotice = async (id, status) => {
//       try {
//           const res = await fetch(`${API_BASE_URL}/notices/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
//           if ((await res.json()).success) setPendingNotices(pendingNotices.filter(n => n._id !== id));
//       } catch (err) { alert("Error: " + err.message); }
//   };

//   // === HANDLERS: DAILY AYAH ===
//   const handleAyahInput = (e) => setNewAyah({ ...newAyah, [e.target.name]: e.target.value });

//   const startEditAyah = (ayah) => {
//     setEditAyahId(ayah._id);
//     setNewAyah({ ...ayah });
//     window.scrollTo({ top: 500, behavior: 'smooth' });
//   };

//   const submitAyah = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editAyahId ? 'PUT' : 'POST';
//       const url = editAyahId ? `${API_BASE_URL}/dailyayah/${editAyahId}` : `${API_BASE_URL}/dailyayah`;
//       const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newAyah) });
//       const data = await res.json();
//       if (data.success) {
//         if (editAyahId) {
//           setAyahs(ayahs.map(a => a._id === editAyahId ? data.data : a));
//           setEditAyahId(null);
//           alert("Ayah Updated!");
//         } else {
//           setAyahs([data.data, ...ayahs]);
//           alert("Ayah Added!");
//         }
//         setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' });
//       }
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   const deleteAyah = async (id) => {
//     if(!window.confirm("Delete this Ayah record?")) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/dailyayah/${id}`, { method: 'DELETE' });
//       if ((await res.json()).success) setAyahs(ayahs.filter(a => a._id !== id));
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   // === UI LAYOUT ===
//   if (loading) return <div className="p-10 text-center animate-pulse text-xl text-slate-500">Loading Admin Panel...</div>;
//   if (error) return <div className="p-10 text-center text-xl text-red-500">Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-6 py-12 space-y-12 bg-slate-50 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-masjid-dark mb-10 pb-4 border-b-4 border-masjid-gold inline-block">Smart Masjid Connect - Admin Hub</h1>

//       {/* --- ROW 1: PRAYERS & ANNOUNCEMENTS --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
//         <div className={`xl:col-span-2 ${cardClass} space-y-8`}>
//             <div className="flex items-center gap-4"><CalendarDays className="w-10 h-10 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Update Prayer Times</h2></div>
//             <form onSubmit={submitPrayerUpdate} className="space-y-6">
//                 <div className="grid grid-cols-1 gap-6">
//                     <div>
//                         <label className={labelClass}>Next Prayer Time</label>
//                         <input type="text" name="nextPrayerTime" value={prayerForm.nextPrayerTime} onChange={handlePrayerInput} className={inputClass} placeholder="e.g., 1:30 PM" required />
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100">
//                     {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumah'].map(prayer => (
//                         <div key={prayer}>
//                             <label className={`${labelClass} capitalize`}>{prayer}</label>
//                             <input type="text" name={prayer} value={prayerForm[prayer]} onChange={handlePrayerInput} className={`${inputClass} font-mono text-center`} placeholder="00:00 AM" required />
//                         </div>
//                     ))}
//                 </div>
//                 <button type="submit" className={btnPrimary}><Save size={20}/> Update Times</button>
//             </form>
//         </div>

//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <Megaphone className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                     {editAnnounceId ? "Edit Announcement" : "New Announcement"}
//                 </h2>
//             </div>
//             <form onSubmit={submitAnnouncement} className="space-y-5">
//                 <input type="text" name="title" value={newAnnounce.title} onChange={handleAnnounceInput} className={inputClass} placeholder="Title" required />
//                 <textarea name="content" value={newAnnounce.content} onChange={handleAnnounceInput} className={`${inputClass} h-24 resize-none`} placeholder="Content" required></textarea>
//                 <select name="priority" value={newAnnounce.priority} onChange={handleAnnounceInput} className={inputClass}>
//                     <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
//                 </select>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                         {editAnnounceId ? "Update" : "Post"}
//                     </button>
//                     {editAnnounceId && (
//                         <button type="button" onClick={() => { setEditAnnounceId(null); setNewAnnounce({ title: '', content: '', priority: 'medium' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//       </div>

//       {/* --- ROW 2: ISLAMIC CALENDAR & DAILY AYAH --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <CalendarDays className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                   {editEventId ? "Edit Event" : "Add Calendar Event"}
//                 </h2>
//             </div>
//             <form onSubmit={submitEvent} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="text" name="title" value={newEvent.title} onChange={handleEventInput} className={inputClass} placeholder="English Title" required />
//                     <input type="text" name="urTitle" value={newEvent.urTitle} onChange={handleEventInput} className={`${inputClass} text-right`} placeholder="Urdu Title" dir="rtl" required />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="date" name="dateGregorian" value={newEvent.dateGregorian} onChange={handleEventInput} className={inputClass} required />
//                     <input type="text" name="dateHijri" value={newEvent.dateHijri} onChange={handleEventInput} className={inputClass} placeholder="Hijri Date (e.g. 10 Muharram 1448)" required />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                     <select name="category" value={newEvent.category} onChange={handleEventInput} className={inputClass}>
//                         <option>Islamic Holidays</option><option>Masjid Events</option><option>Educational</option><option>Community</option>
//                     </select>
//                     <input type="text" name="location" value={newEvent.location} onChange={handleEventInput} className={inputClass} placeholder="Location" required />
//                 </div>
//                 <textarea name="description" value={newEvent.description} onChange={handleEventInput} className={`${inputClass} h-20`} placeholder="English Description" required></textarea>
//                 <textarea name="urDescription" value={newEvent.urDescription} onChange={handleEventInput} className={`${inputClass} h-20 text-right`} placeholder="Urdu Description" dir="rtl" required></textarea>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                       <PlusCircle size={20}/> {editEventId ? "Update Event" : "Add Event"}
//                     </button>
//                     {editEventId && (
//                         <button type="button" onClick={() => { setEditEventId(null); setNewEvent({ title: '', urTitle: '', description: '', urDescription: '', dateGregorian: '', dateHijri: '', category: 'Masjid Events', location: '' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>

//         <div className={`${cardClass} space-y-6`}>
//             <div className="flex items-center gap-3">
//                 <BookOpen className="w-9 h-9 text-masjid-accent" />
//                 <h2 className="text-2xl font-bold text-masjid-dark">
//                   {editAyahId ? "Edit Ayah" : "Add Daily Ayah"}
//                 </h2>
//             </div>
//             <form onSubmit={submitAyah} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                     <input type="text" name="surahName" value={newAyah.surahName} onChange={handleAyahInput} className={inputClass} placeholder="Surah Name" required />
//                     <input type="number" name="ayahNumber" value={newAyah.ayahNumber} onChange={handleAyahInput} className={inputClass} placeholder="Ayah Number" required />
//                 </div>
//                 <textarea name="arabicText" value={newAyah.arabicText} onChange={handleAyahInput} className={`${inputClass} h-20 text-right text-xl font-arabic`} placeholder="Arabic Text" dir="rtl" required></textarea>
//                 <textarea name="transliteration" value={newAyah.transliteration} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Transliteration" required></textarea>
//                 <textarea name="englishTranslation" value={newAyah.englishTranslation} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="English Translation" required></textarea>
//                 <textarea name="tafsirSnippet" value={newAyah.tafsirSnippet} onChange={handleAyahInput} className={`${inputClass} h-16`} placeholder="Tafsir Snippet (Optional)"></textarea>
//                 <div className="flex gap-2">
//                     <button type="submit" className={btnPrimary}>
//                       <Save size={20}/> {editAyahId ? "Update Ayah" : "Save Ayah"}
//                     </button>
//                     {editAyahId && (
//                         <button type="button" onClick={() => { setEditAyahId(null); setNewAyah({ arabicText: '', transliteration: '', englishTranslation: '', surahName: '', ayahNumber: '', tafsirSnippet: '' }); }} className="flex items-center gap-2 px-6 py-3 mt-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition duration-150 active:scale-95 w-full justify-center">
//                             Cancel
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </div>
//       </div>

//       {/* --- ROW 3: APPROVAL QUEUE & LISTS --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Notice Board Queue ({pendingNotices.length})</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                 {pendingNotices.length === 0 ? <p className="text-slate-500 text-center py-5">No pending notices.</p> : 
//                     pendingNotices.map(notice => (
//                         <div key={notice._id} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded">{notice.category}</span>
//                                     <h4 className="text-lg font-bold mt-2">{notice.title}</h4>
//                                     <p className="text-sm text-slate-600 mt-1">{notice.content}</p>
//                                     <p className="text-xs text-slate-400 mt-2">Contact: {notice.contactInfo}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button onClick={() => resolveNotice(notice._id, 'approved')} className="text-green-600 hover:bg-green-100 p-2 rounded-full"><CheckCircle size={24}/></button>
//                                     <button onClick={() => resolveNotice(notice._id, 'rejected')} className="text-red-600 hover:bg-red-100 p-2 rounded-full"><XCircle size={24}/></button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>

//         {/* ANNOUNCEMENTS LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Announcements</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {announcements.map(ann => (
//                     <div key={ann._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{ann.title}</h4>
//                             <p className="text-xs text-slate-500">{new Date(ann.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditAnnouncement(ann)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Announcement">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteAnnouncement(ann._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Announcement">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* EVENTS LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Events</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {events.map(ev => (
//                     <div key={ev._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{ev.title}</h4>
//                             <p className="text-xs text-slate-500">{new Date(ev.dateGregorian).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditEvent(ev)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Event">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteEvent(ev._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Event">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* AYAH LIST */}
//         <div className={`${cardClass} space-y-6`}>
//             <h2 className="text-2xl font-bold text-masjid-dark">Manage Ayahs</h2>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {ayahs.map(a => (
//                     <div key={a._id} className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-slate-50">
//                         <div>
//                             <h4 className="font-bold">{a.surahName} (Ayah: {a.ayahNumber})</h4>
//                             <p className="text-xs text-slate-500">{new Date(a.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={() => startEditAyah(a)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Edit Ayah">
//                                 <Edit size={20}/>
//                             </button>
//                             <button onClick={() => deleteAyah(a._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Delete Ayah">
//                                 <Trash2 size={20}/>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </div>

//       {/* --- NEW ROW 4: AI FIQH & LOST/FOUND --- */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 border-t border-slate-200 pt-10">
//         <FoundItemLogger />
//         <FiqhRuleInjector />
//       </div>
      
//     </div>
//   );
// }

// // ==========================================
// // === NEW SUB-COMPONENTS ===
// // ==========================================

// const FoundItemLogger = () => {
//   const [formData, setFormData] = useState({ itemName: '', description: '', location: '', contactInfo: '' });
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submitData = new FormData();
//     submitData.append('itemName', formData.itemName);
//     submitData.append('description', formData.description);
//     submitData.append('location', formData.location);
//     submitData.append('contactInfo', formData.contactInfo);
//     if (image) submitData.append('image', image);

//     try {
//       const res = await fetch(`${API_BASE_URL}/lostfound/report-found`, {
//         method: 'POST',
//         body: submitData 
//       });
//       if (res.ok) {
//         setMessage('✅ Found item successfully logged.');
//         setFormData({ itemName: '', description: '', location: '', contactInfo: '' });
//         setImage(null);
//         document.getElementById('imageInput').value = ""; 
//       } else {
//         setMessage('❌ Failed to add item.');
//       }
//     } catch (error) {
//       setMessage('❌ Server error.');
//     }
//   };

//   return (
//     <div className={`${cardClass} space-y-6`}>
//       <div className="flex items-center gap-3">
//         <Search className="w-9 h-9 text-masjid-accent" />
//         <h2 className="text-2xl font-bold text-masjid-dark">Log Found Item</h2>
//       </div>
//       {message && <p className="mb-2 text-sm font-semibold text-green-600">{message}</p>}
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" placeholder="Item Name (e.g., Casio Watch)" required value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} className={inputClass} />
//         <textarea placeholder="Description (Color, marks, etc.)" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={`${inputClass} h-20 resize-none`} />
//         <div className="grid grid-cols-2 gap-4">
//             <input type="text" placeholder="Location Found" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClass} />
//             <input type="text" placeholder="Collection Point" required value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} className={inputClass} />
//         </div>
//         <div className="pt-2">
//             <label className={labelClass}>Upload Image of Item</label>
//             <input type="file" id="imageInput" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-masjid-gold/10 file:text-masjid-dark hover:file:bg-masjid-gold/20 transition cursor-pointer" />
//         </div>
//         <button type="submit" className={btnPrimary}>
//             <Save size={20}/> Log Item
//         </button>
//       </form>
//     </div>
//   );
// };

// const FiqhRuleInjector = () => {
//   const [ruleData, setRuleData] = useState({ text: '', source: '', category: '' });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/fiqh/add-rule`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(ruleData)
//       });
//       if (res.ok) {
//         setMessage('✅ Rule instantly embedded into AI!');
//         setRuleData({ text: '', source: '', category: '' });
//       } else {
//         setMessage('❌ Failed to add rule.');
//       }
//     } catch (error) {
//       setMessage('❌ Server error.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`${cardClass} space-y-6`}>
//       <div className="flex items-center gap-3">
//         <Database className="w-9 h-9 text-masjid-accent" />
//         <h2 className="text-2xl font-bold text-masjid-dark">Add Fiqh Ruling</h2>
//       </div>
//       {message && <p className="mb-2 text-sm font-semibold text-green-600">{message}</p>}
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea required placeholder="Ruling in Roman Urdu..." value={ruleData.text} onChange={e => setRuleData({...ruleData, text: e.target.value})} className={`${inputClass} h-32 resize-none`} />
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" required placeholder="Source (e.g., Bukhari)" value={ruleData.source} onChange={e => setRuleData({...ruleData, source: e.target.value})} className={inputClass} />
//           <input type="text" required placeholder="Category (e.g., Namaz)" value={ruleData.category} onChange={e => setRuleData({...ruleData, category: e.target.value})} className={inputClass} />
//         </div>
//         <button type="submit" disabled={loading} className={`${btnPrimary} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
//            <Database size={20}/> {loading ? 'Embedding Fact...' : 'Inject Rule'}
//         </button>
//       </form>
//     </div>
//   );
// };













import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Clock, Megaphone, CalendarDays, 
  Search, Database, Moon, Users, BookOpen, Menu, X, LogOut, GraduationCap 
} from 'lucide-react';

// Import our modularized components
import PrayerTimesManager from '../components/admin/PrayerTimesManager';
import AnnouncementManager from '../components/admin/AnnouncementManager';
import EventManager from '../components/admin/EventManager';
import AyahManager from '../components/admin/AyahManager';
import NoticeQueue from '../components/admin/NoticeQueue';
import LostFoundManager from '../components/admin/LostFoundManager';
import FiqhInjector from '../components/admin/FiqhInjector';
import RamadanManager from '../components/admin/RamadanManager';
import JanazaManager from '../components/admin/JanazaManager';
import MaktabManager from '../components/admin/MaktabManager';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('prayers');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Define the sidebar navigation structure
  const navItems = [
    { id: 'prayers', label: 'Prayers & Announcements', icon: Clock },
    { id: 'community', label: 'Events & Janaza', icon: Users },
    { id: 'notices', label: 'Public Notice Board', icon: Megaphone },
    { id: 'knowledge', label: 'Daily Ayah & AI Fiqh', icon: BookOpen },
    { id: 'maktab', label: 'Maktab / Madrasa', icon: GraduationCap },
    { id: 'operations', label: 'Lost & Found', icon: Search },
    { id: 'ramadan', label: 'Ramadan Operations', icon: Moon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  // Render the correct components based on the selected tab
  const renderContent = () => {
    switch (activeTab) {
      case 'prayers':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <PrayerTimesManager />
            <AnnouncementManager />
          </div>
        );
      case 'community':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <EventManager />
            <JanazaManager />
          </div>
        );
      case 'notices':
        return (
          <div className="max-w-4xl">
            <NoticeQueue />
          </div>
        );
      case 'knowledge':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AyahManager />
            <FiqhInjector />
          </div>
        );
      case 'maktab':
        return (
          <div className="max-w-7xl">
            <MaktabManager />
          </div>
        );
      case 'operations':
        return (
          <div className="max-w-6xl">
            <LostFoundManager />
          </div>
        );
      case 'ramadan':
        return (
          <div className="max-w-6xl">
            <RamadanManager />
          </div>
        );
      default:
        return <PrayerTimesManager />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-100 font-sans">
      
      {/* MOBILE MENU TOGGLE */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-transform active:scale-95"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl
        transition-transform duration-300 ease-in-out transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 text-white mb-1">
            <LayoutDashboard className="text-masjid-gold" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Admin Hub</h1>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-2">Smart Masjid Connect</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false); // Auto-close on mobile
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-masjid-gold text-slate-900 shadow-md transform scale-[1.02]' 
                    : 'hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-slate-900' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON AREA */}
        <div className="p-6 border-t border-slate-800 text-center flex flex-col gap-3">
          <p className="text-xs text-slate-500">Logged in as <span className="font-bold text-slate-300">Super Admin</span></p>
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-2 w-full p-3 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500/20 transition"
          >
            <LogOut size={20} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          
          {/* Dynamic Header based on active tab */}
          <div className="mb-8 pb-4 border-b border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-800">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-500 mt-2">Manage your mosque operations and community updates.</p>
          </div>

          {/* The actual modular content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {renderContent()}
          </div>

        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

    </div>
  );
}