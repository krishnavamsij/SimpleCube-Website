import React from 'react';
import { BenefitCard } from './benefit-card';

interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  metric?: string;
  description: string;
}

interface BenefitsSectionProps {
  title?: string;
  description?: string;
  benefits: BenefitItem[];
}

export function BenefitsSection({ title, description, benefits }: BenefitsSectionProps) {
  return (
    <div className="benefits">
      {title && (
        <div className="prose">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      )}
      
      {benefits.map((benefit, index) => (
        <BenefitCard 
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          metric={benefit.metric}
        >
          {benefit.description}
        </BenefitCard>
      ))}
    </div>
  );
}
