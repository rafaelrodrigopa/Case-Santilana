import React from 'react';
import { useFilter } from '../context/FilterContext';
import { BarChart2, Layers, Target, RotateCcw, ShieldCheck } from 'lucide-react';

export const HeaderNav = () => {
  const { activeTab, setActiveTab, selectedSelo, selectedUf, selectedRegiao, clearAllFilters } = useFilter();

  const hasActiveFilters = selectedSelo || selectedUf !== 'TODOS' || selectedRegiao !== 'TODAS';

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex flex-wrap items-center justify-between shadow-xl">
      <div className="flex items-center gap-3">
        <div className="bg-amber-500 p-2.5 rounded-lg text-slate-950 font-black shadow-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            Sistemas Santillana <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/30">Power BI PBIP Engine</span>
          </h1>
          <p className="text-xs text-slate-400">Dashboard de Qualidade & Segmentação de Selos Escolares</p>
        </div>
      </div>

      {/* Tabs / Páginas no Estilo Power BI */}
      <nav className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
        <button
          onClick={() => setActiveTab('p1')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'p1'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Página 1: Visão Executiva (TAM/SAM)
        </button>

        <button
          onClick={() => setActiveTab('p2')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'p2'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          Página 2: Comparativo Multidimensional
        </button>

        <button
          onClick={() => setActiveTab('p3')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'p3'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Target className="w-4 h-4" />
          Página 3: Oportunidades Comercial
        </button>
      </nav>

      {/* Active Filters Tag Bar */}
      <div className="flex items-center gap-3">
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <span className="font-semibold">Filtros Ativos (Cross-Filtering):</span>
            {selectedSelo && <span className="bg-amber-500/20 px-2 py-0.5 rounded">Selo: {selectedSelo}</span>}
            {selectedUf !== 'TODOS' && <span className="bg-amber-500/20 px-2 py-0.5 rounded">UF: {selectedUf}</span>}
            {selectedRegiao !== 'TODAS' && <span className="bg-amber-500/20 px-2 py-0.5 rounded">Região: {selectedRegiao}</span>}
            
            <button
              onClick={clearAllFilters}
              className="ml-2 hover:bg-amber-500/30 p-1 rounded transition-colors text-amber-400"
              title="Limpar Filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
