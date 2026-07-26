import React, { useState } from 'react';
import { Plane, Calendar, DollarSign, Compass, Utensils, Lightbulb, Sun, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generateItinerary } from '../services/api';
import ItineraryTimeline from '../components/ItineraryTimeline';
import BudgetCard from '../components/BudgetCard';
import AgentActivityPanel from '../components/AgentActivityPanel';

export default function TravelPlanner() {
  const [formData, setFormData] = useState({
    destination: 'Tokyo, Japan',
    budget: '$1500 Moderate',
    days: 4,
    interests: 'Sightseeing, Anime Culture, Authentic Food',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await generateItinerary({
        destination: formData.destination,
        budget: formData.budget,
        days: parseInt(formData.days, 10),
        interests: formData.interests,
      });
      setResult(res);
    } catch (err) {
      console.error(err);
      setError('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Plane className="w-8 h-8 text-cyan-400" />
            AI Travel Planner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate custom day-wise itineraries, estimated cost breakdowns, food recommendations, and travel tips.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-slate-800">
            <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Trip Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g. Paris, Tokyo, Bali"
                  className="w-full glass-input text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Budget Level
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. $1000, Luxury"
                    className="w-full glass-input text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    className="w-full glass-input text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Travel Interests & Style
                </label>
                <input
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  placeholder="e.g. food, museums, nature"
                  className="w-full glass-input text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-button py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synthesizing Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Agent Activity Panel */}
          <AgentActivityPanel
            steps={result?.execution_steps || (loading ? ["✓ Query Received", "✓ Planner Tool Selected", "✓ OpenAI Processing..."] : [])}
          />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && (
            <div className="glass-card p-12 text-center text-slate-400 space-y-3">
              <Plane className="w-12 h-12 mx-auto text-cyan-400 opacity-60 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-200">No Itinerary Generated Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Fill in your destination, budget, and trip length on the left, then click <strong>"Generate Itinerary"</strong> to build a day-by-day plan.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Trip Overview Bar */}
              <div className="glass-card p-6 border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Generated Trip Plan</span>
                  <h2 className="text-2xl font-black text-white">{result.destination}</h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    ⏱️ {result.days} Days
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
                    💰 {result.budget}
                  </span>
                  {result.best_season && (
                    <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" /> Best Season: {result.best_season}
                    </span>
                  )}
                </div>
              </div>

              {/* Budget Card */}
              {result.budget_breakdown && (
                <BudgetCard budgetBreakdown={result.budget_breakdown} />
              )}

              {/* Day-wise Timeline */}
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Day-by-Day Interactive Timeline
                </h3>
                <ItineraryTimeline itinerary={result.itinerary} />
              </div>

              {/* Highlights & Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recommended Attractions */}
                <div className="glass-card p-5 border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" /> Top Attractions
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {result.attractions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-cyan-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Local Food Suggestions */}
                <div className="glass-card p-5 border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Utensils className="w-4 h-4" /> Local Cuisine
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {result.food_suggestions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-amber-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Travel Tips */}
                <div className="glass-card p-5 border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" /> Essential Tips
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {result.travel_tips.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-emerald-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
