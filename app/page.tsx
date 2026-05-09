"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, Save, TrendingUp, AlertCircle } from "lucide-react";

interface Tool {
  name: string;
  monthlySpend: number;
  teamSize: number;
}

export default function AISpendAudit() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [name, setName] = useState('');
  const [spend, setSpend] = useState('');
  const [team, setTeam] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('audit-tools');
    if (saved) setTools(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever tools change
  useEffect(() => {
    localStorage.setItem('audit-tools', JSON.stringify(tools));
  }, [tools]);

  const addTool = () => {
    if (name && spend && team) {
      setTools([...tools, { name, monthlySpend: Number(spend), teamSize: Number(team) }]);
      setName(''); setSpend(''); setTeam('');
      setShowResults(false);
    }
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
    setShowResults(false);
  };

  // --- THE AUDIT ENGINE (MATH LOGIC) ---
  const currentMonthlyTotal = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
  const optimalMonthlyTotal = currentMonthlyTotal * 0.7; // Credex 30% Optimization Rule
  const annualSavings = (currentMonthlyTotal - optimalMonthlyTotal) * 12;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600">AI Spend Audit Tool</h1>
          <p className="text-slate-500">Identify overspending and reclaim your budget with Credex.</p>
        </header>

        {/* Input Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input placeholder="Tool (e.g. ChatGPT)" value={name} onChange={(e)=>setName(e.target.value)} className="p-2 border rounded" />
            <input type="number" placeholder="Monthly Spend ($)" value={spend} onChange={(e)=>setSpend(e.target.value)} className="p-2 border rounded" />
            <input type="number" placeholder="Team Size" value={team} onChange={(e)=>setTeam(e.target.value)} className="p-2 border rounded" />
            <button onClick={addTool} className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2">
              <Plus size={18} /> Add Tool
            </button>
          </div>
        </section>

        {/* Tools List */}
        <div className="space-y-3">
          {tools.map((tool, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-100">
              <div>
                <span className="font-bold">{tool.name}</span>
                <span className="text-slate-400 ml-4">${tool.monthlySpend}/mo</span>
                <span className="text-slate-400 ml-4">{tool.teamSize} seats</span>
              </div>
              <button onClick={() => removeTool(index)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>

        {tools.length > 0 && (
          <button 
            onClick={() => setShowResults(true)} 
            className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Calculator size={20} /> Run Audit Engine
          </button>
        )}

        {/* RESULTS CARD (THE HERO SECTION) */}
        {showResults && (
          <section className="bg-indigo-600 text-white p-8 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-indigo-500 w-fit px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingUp size={16} /> Audit Complete
                </div>
                <h2 className="text-2xl font-bold">Your Optimization Potential</h2>
                <div className="space-y-1">
                  <p className="text-5xl font-black text-white">${annualSavings.toFixed(0)}</p>
                  <p className="text-indigo-100 text-lg">Total Annual Savings Identified</p>
                </div>
              </div>
              <div className="hidden md:block">
                <AlertCircle size={80} className="text-indigo-400 opacity-50" />
              </div>
            </div>

            <hr className="my-6 border-indigo-500" />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-indigo-100 max-w-md italic">
                "Based on your spend of ${currentMonthlyTotal}/mo, we found that optimizing seats and using Credex Credits can reduce your costs significantly."
              </p>
              {/* <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-50 transition-all">
                Claim Savings via Credex
              </button> */}
              <button 
               onClick={() => alert(`Redirecting to Credex secure checkout to save $${annualSavings.toFixed(0)}!`)}
               className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-50 transition-all active:scale-95"
               >
               Claim Savings via Credex
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}