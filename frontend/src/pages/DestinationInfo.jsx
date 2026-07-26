import React, { useState, useEffect } from 'react';
import { fetchDestinationInfo } from '../services/api';
import WeatherCard from '../components/WeatherCard';
import CountryCard from '../components/CountryCard';
import { Globe, Search, Loader2, Compass } from 'lucide-react';

export default function DestinationInfo() {
  const [query, setQuery] = useState('Japan');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (destinationName) => {
    setLoading(true);
    try {
      const res = await fetchDestinationInfo(destinationName);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('Japan');
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearch(query.trim());
  };

  const quickCities = ['Tokyo, Japan', 'Paris, France', 'Rome, Italy', 'New York, USA', 'London, UK', 'Sydney, Australia'];

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Globe className="w-8 h-8 text-cyan-400" />
            Live Travel Telemetry & Info
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time weather data and country metadata retrieved via OpenWeather & REST Countries APIs.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-6 border-slate-800">
        <form onSubmit={onSubmit} className="flex gap-3 max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city or country (e.g. Japan, Paris)..."
            className="flex-1 glass-input text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="gradient-button px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Fetch Data</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Quick Explore:
          </span>
          {quickCities.map((city, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(city);
                handleSearch(city);
              }}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-sm font-medium">Fetching real-time API telemetry...</span>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WeatherCard weather={data.weather} />
          <CountryCard country={data.country} />
        </div>
      ) : null}
    </div>
  );
}
