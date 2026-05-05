import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat">
          <div className="stat__value">{stat.value}</div>
          <div className="stat__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
