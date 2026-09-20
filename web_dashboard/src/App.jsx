import React from 'react';
import { FilterProvider, useFilter } from './context/FilterContext';
import { HeaderNav } from './components/HeaderNav';
import { FilterBar } from './components/FilterBar';
import { Page1Executive } from './pages/Page1Executive';
import { Page2Comparison } from './pages/Page2Comparison';
import { Page3Prospects } from './pages/Page3Prospects';
import './App.css';

const MainContent = () => {
  const { activeTab } = useFilter();

  return (
    <main className="max-w-[1920px] mx-auto p-6 space-y-6">
      {activeTab === 'p1' && <Page1Executive />}
      {activeTab === 'p2' && <Page2Comparison />}
      {activeTab === 'p3' && <Page3Prospects />}
    </main>
  );
};

export default function App() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <HeaderNav />
        <FilterBar />
        <MainContent />
      </div>
    </FilterProvider>
  );
}
