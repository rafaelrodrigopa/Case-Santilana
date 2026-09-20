import React from 'react';
import { useFilter } from '../context/FilterContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Layers, Cpu, GraduationCap, BookOpen } from 'lucide-react';
import { SELOS_INFO } from '../data/mockData';

export const Page2Comparison = () => {
  const { filteredData, toggleSeloFilter } = useFilter();

  const selosList = ['Kepler', 'Uno', 'Farias Brito', 'Compartilha'];

  const clusterAggregates = selosList.map((selo) => {
    const subset = filteredData.filter((e) => e.selo === selo);
    const count = subset.length;
    if (count === 0) {
      return { selo, avgTech: 0, avgAcad: 0, avgDocente: 0, avgRenda: 0, cor: SELOS_INFO[selo].cor };
    }
    const avgTech = (subset.reduce((a, b) => a + b.tech, 0) / count).toFixed(1);
    const avgAcad = (subset.reduce((a, b) => a + (b.medio ? 85 : 35), 0) / count).toFixed(1);
    const avgDocente = (subset.reduce((a, b) => a + (b.score * 0.9), 0) / count).toFixed(1);
    const avgRenda = ((subset.reduce((a, b) => a + b.idhm, 0) / count) * 100).toFixed(1);

    return {
      selo,
      avgTech: parseFloat(avgTech),
      avgAcad: parseFloat(avgAcad),
      avgDocente: parseFloat(avgDocente),
      avgRenda: parseFloat(avgRenda),
      cor: SELOS_INFO[selo].cor
    };
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Página 2: Comparativo Multidimensional & Diagnóstico dos Clusters
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Análise vetorial padronizada (0 a 100) para caracterização pedagógica, tecnológica e acadêmica de cada perfil de selo.
          </p>
        </div>
      </div>

      {/* Grid de 4 Quadrantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quadrante 1: Índice Tecnológico */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Quadrante 1: Índice Tecnológico Médio (0-100)
            </h3>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded">Destaque Selo Uno</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterAggregates}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="selo" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val) => [`Score ${val}`, 'Índice Tech']}
                />
                <Bar dataKey="avgTech" radius={[8, 8, 0, 0]} onClick={(data) => toggleSeloFilter(data.selo)} className="cursor-pointer">
                  {clusterAggregates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quadrante 2: Rigor Acadêmico & Ensino Médio */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              Quadrante 2: Rigor Acadêmico & Preparatório (0-100)
            </h3>
            <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-semibold px-2 py-0.5 rounded">Destaque Farias Brito</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterAggregates}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="selo" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val) => [`Score ${val}`, 'Índice Acadêmico']}
                />
                <Bar dataKey="avgAcad" radius={[8, 8, 0, 0]} onClick={(data) => toggleSeloFilter(data.selo)} className="cursor-pointer">
                  {clusterAggregates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quadrante 3: Estrutura & Formação Docente */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Quadrante 3: Estrutura Docente & Gestão Pedagógica
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded">Destaque Compartilha</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterAggregates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <YAxis type="category" dataKey="selo" stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val) => [`Score ${val}`, 'Índice Docente']}
                />
                <Bar dataKey="avgDocente" radius={[0, 8, 8, 0]} onClick={(data) => toggleSeloFilter(data.selo)} className="cursor-pointer">
                  {clusterAggregates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quadrante 4: Nível Socioeconômico do Município */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-400" />
              Quadrante 4: Nível Socioeconômico & Ticket Estimado
            </h3>
            <span className="text-[10px] bg-red-500/20 text-red-300 font-semibold px-2 py-0.5 rounded">Destaque Kepler</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterAggregates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <YAxis type="category" dataKey="selo" stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val) => [`Score ${val}`, 'Índice Renda']}
                />
                <Bar dataKey="avgRenda" radius={[0, 8, 8, 0]} onClick={(data) => toggleSeloFilter(data.selo)} className="cursor-pointer">
                  {clusterAggregates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
