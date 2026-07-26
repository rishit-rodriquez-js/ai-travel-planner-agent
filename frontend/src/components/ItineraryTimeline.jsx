import React from 'react';
import { Sun, Sunset, Coffee, Utensils, DollarSign, Calendar } from 'lucide-react';

export default function ItineraryTimeline({ itinerary = [] }) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-6 pl-6 space-y-8 my-6">
      {itinerary.map((day) => (
        <div key={day.day} className="relative group">
          {/* Day Marker Dot */}
          <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-[10px] font-bold text-cyan-400 shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
            {day.day}
          </div>

          <div className="glass-card glass-card-hover p-6 border-slate-800">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-slate-100">
                  {day.title || `Day ${day.day}`}
                </h3>
              </div>
              {day.estimated_cost && (
                <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <DollarSign className="w-3.5 h-3.5" />
                  Cost: {day.estimated_cost}
                </span>
              )}
            </div>

            {/* Time Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Morning */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Sun className="w-4 h-4" /> Morning
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{day.morning}</p>
              </div>

              {/* Afternoon */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Coffee className="w-4 h-4" /> Afternoon
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{day.afternoon}</p>
              </div>

              {/* Evening */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Sunset className="w-4 h-4" /> Evening
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{day.evening}</p>
              </div>
            </div>

            {/* Meal Suggestions */}
            {day.meals && day.meals.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-start gap-2">
                <Utensils className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300 mr-2">Food Suggestions:</span>
                  {day.meals.join(' • ')}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
