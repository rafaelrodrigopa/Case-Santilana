import React, { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_ESCOLAS } from '../data/mockData';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedSelo, setSelectedSelo] = useState(null); // null = Todos
  const [selectedUf, setSelectedUf] = useState('TODOS');
  const [selectedRegiao, setSelectedRegiao] = useState('TODAS');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('p1'); // p1, p2, p3

  // Cross-filtering computation engine
  const filteredData = useMemo(() => {
    return MOCK_ESCOLAS.filter((item) => {
      const matchSelo = selectedSelo ? item.selo === selectedSelo : true;
      const matchUf = selectedUf !== 'TODOS' ? item.uf === selectedUf : true;
      const matchRegiao = selectedRegiao !== 'TODAS' ? item.regiao === selectedRegiao : true;
      const matchSearch = searchTerm
        ? item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.municipio.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchSelo && matchUf && matchRegiao && matchSearch;
    });
  }, [selectedSelo, selectedUf, selectedRegiao, searchTerm]);

  // Aggregated KPIs based on filtered data
  const metrics = useMemo(() => {
    const totalEscolas = filteredData.length;
    const totalMatriculas = filteredData.reduce((acc, curr) => acc + curr.alunos, 0);
    const scoreMedio = totalEscolas > 0
      ? (filteredData.reduce((acc, curr) => acc + curr.score, 0) / totalEscolas).toFixed(2)
      : 0;

    const countKepler = filteredData.filter(e => e.selo === 'Kepler').length;
    const countUno = filteredData.filter(e => e.selo === 'Uno').length;
    const countFB = filteredData.filter(e => e.selo === 'Farias Brito').length;
    const countCompartilha = filteredData.filter(e => e.selo === 'Compartilha').length;

    return {
      totalEscolas,
      totalMatriculas,
      scoreMedio,
      pctKepler: totalEscolas > 0 ? ((countKepler / totalEscolas) * 100).toFixed(1) : '0.0',
      pctUno: totalEscolas > 0 ? ((countUno / totalEscolas) * 100).toFixed(1) : '0.0',
      pctFB: totalEscolas > 0 ? ((countFB / totalEscolas) * 100).toFixed(1) : '0.0',
      pctCompartilha: totalEscolas > 0 ? ((countCompartilha / totalEscolas) * 100).toFixed(1) : '0.0',
      countKepler,
      countUno,
      countFB,
      countCompartilha
    };
  }, [filteredData]);

  const toggleSeloFilter = (selo) => {
    setSelectedSelo((prev) => (prev === selo ? null : selo));
  };

  const clearAllFilters = () => {
    setSelectedSelo(null);
    setSelectedUf('TODOS');
    setSelectedRegiao('TODAS');
    setSearchTerm('');
  };

  return (
    <FilterContext.Provider
      value={{
        selectedSelo,
        setSelectedSelo,
        toggleSeloFilter,
        selectedUf,
        setSelectedUf,
        selectedRegiao,
        setSelectedRegiao,
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        filteredData,
        metrics,
        clearAllFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
