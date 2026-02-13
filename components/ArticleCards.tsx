
import React from 'react';
import { Article, Difficulty } from '../types';

export const FeaturedCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex-none w-[280px] h-[380px] relative rounded-[40px] overflow-hidden shadow-xl group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
      
      {/* Category Tag */}
      <div className="absolute top-6 left-6">
        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest ${article.category === 'SPORT' ? 'bg-[#3b71fe]' : 'bg-[#e91e63]'}`}>
          {article.category}
        </span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-7">
        {/* Titles */}
        <div className="mb-6">
          <h3 className="text-white text-2xl font-bold mb-1 tracking-tight leading-tight">{article.hebrewTitle}</h3>
          <p className="text-gray-300 text-[14px] font-medium opacity-90">{article.title}</p>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
             <span className="text-[11px] font-bold bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-2xl border border-white/5">
                {article.difficulty}
             </span>
          </div>
          <div className="text-white/80 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TopicCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex-none w-[160px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
      <img src={article.image} alt={article.title} className="w-full h-[100px] object-cover" />
      <div className="p-3">
        <h4 className="text-[13px] font-bold text-[#1d2b4f] truncate mb-1">{article.title}</h4>
        <p className="text-[10px] text-gray-500 font-medium">
          {article.difficulty} · {article.readTime}
        </p>
      </div>
    </div>
  );
};

export const NewsSmallItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer border-b border-gray-50 pb-3 last:border-0">
      <div className="w-16 h-12 rounded-lg overflow-hidden flex-none">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
      </div>
      <div className="min-w-0">
        <h5 className="text-[12px] font-bold text-[#1d2b4f] leading-tight mb-0.5 truncate">{item.hebrewTitle}</h5>
        <p className="text-[10px] text-gray-400 font-medium truncate">{item.title}</p>
      </div>
    </div>
  );
};

export const RecentItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#3b71fe] transition-colors">
       <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
       <div className="flex-1">
          <h6 className="text-[12px] font-bold text-[#1d2b4f] text-right">{item.hebrewTitle}</h6>
          <p className="text-[10px] text-gray-400 text-right">{item.title}</p>
       </div>
    </div>
  );
};
