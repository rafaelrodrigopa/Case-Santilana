import React from 'react';

export const KpiCard = ({ title, value, subtitle, icon: Icon, color = 'amber', onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900 border p-5 rounded-2xl transition-all duration-200 shadow-lg ${
        onClick ? 'cursor-pointer hover:border-amber-500/50 hover:scale-[1.02]' : ''
      } ${
        isSelected
          ? 'border-amber-500 bg-amber-500/10 shadow-amber-500/10'
          : 'border-slate-800 hover:bg-slate-800/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-800 text-amber-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
};
