// src/app/automatic-incident/SearchBar.tsx
'use client';

import React from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
      <Search className="text-gray-400" size={20} />
      <input
        type="search"
        placeholder="Rechercher un incident…"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 ml-2 outline-none"
      />
    </div>
  );
}
