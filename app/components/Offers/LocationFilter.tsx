'use client';

import { useState } from 'react';

interface LocationFilterProps {
  countryLabel: string;
  cityLabel: string;
  branchLabel: string;
  countries: string[];
  cities: string[];
  branches: string[];
}

export default function LocationFilter({
  countryLabel,
  cityLabel,
  branchLabel,
  countries,
  cities,
  branches,
}: LocationFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col px-3 border-l border-slate-200">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {countryLabel}
        </span>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col px-3 border-l border-slate-200">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {cityLabel}
        </span>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col px-3">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {branchLabel}
        </span>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors shadow-md">
        <span className="material-symbols-outlined">sync</span>
      </button>
    </div>
  );
}
