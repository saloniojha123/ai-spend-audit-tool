"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, Save } from "lucide-react";

export default function AuditPage() {
  const [entries, setEntries] = useState<{id: string, name: string, cost: string}[]>([]);

  // MANDATORY: localStorage persistence (Prevents data loss on refresh)
  useEffect(() => {
    const saved = localStorage.getItem('audit-data');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('audit-data', JSON.stringify(entries));
  }, [entries]);

  const addTool = () => {
    setEntries([...entries, { id: crypto.randomUUID(), name: '', cost: '' }]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Calculator className="text-blue-400" /> AI Spend Audit
            </h1>
            <p className="text-slate-400 text-sm mt-1">Phase 1: Inventory Management</p>
          </div>
          <button onClick={addTool} className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg">
            + Add Tool
          </button>
        </div>
        
        <div className="p-8 space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 italic">No tools tracked yet. Click "+ Add Tool" to begin your audit.</p>
            </div>
          ) : (
            entries.map(tool => (
              <div key={tool.id} className="flex gap-4 items-center animate-in fade-in zoom-in duration-300">
                <input 
                  placeholder="Tool Name (e.g. ChatGPT)" 
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  value={tool.name}
                  onChange={(e) => setEntries(entries.map(t => t.id === tool.id ? {...t, name: e.target.value} : t))}
                />
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">$</span>
                  <input 
                    type="number" placeholder="0.00" 
                    className="w-32 p-3 pl-7 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    value={tool.cost}
                    onChange={(e) => setEntries(entries.map(t => t.id === tool.id ? {...t, cost: e.target.value} : t))}
                  />
                </div>
                <button onClick={() => setEntries(entries.filter(t => t.id !== tool.id))} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
          
          {entries.length > 0 && (
            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Save size={16} className="text-green-500" /> Auto-saved to Local Storage
              </span>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all">
                Run Audit →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}