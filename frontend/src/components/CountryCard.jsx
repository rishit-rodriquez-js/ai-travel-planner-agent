import React from 'react';
import { Flag, Building, Users, Coins, Languages, Clock, MapPin } from 'lucide-react';

export default function CountryCard({ country }) {
  if (!country) return null;

  return (
    <div className="glass-card glass-card-hover p-6 border-slate-800 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-5 border-b border-slate-800 pb-4">
        {country.flag_url ? (
          <img src={country.flag_url} alt={country.name} className="w-12 h-9 rounded object-cover shadow-md border border-slate-700" />
        ) : (
          <span className="text-3xl">{country.flag_emoji || '🌐'}</span>
        )}
        <div>
          <h3 className="text-xl font-bold text-slate-100">{country.name}</h3>
          <span className="text-xs text-slate-400">{country.region} • {country.subregion}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2.5">
          <Building className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-semibold">Capital</span>
            <span className="text-sm font-medium text-slate-200">{country.capital}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Users className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-semibold">Population</span>
            <span className="text-sm font-medium text-slate-200">{country.population}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Coins className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-semibold">Currency</span>
            <span className="text-sm font-medium text-slate-200">{country.currency}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Languages className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-semibold">Languages</span>
            <span className="text-sm font-medium text-slate-200 truncate max-w-[120px] block">
              {Array.isArray(country.languages) ? country.languages.join(', ') : country.languages}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 col-span-2 pt-2 border-t border-slate-800/60">
          <Clock className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-semibold">Time Zones</span>
            <span className="text-xs font-mono text-slate-300">
              {Array.isArray(country.timezones) ? country.timezones.slice(0, 3).join(', ') : country.timezones}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
