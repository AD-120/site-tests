
import React from 'react';
import { Article, Difficulty } from '../types';

export const FeaturedCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex-none w-[280px] h-[320px] relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-md text-[10px] font-extrabold text-white uppercase tracking-wider ${article.category === 'SPORT' ? 'bg-[#3b71fe]' : 'bg-[#e91e63]'}`}>
          {article.category}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
        <h3 className="text-white text-xl font-bold mb-1">{article.hebrewTitle}</h3>
        <p className="text-gray-200 text-sm font-medium">{article.title}</p>
        <div className="mt-4 flex items-center justify-between">
           <span className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{article.difficulty}</span>
           <div className="flex gap-0.5">
             <div className="w-1.5 h-3 bg-white/30 rounded-full"></div>
             <div className="w-1.5 h-4 bg-white/60 rounded-full"></div>
             <div className="w-1.5 h-2 bg-white rounded-full"></div>
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
