import React, { useState, useEffect } from 'react';
import { GraduationCap, UserPlus, Save, Check, X, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const inputClass = "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-masjid-gold outline-none transition";
const btnPrimary = "flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition w-full justify-center mt-4";
const cardClass = "bg-white p-8 rounded-2xl shadow-lg border border-slate-100";

export default function MaktabManager() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', parentName: '', parentPhone: '', course: 'Qaida', currentLesson: '' });
  
  // Get today's date formatted as YYYY-MM-DD for attendance
  const todayDate = new Date().toISOString().split('T')[0];

  const fetchStudents = () => {
    fetch(`${API_BASE_URL}/maktab/students`)
      .then(res => res.json())
      .then(data => setStudents(Array.isArray(data) ? data : data.data || []));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Register Student
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/maktab/students`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ name: '', parentName: '', parentPhone: '', course: 'Qaida', currentLesson: '' });
        fetchStudents();
        alert("Student Registered Successfully!");
      }
    } catch (err) { alert("Error registering student."); }
  };

  // Mark Attendance
  const handleAttendance = async (id, status) => {
    try {
      await fetch(`${API_BASE_URL}/maktab/students/${id}/attendance`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ date: todayDate, status })
      });
      fetchStudents();
    } catch (err) { alert("Error marking attendance."); }
  };

  // Update Progress
  const handleProgressUpdate = async (id, currentLesson) => {
    const newLesson = prompt("Enter new current lesson/para:", currentLesson);
    if (!newLesson || newLesson === currentLesson) return;

    try {
      await fetch(`${API_BASE_URL}/maktab/students/${id}/progress`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ currentLesson: newLesson })
      });
      fetchStudents();
    } catch (err) { alert("Error updating progress."); }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      
      {/* COLUMN 1: Registration Form */}
      <div className={`${cardClass} space-y-6`}>
        <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-8 h-8 text-masjid-gold" />
            <h2 className="text-2xl font-bold text-masjid-dark">Register Student</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleInput} placeholder="Student Name" required className={inputClass} />
          <input type="text" name="parentName" value={formData.parentName} onChange={handleInput} placeholder="Father/Guardian Name" required className={inputClass} />
          <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleInput} placeholder="Parent Phone Number" required className={inputClass} />
          
          <select name="course" value={formData.course} onChange={handleInput} className={inputClass}>
            <option value="Qaida">Qaida</option>
            <option value="Nazra">Nazra</option>
            <option value="Hifz">Hifz</option>
            <option value="Islamic Studies">Islamic Studies</option>
          </select>
          
          <input type="text" name="currentLesson" value={formData.currentLesson} onChange={handleInput} placeholder="Starting Lesson (e.g. Takhti No 1)" required className={inputClass} />
          
          <button type="submit" className={btnPrimary}><Save size={20}/> Register Student</button>
        </form>
      </div>

      {/* COLUMNS 2 & 3: Student Roster & Daily Operations */}
      <div className={`xl:col-span-2 ${cardClass} flex flex-col h-full`}>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-masjid-dark" />
                <h2 className="text-2xl font-bold text-masjid-dark">Maktab Roster</h2>
            </div>
            <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-bold text-sm">
                Today: {new Date().toLocaleDateString()}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[600px]">
          {students.length === 0 ? <p className="text-slate-500 text-center py-10">No students registered yet.</p> : students.map(student => {
            // Find today's attendance if it exists
            const todayRecord = student.attendanceHistory?.find(a => a.date === todayDate);
            const currentStatus = todayRecord ? todayRecord.status : 'Pending';

            return (
              <div key={student._id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  
                  {/* Student Details */}
                  <div className="flex-1 w-full">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-slate-800">{student.name}</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase">{student.course}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Parent: {student.parentName} ({student.parentPhone})</p>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <BookOpen size={16} className="text-masjid-gold" />
                        <span className="text-sm font-semibold text-slate-700">Lesson: {student.currentLesson}</span>
                        <button onClick={() => handleProgressUpdate(student._id, student.currentLesson)} className="text-xs text-blue-600 hover:underline ml-2">Update</button>
                      </div>
                  </div>

                  {/* Attendance Controls */}
                  <div className="flex flex-col items-center border-l border-slate-200 pl-4">
                      <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Today's Attendance</span>
                      <div className="flex gap-2">
                          <button 
                            onClick={() => handleAttendance(student._id, 'Present')} 
                            className={`p-2 rounded-lg transition flex items-center gap-1 ${currentStatus === 'Present' ? 'bg-green-500 text-white shadow-md' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                          >
                            <Check size={18} /> <span className="text-sm font-bold pr-1">Present</span>
                          </button>
                          
                          <button 
                            onClick={() => handleAttendance(student._id, 'Absent')} 
                            className={`p-2 rounded-lg transition flex items-center gap-1 ${currentStatus === 'Absent' ? 'bg-red-500 text-white shadow-md' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                          >
                            <X size={18} /> <span className="text-sm font-bold pr-1">Absent</span>
                          </button>
                      </div>
                  </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}