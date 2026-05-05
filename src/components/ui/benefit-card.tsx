import React from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  metric?: string;
  children: React.ReactNode;
}

export function BenefitCard({ icon, title, metric, children }: BenefitCardProps) {
  return (
    <div className="benefit-card">
      <div className="benefit-card__header">
        <div className="benefit-card__icon">
          {icon}
        </div>
        <div className="benefit-card__title">{title}</div>
        {metric && <div className="benefit-card__metric">{metric}</div>}
      </div>
      <div className="benefit-card__body">
        {children}
      </div>
    </div>
  );
}
