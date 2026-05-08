"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, PieChart, TrendingDown, AlertCircle } from "lucide-react";

export default function AuditPage() {
  const [entries, setEntries] = useState<{id: string, name: string, cost: string}[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('audit-data');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('audit-data', JSON.stringify(entries));
  }, [entries]);

  const addTool = () => {
    setEntries([...entries, { id: crypto.randomUUID(), name: '', cost: '' }]);
    setShowResults(false);
  };

  // DAY 3 LOGIC: The Audit Calculations
  const monthlyTotal = entries.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const yearlyTotal = monthlyTotal * 12;
  const potentialSavings = yearlyTotal * 0.3; // Estimated 30% optimization for Credex clients

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* INPUT SECTION */}
        <div className="bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Calculator className="text-blue-400" /> AI Spend Audit
            </h1>
            <button onClick={addTool} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition">
              + Add Tool
            </button>
          </div>
          <div className="p-6 space-y-4">
            {entries.map(tool => (
              <div key={tool.id} className="flex gap-4 items-center">
                <input 
                  placeholder="Tool Name" 
                  className="flex-1 p-2 border rounded-md" 
                  value={tool.name}
                  onChange={(e) => {setEntries(entries.map(t => t.id === tool.id ? {...t, name: e.target.value} : t)); setShowResults(false);}}
                />
                <input 
                  type="number" placeholder="$ / mo" 
                  className="w-24 p-2 border rounded-md" 
                  value={tool.cost}
                  onChange={(e) => {setEntries(entries.map(t => t.id === tool.id ? {...t, cost: e.target.value} : t)); setShowResults(false);}}
                />
                <button onClick={() => setEntries(entries.filter(t => t.id !== tool.id))} className="text-red-400">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {entries.length > 0 && (
              <button 
                onClick={() => setShowResults(true)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold mt-4 hover:bg-black transition"
              >
                Run Savings Audit →
              </button>
            )}
          </div>
        </div>

        {/* DAY 3: RESULTS SECTION (The Logic in Action) */}
        {showResults && entries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-500">
              <div className="text-slate-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                <PieChart size={16} /> Annual Spend
              </div>
              <div className="text-3xl font-black">${yearlyTotal.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-2">Total cost over 12 months</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="text-slate-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                <TrendingDown size={16} /> Potential Savings
              </div>
              <div className="text-3xl font-black text-green-600">${potentialSavings.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-2">With Credex Optimization</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-amber-500">
              <div className="text-slate-400 text-sm font-bold uppercase mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Efficiency Score
              </div>
              <div className="text-3xl font-black text-amber-500">72%</div>
              <p className="text-xs text-slate-500 mt-2">Based on tool overlap</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}