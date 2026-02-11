
import React from 'react';
import { Article, Level } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface ArticleCardProps {
  article: Article;
  variant?: 'big' | 'horizontal' | 'standard' | 'tiny';
}

const LevelIndicator: React.FC<{ level: Level }> = ({ level }) => {
  const bars = [1, 2, 3, 4];
  const activeCount = level === 'Beginner' ? 1 : level === 'Intermediate' ? 2 : 4;
  
  return (
    <div className="flex items-end gap-[2px] p-1.5">
      {bars.map((i) => (
        <div 
          key={i} 
          className={`w-[3px] rounded-full transition-all ${i <= activeCount ? 'bg-white opacity-100' : 'bg-white opacity-30'}`}
          style={{ height: `${i * 4 + 4}px` }}
        />
      ))}
    </div>
  );
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  const color = CATEGORY_COLORS[article.category] || '#ccc';

  if (variant === 'tiny') {
    return (
      <div className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
        <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
          <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-gray-800 truncate leading-tight">{article.title}</h4>
          <p className="text-[11px] text-gray-400 truncate font-medium">{article.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer flex flex-col h-full rounded-[20px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Category Badge */}
        <div 
          className="absolute top-4 left-4 text-white text-[11px] font-black px-3 py-1.5 rounded-md shadow-sm tracking-wider"
          style={{ backgroundColor: color }}
        >
          {article.category.toUpperCase()}
        </div>

        {/* Level Indicator (Bottom Right for RTL) */}
        <div className="absolute bottom-2 right-2">
          <LevelIndicator level={article.level} />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mt-auto">
          <h3 className="font-extrabold text-[#2d3a54] group-hover:text-blue-600 transition-colors text-xl leading-tight text-left mb-1">
            {article.title}
          </h3>
          {article.subtitle && (
            <p className="text-gray-400 text-sm font-semibold text-left leading-snug">
              {article.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
