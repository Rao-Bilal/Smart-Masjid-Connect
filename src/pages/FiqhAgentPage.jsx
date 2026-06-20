import React, { useState, useRef, useEffect } from 'react';

export default function FiqhAgentPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Assalam-o-Alaikum! Main Madina Masjid ka Fiqh Assistant hoon. Aap mujhse deeni masail ke baray mein sawal pooch sakte hain.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/fiqh/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maazrat, server mein masla aa raha hai.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 h-[80vh] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Fiqh Assistant (AI)</h2>
      
      {/* Chat Box */}
      <div className="flex-grow overflow-y-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 text-sm italic">Agent soch raha hai...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input 
          className="flex-grow p-4 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Yahan apna sawal Roman Urdu mein likhein..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-8 rounded-full font-bold hover:bg-blue-700 transition-colors">
          Bhejein
        </button>
      </form>
    </div>
  );
}