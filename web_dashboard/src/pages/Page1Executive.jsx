import React from 'react';
import { useFilter } from '../context/FilterContext';
import { KpiCard } from '../components/KpiCard';
import { Building2, Users, Award, PieChart as PieIcon, ScatterChart as ScatterIcon, Layers } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid } from 'recharts';
import { SELOS_INFO } from '../data/mockData';

export const Page1Executive = () => {
  const { filteredData, metrics, toggleSeloFilter, selectedSelo } = useFilter();

  const pieData = [
    { name: 'Kepler', value: metrics.countKepler, color: SELOS_INFO.Kepler.cor },
    { name: 'Uno', value: metrics.countUno, color: SELOS_INFO.Uno.cor },
    { name: 'Farias Brito', value: metrics.countFB, color: SELOS_INFO['Farias Brito'].cor },
    { name: 'Compartilha', value: metrics.countCompartilha, color: SELOS_INFO.Compartilha.cor }
  ].filter(d => d.value > 0);

  const scatterData = filteredData.map(item => ({
    name: item.nome,
    idhm: item.idhm,
    tech: item.tech,
    alunos: item.alunos,
    selo: item.selo,
    cor: SELOS_INFO[item.selo]?.cor || '#94A3B8'
  }));

  return (
    <div className="space-y-6">
      {/* 1. KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <KpiCard
          title="Total Escolas"
          value={metrics.totalEscolas.toLocaleString()}
          subtitle="Rede Privada Mapeada"
          icon={Building2}
        />
        <KpiCard
          title="Alunos Impactáveis"
          value={metrics.totalMatriculas.toLocaleString()}
          subtitle="Estudantes Mapeados"
          icon={Users}
        />
        <KpiCard
          title="Score Média Aderência"
          value={`${metrics.scoreMedio}%`}
          subtitle="Confiança do Match ML"
          icon={Award}
        />
        <KpiCard
          title="Share Kepler"
          value={`${metrics.pctKepler}%`}
          subtitle={`${metrics.countKepler} escolas`}
          isSelected={selectedSelo === 'Kepler'}
          onClick={() => toggleSeloFilter('Kepler')}
        />
        <KpiCard
          title="Share Uno"
          value={`${metrics.pctUno}%`}
          subtitle={`${metrics.countUno} escolas`}
          isSelected={selectedSelo === 'Uno'}
          onClick={() => toggleSeloFilter('Uno')}
        />
        <KpiCard
          title="Share Farias Brito"
          value={`${metrics.pctFB}%`}
          subtitle={`${metrics.countFB} escolas`}
          isSelected={selectedSelo === 'Farias Brito'}
          onClick={() => toggleSeloFilter('Farias Brito')}
        />
        <KpiCard
          title="Share Compartilha"
          value={`${metrics.pctCompartilha}%`}
          subtitle={`${metrics.countCompartilha} escolas`}
          isSelected={selectedSelo === 'Compartilha'}
          onClick={() => toggleSeloFilter('Compartilha')}
        />
      </div>

      {/* 2. Charts Row (Donut + Scatter Plot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Escolas por Selo */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-500" />
                Distribuição de Escolas por Selo (Donut)
              </h3>
              <span className="text-xs text-slate-400">Clique para filtrar</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Distribuição percentual e contagem dos 4 selos Santillana. Clique em qualquer fatia para aplicar o cross-filtering.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  onClick={(entry) => toggleSeloFilter(entry.name)}
                  className="cursor-pointer"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={selectedSelo === entry.name ? '#FFFFFF' : 'none'}
                      strokeWidth={3}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val, name) => [`${val} escolas`, `Selo ${name}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
            {Object.values(SELOS_INFO).map((s) => (
              <div
                key={s.nome}
                onClick={() => toggleSeloFilter(s.nome)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedSelo === s.nome ? 'bg-slate-800 border border-amber-500/50' : 'hover:bg-slate-800/50'
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.cor }}></span>
                <div>
                  <div className="text-xs font-bold text-slate-200">{s.nome}</div>
                  <div className="text-[10px] text-slate-400">{s.perfil}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scatter Plot: Dispersão Socioeconômica vs Tecnologia */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ScatterIcon className="w-4 h-4 text-amber-500" />
                Matriz de Oportunidades: IDHM vs. Índice Tech
              </h3>
              <span className="text-xs text-slate-400">Tamanho da bolha = Total de Alunos</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Eixo X: Nível socioeconômico (IDHM) | Eixo Y: Score Tecnológico (0-100). Identifica polos de expansão por perfil.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="idhm" name="IDHM" domain={[0.65, 0.90]} stroke="#94A3B8" fontSize={11} />
                <YAxis type="number" dataKey="tech" name="Índice Tech" domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <ZAxis type="number" dataKey="alunos" range={[60, 400]} name="Alunos" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val, name) => [val, name]}
                />
                {scatterData.map((entry, index) => (
                  <Scatter
                    key={`scatter-${index}`}
                    name={entry.name}
                    data={[entry]}
                    fill={entry.cor}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Table Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          Amostra das Escolas Filtradas ({filteredData.length} registros)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Nome da Escola</th>
                <th className="p-3">Município / UF</th>
                <th className="p-3">Selo Recomendado</th>
                <th className="p-3">Score Aderência</th>
                <th className="p-3">Total Alunos</th>
                <th className="p-3">Ação Comercial Sugerida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-semibold text-white">{item.nome}</td>
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
                  <td className="p-3 font-mono font-bold text-amber-400">{item.score}%</td>
                  <td className="p-3 text-slate-300 font-mono">{item.alunos} alunos</td>
                  <td className="p-3 text-slate-400 italic text-[11px]">{item.acao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
