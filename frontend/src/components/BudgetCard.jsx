import React from 'react';
import { DollarSign, Bed, Utensils, Bus, Ticket, PieChart } from 'lucide-react';

export default function BudgetCard({ budgetBreakdown }) {
  if (!budgetBreakdown) return null;

  const items = [
    { label: 'Accommodation', value: budgetBreakdown.accommodation, icon: Bed, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Food & Dining', value: budgetBreakdown.food_and_dining, icon: Utensils, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Transportation', value: budgetBreakdown.transportation, icon: Bus, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'Activities & Sightseeing', value: budgetBreakdown.activities, icon: Ticket, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="glass-card p-6 border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Estimated Budget Breakdown</h3>
            <p className="text-xs text-slate-400">Detailed cost allocation for your trip</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Total Estimate</span>
          <span className="text-lg font-extrabold text-emerald-400">
            {budgetBreakdown.total_estimated}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">{item.label}</span>
                <span className="text-sm font-bold text-slate-200">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
