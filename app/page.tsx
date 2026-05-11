"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Loader2, CheckCircle2, X, Info } from "lucide-react";

export default function AuditTool() {
  // --- STATE MANAGEMENT ---
  const [tools, setTools] = useState<{ id: number; name: string; cost: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", name: "", company: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- INITIALIZATION ---

  useEffect(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem('audit-tools');
    if (saved) {
      try {
        setTools(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved tools", e);
        setTools([{ id: Date.now(), name: "", cost: 0 }]);
      }
    } else {
      setTools([{ id: Date.now(), name: "", cost: 0 }]);
    }
  }
}, []);

  // --- HANDLERS ---
  const addTool = () => {
    const newTool = { id: Date.now(), name: "", cost: 0 };
    const updatedTools = [...tools, newTool];
    setTools(updatedTools);
    localStorage.setItem('audit-tools', JSON.stringify(updatedTools));
  };

  const handleAudit = async () => {
    setLoading(true);
    setShowResults(true);
    // Simulate AI analysis logic
    setTimeout(() => {
      setAiSummary("Analysis complete: You are currently exposed to 'License Bloat'. By moving these tools to Credex's Arbitrage model, we can reduce your monthly burn by approximately 30% through credit consolidation.");
      setLoading(false);
    }, 1500);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  // --- CALCULATIONS ---
  const monthlyTotal = tools.reduce((sum, tool) => sum + (Number(tool.cost) || 0), 0);
  const annualSavings = (monthlyTotal * 0.3) * 12;

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
         Stop Burning Cash on <span className="text-blue-600">AI Subscriptions.</span>
        </h1>
        <p className="text-slate-600 text-xl max-w-2xl font-medium">
         Most startups overpay for AI by 30%. Use the Credex Audit Engine to identify 
         license bloat and unlock Enterprise-grade credits in 60 seconds.
  </p>
</header>
        {/* INPUT SECTION */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <Info size={18} />
            <span>Enter your monthly AI tool expenditures</span>
          </div>
          
          {tools.map((tool) => (
            <div key={`tool-row-${tool.id}`} className="flex gap-4 animate-in fade-in duration-300"> 
             <input 
            placeholder="e.g. OpenAI, Midjourney" 
            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-slate-900"
            value={tool.name}
                onChange={(e) => {
                  const newTools = tools.map(t => t.id === tool.id ? {...t, name: e.target.value} : t);
                  setTools(newTools);
                }}
              />
              <input 
               type="number" 
                placeholder="$0.00" 
               className="w-36 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-slate-900"
               value={tool.cost || ''}
                onChange={(e) => {
                  const newTools = tools.map(t => t.id === tool.id ? {...t, cost: Number(e.target.value)} : t);
                  setTools(newTools);
                }}
              />
            </div>
          ))}
          
          <button 
            onClick={addTool} 
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors py-2"
          >
            <Plus size={20} strokeWidth={3} /> Add Another Tool
          </button>
        </section>

        <button 
          onClick={handleAudit}
          disabled={monthlyTotal === 0}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && !showResults ? "Analyzing..." : "Generate Audit Results"}
        </button>

        {/* RESULTS SECTION */}
        {showResults && (
          <section className="bg-blue-600 text-white p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-blue-100 font-medium uppercase tracking-widest text-xs">Estimated Annual Savings</p>
                <h2 className="text-6xl font-black">${annualSavings.toLocaleString()}</h2>
              </div>
              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-50 transition-all active:scale-95"
              >
                Claim This Discount
              </button>
            </div>
            
            <div className="mt-8 p-5 bg-blue-700/50 rounded-xl border border-blue-400/30 backdrop-blur-sm">
              <p className="text-blue-50 italic leading-relaxed">
                {loading ? (
                  <span className="flex items-center gap-3"><Loader2 className="animate-spin" /> AI is crunching your cost benchmarks...</span>
                ) : (
                  `" ${aiSummary} "`
                )}
              </p>
            </div>
          </section>
        )}

        {/* LEAD CAPTURE MODAL */}
        {isLeadModalOpen && (
          <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 z-50 backdrop-blur-md transition-opacity">
            <div className="bg-white rounded-3xl max-w-md w-full p-10 relative shadow-2xl animate-in fade-in slide-in-from-bottom-8">
              <button 
                onClick={() => setIsLeadModalOpen(false)} 
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={28} />
              </button>

              {!isSubmitted ? (
                <form onSubmit={submitLead} className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black text-slate-900">Final Step</h3>
                    <p className="text-slate-600 font-medium">Get your personalized savings report and unlock Credex credits.</p>
                  </div>
                 <div className="space-y-4">
                 <input 
                 required 
                placeholder="Your Name" 
                className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none text-black font-medium placeholder:text-slate-400 focus:border-blue-600"
                onChange={(e) => setLeadData({...leadData, name: e.target.value})} 
                />
                <input 
                required 
               type="email" 
               placeholder="Work Email" 
              className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none text-black font-medium placeholder:text-slate-400 focus:border-blue-600"
               onChange={(e) => setLeadData({...leadData, email: e.target.value})} 
               />
               <input 
               required 
               placeholder="Company" 
               className="w-full p-4 bg-white border border-slate-300 rounded-xl outline-none text-black font-medium placeholder:text-slate-400 focus:border-blue-600"
               onChange={(e) => setLeadData({...leadData, company: e.target.value})} 
                />
               </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify Savings"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">Success!</h3>
                    <p className="text-slate-600">Our analyst will contact <strong>{leadData.email}</strong> with your ${annualSavings.toLocaleString()} discount codes.</p>
                  </div>
                  <button onClick={() => setIsLeadModalOpen(false)} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
