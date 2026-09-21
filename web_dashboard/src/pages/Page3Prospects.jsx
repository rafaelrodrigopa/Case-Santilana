import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { Target, Search, CheckCircle2, ChevronRight, AlertCircle, Building, Sparkles } from 'lucide-react';
import { SELOS_INFO } from '../data/mockData';

export const Page3Prospects = () => {
  const { filteredData } = useFilter();
  const [minScore, setMinScore] = useState(70);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const prospects = filteredData.filter((item) => item.score >= minScore);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            Página 3: Direcionamento Comercial & Oportunidades (Prospects)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Régua de priorização de abordagem de vendas para os consultores de expansão da Santillana.
          </p>
        </div>

        {/* Slider de Filtro de Aderência */}
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <span className="text-xs font-semibold text-slate-300">Aderência Mínima:</span>
          <input
            type="range"
            min="70"
            max="95"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-32 accent-amber-500 cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-amber-400">{minScore}%</span>
        </div>
      </div>

      {/* Main Grid: Prospects Table + Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className={`transition-all duration-300 ${selectedSchool ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exibindo {prospects.length} escolas qualificadas (Score &ge; {minScore}%)
              </span>
              <span className="text-[11px] text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Clique em uma linha para ver a ficha detalhada
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Escola</th>
                    <th className="p-3">UF / Cidade</th>
                    <th className="p-3">Selo Recomendado</th>
                    <th className="p-3 text-center">Match Aderência</th>
                    <th className="p-3">Porte Alunos</th>
                    <th className="p-3">Score Tech</th>
                    <th className="p-3">Oferta EM</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {prospects.map((item) => {
                    const isSelected = selectedSchool?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedSchool(item)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-500/10 border-l-4 border-amber-500' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="p-3 font-semibold text-white flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          {item.nome}
                        </td>
                        <td className="p-3 text-slate-400">{item.municipio} - {item.uf}</td>
                        <td className="p-3">
                          <span
                            className="px-2.5 py-1 rounded-md text-[11px] font-bold"
                            style={{
                              backgroundColor: `${SELOS_INFO[item.selo]?.cor}22`,
                              color: SELOS_INFO[item.selo]?.cor,
                              border: `1px solid ${SELOS_INFO[item.selo]?.cor}44`
                            }}
                          >
                            {item.selo}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                            <span className="font-mono font-bold text-amber-400">{item.score}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-300 font-mono">{item.alunos} alunos</td>
                        <td className="p-3 text-slate-300 font-mono">{item.tech}%</td>
                        <td className="p-3">
                          {item.medio ? (
                            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sim</span>
                          ) : (
                            <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Não</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <ChevronRight className="w-4 h-4 text-slate-500 inline" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Detail Card */}
        {selectedSchool && (
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Ficha da Escola</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedSchool.nome}</h3>
                <p className="text-xs text-slate-400">{selectedSchool.municipio} - {selectedSchool.uf}</p>
              </div>
              <button
                onClick={() => setSelectedSchool(null)}
                className="text-slate-500 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Recomendações do Selo */}
            <div
              className="p-4 rounded-xl border space-y-2"
              style={{
                backgroundColor: `${SELOS_INFO[selectedSchool.selo]?.cor}15`,
                borderColor: `${SELOS_INFO[selectedSchool.selo]?.cor}44`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: SELOS_INFO[selectedSchool.selo]?.cor }}>
                  Selo Comercial Recomendado: {selectedSchool.selo}
                </span>
                <span className="text-xs font-mono font-black text-amber-400 bg-slate-900 px-2 py-0.5 rounded">
                  Match {selectedSchool.score}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {SELOS_INFO[selectedSchool.selo]?.descricao}
              </p>
            </div>

            {/* Ação Sugerida */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Ação Sugerida de Abordagem:
              </span>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-200 font-medium leading-relaxed">
                {selectedSchool.acao}
              </div>
            </div>

            {/* Diagnóstico Estrutural */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Métricas da Unidade:</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="text-slate-400">Total Alunos</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedSchool.alunos}</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="text-slate-400">Score Tecnológico</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">{selectedSchool.tech}%</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="text-slate-400">IDHM Município</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedSchool.idhm}</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                  <div className="text-slate-400">Ensino Médio</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedSchool.medio ? 'Oferta Ativa' : 'Não'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
