"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, Save, Loader2, CheckCircle2, X } from "lucide-react";

export default function AuditTool() {
  // Existing Audit State
  const [tools, setTools] = useState<{ id: number; name: string; cost: number }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // Day 6: Lead Capture State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadData, setLeadData] = useState({ email: "", name: "", company: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Persistence Logic
  useEffect(() => {
    const saved = localStorage.getItem('audit-tools');
    if (saved) setTools(JSON.parse(saved));
  }, []);

  const addTool = () => {
    const newTools = [...tools, { id: Date.now(), name: "", cost: 0 }];
    setTools(newTools);
    localStorage.setItem('audit-tools', JSON.stringify(newTools));
  };

  const handleAudit = async () => {
    setLoading(true);
    setShowResults(true);
    // Simulate AI summary fetch
    setTimeout(() => {
      setAiSummary("Based on your spend, you are overpaying for seat licenses. Switching to Credex bulk credits could save you roughly 30% annually.");
      setLoading(false);
    }, 1500);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic to save to database would go here
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
      console.log("Lead Captured:", leadData);
    }, 1000);
  };

  const monthlyTotal = tools.reduce((sum, tool) => sum + Number(tool.cost), 0);
  const annualSavings = (monthlyTotal * 0.3) * 12;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">AI Spend Audit Engine</h1>
        
        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {tools.map((tool) => (
            <div key={tool.id} className="flex gap-4 mb-4">
              <input 
                placeholder="Tool Name" 
                className="flex-1 p-2 border rounded"
                value={tool.name}
                onChange={(e) => {
                  const newTools = tools.map(t => t.id === tool.id ? {...t, name: e.target.value} : t);
                  setTools(newTools);
                }}
              />
              <input 
                type="number" 
                placeholder="Monthly Cost" 
                className="w-32 p-2 border rounded"
                onChange={(e) => {
                  const newTools = tools.map(t => t.id === tool.id ? {...t, cost: Number(e.target.value)} : t);
                  setTools(newTools);
                }}
              />
            </div>
          ))}
          <button onClick={addTool} className="flex items-center gap-2 text-blue-600 font-medium">
            <Plus size={20} /> Add Tool
          </button>
        </div>

        <button 
          onClick={handleAudit}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
        >
          Run Audit Engine
        </button>

        {/* Results Section */}
        {showResults && (
          <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Potential Annual Savings</p>
                <h2 className="text-5xl font-black text-blue-900 mt-2">${annualSavings.toLocaleString()}</h2>
              </div>
              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
              >
                Claim Savings via Credex
              </button>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100 italic text-gray-700">
              {loading ? "Generating AI Insights..." : aiSummary}
            </div>
          </div>
        )}

        {/* Lead Capture Modal */}
        {isLeadModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
              <button onClick={() => setIsLeadModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <form onSubmit={submitLead} className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Lock In Your Savings</h3>
                    <p className="text-gray-500 mt-2">Enter your details and a Credex specialist will apply your {annualSavings > 1000 ? 'high-volume' : 'startup'} discount.</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      required 
                      placeholder="Full Name" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                    />
                    <input 
                      required 
                      type="email" 
                      placeholder="Work Email" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                    />
                    <input 
                      required 
                      placeholder="Company Name" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Apply Savings Now"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center"><CheckCircle2 size={64} className="text-green-500" /></div>
                  <h3 className="text-2xl font-bold text-gray-900">Application Received!</h3>
                  <p className="text-gray-600">A Credex analyst will review your ${annualSavings.toLocaleString()} savings audit and contact you at <strong>{leadData.email}</strong> within 24 hours.</p>
                  <button onClick={() => setIsLeadModalOpen(false)} className="text-blue-600 font-semibold underline">Back to Audit</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}