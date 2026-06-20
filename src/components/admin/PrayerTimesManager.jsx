import React, { useState, useEffect } from 'react';
import { CalendarDays, Save } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold focus:border-masjid-gold outline-none transition";
const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-masjid-gold text-white font-bold rounded-lg hover:bg-masjid-gold/90 transition duration-150 active:scale-95 w-full justify-center mt-4";

const getTodayDateEn = () => new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const getTodayDateUr = () => new Date().toLocaleDateString('ur-PK', { day: 'numeric', month: 'long' });

export default function PrayerTimesManager() {
  const [prayerForm, setPrayerForm] = useState({ nextPrayerTime: '', fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '', jumah: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/prayertimes/current`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setPrayerForm({
            nextPrayerTime: data.data.nextPrayerTime || '',
            fajr: data.data.times.find(t => t.name === 'Fajr')?.time || '',
            dhuhr: data.data.times.find(t => t.name === 'Dhuhr')?.time || '',
            asr: data.data.times.find(t => t.name === 'Asr')?.time || '',
            maghrib: data.data.times.find(t => t.name === 'Maghrib')?.time || '',
            isha: data.data.times.find(t => t.name === 'Isha')?.time || '',
            jumah: data.data.times.find(t => t.name === 'Jumah')?.time || '',
          });
        }
      }).catch(err => console.error("Error fetching prayers:", err));
  }, []);

  const handleInput = (e) => setPrayerForm({ ...prayerForm, [e.target.name]: e.target.value });

  const submitUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      dateEn: getTodayDateEn(), dateUr: getTodayDateUr(), nextPrayerTime: prayerForm.nextPrayerTime,
      times: [
        { name: 'Fajr', time: prayerForm.fajr, urName: 'فجر' }, { name: 'Dhuhr', time: prayerForm.dhuhr, urName: 'ظہر' },
        { name: 'Asr', time: prayerForm.asr, urName: 'عصر' }, { name: 'Maghrib', time: prayerForm.maghrib, urName: 'مغرب' },
        { name: 'Isha', time: prayerForm.isha, urName: 'عشاء' }, { name: 'Jumah', time: prayerForm.jumah, urName: 'جمعہ' },
      ]
    };
    try {
      const res = await fetch(`${API_BASE_URL}/prayertimes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if ((await res.json()).success) alert("Prayer Times Updated successfully!");
    } catch (err) { alert("Error: " + err.message); }
  };

  return (
    <div className={`${cardClass} space-y-8 h-full`}>
      <div className="flex items-center gap-4"><CalendarDays className="w-10 h-10 text-masjid-accent" /><h2 className="text-2xl font-bold text-masjid-dark">Update Prayer Times</h2></div>
      <form onSubmit={submitUpdate} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
              <div><label className={labelClass}>Next Prayer Time</label><input type="text" name="nextPrayerTime" value={prayerForm.nextPrayerTime} onChange={handleInput} className={inputClass} placeholder="e.g., 1:30 PM" required /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-4 border-t border-slate-100">
              {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumah'].map(prayer => (
                  <div key={prayer}><label className={`${labelClass} capitalize`}>{prayer}</label><input type="text" name={prayer} value={prayerForm[prayer]} onChange={handleInput} className={`${inputClass} font-mono text-center`} placeholder="00:00 AM" required /></div>
              ))}
          </div>
          <button type="submit" className={btnPrimary}><Save size={20}/> Update Times</button>
      </form>
    </div>
  );
}