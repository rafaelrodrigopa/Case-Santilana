import React from 'react';
import { useFilter } from '../context/FilterContext';
import { Filter, Search, CheckCircle2 } from 'lucide-react';
import { SELOS_INFO } from '../data/mockData';

export const FilterBar = () => {
  const {
    selectedSelo,
    toggleSeloFilter,
    selectedUf,
    setSelectedUf,
    selectedRegiao,
    setSelectedRegiao,
    searchTerm,
    setSearchTerm
  } = useFilter();

  const ufs = ['TODOS', 'SP', 'RJ', 'MG', 'PR', 'RS', 'SC', 'BA', 'PE', 'CE', 'GO', 'DF', 'AM', 'PA'];
  const regioes = ['TODAS', 'Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <Filter className="w-4 h-4 text-amber-500" />
          Filtros Slicers (Power BI):
        </div>

        {/* Slicer UF */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-300">UF:</label>
          <select
            value={selectedUf}
            onChange={(e) => setSelectedUf(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
          >
            {ufs.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>

        {/* Slicer Região */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-300">Região:</label>
          <select
            value={selectedRegiao}
            onChange={(e) => setSelectedRegiao(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
          >
            {regioes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Selo Badges Slicers (Click to Cross-Filter) */}
        <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-4">
          <span className="text-xs font-medium text-slate-400 mr-1">Selo:</span>
          {Object.values(SELOS_INFO).map((selo) => {
            const isSelected = selectedSelo === selo.nome;
            return (
              <button
                key={selo.nome}
                onClick={() => toggleSeloFilter(selo.nome)}
                style={{
                  borderColor: selo.cor,
                  backgroundColor: isSelected ? `${selo.cor}33` : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#94A3B8'
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5 ${
                  isSelected ? 'shadow-md scale-105' : 'hover:bg-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selo.cor }}></span>
                {selo.nome}
                {isSelected && <CheckCircle2 className="w-3 h-3 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar escola ou município..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg pl-9 pr-3 py-1.5 w-64 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};
