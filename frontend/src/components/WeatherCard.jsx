import React from 'react';
import { CloudSun, Droplets, Wind, Thermometer } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="glass-card glass-card-hover p-6 border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Live Weather</span>
          <h3 className="text-xl font-bold text-slate-100">{weather.city}</h3>
        </div>
        {weather.icon_url ? (
          <img src={weather.icon_url} alt={weather.condition} className="w-12 h-12 object-contain" />
        ) : (
          <CloudSun className="w-10 h-10 text-amber-400" />
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-extrabold text-white tracking-tight">{weather.temperature}</span>
        <span className="text-sm font-medium text-slate-400">{weather.condition}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Droplets className="w-4 h-4 text-cyan-400" />
          <span>Humidity: <strong className="text-slate-100">{weather.humidity}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span>Wind: <strong className="text-slate-100">{weather.wind_speed}</strong></span>
        </div>
      </div>
    </div>
  );
}
