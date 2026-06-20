import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Save the token securely in the browser
        localStorage.setItem('adminToken', data.token);
        navigate('/admin'); // Redirect to the dashboard
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-slate-900 p-4 rounded-full mb-4">
            <Lock className="w-8 h-8 text-masjid-gold" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Admin Login</h1>
          <p className="text-slate-500 mt-2 text-center">Authorized personnel only.</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm font-bold text-center border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
            <input type="text" name="username" value={credentials.username} onChange={handleInput} required className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-masjid-gold outline-none" placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleInput} required className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-masjid-gold outline-none" placeholder="Enter password" />
          </div>
          <button type="submit" disabled={loading} className={`w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition ${loading ? 'opacity-70' : ''}`}>
            {loading ? 'Verifying...' : 'Access Command Center'}
          </button>
        </form>
      </div>
    </div>
  );
}