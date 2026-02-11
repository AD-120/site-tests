
import React from 'react';
import { Level, Category, FilterState } from '../types';
import { CATEGORY_COLORS, LEVEL_COLORS } from '../constants';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, isOpen, onClose }) => {
  const levels: { id: Level; label: string; sub: string }[] = [
    { id: 'Beginner', label: 'Beginner', sub: 'מַתְחִילִים' },
    { id: 'Intermediate', label: 'Intermediate', sub: 'בֵּינוֹנִי' },
    { id: 'Advanced', label: 'Advanced', sub: 'מִתְקַדְּמִים' },
  ];

  const categories: { id: Category; label: string }[] = [
    { id: 'Blog', label: 'בְּלוֹג' },
    { id: 'News', label: 'חֲדָשׁוֹת' },
    { id: 'Cinema', label: 'קוֹלְנוֹעַ' },
    { id: 'Songs', label: 'שִׁירִים' },
    { id: 'Dialogue', label: 'דִיאָלוֹג' },
    { id: 'Culture', label: 'תַּרְבּוּת' },
    { id: 'History', label: 'סִפּוּרִים' },
    { id: 'Economy', label: 'כַּלְכָּלָה' },
    { id: 'Health', label: 'בְּרִיאוּת' },
    { id: 'Fashion', label: 'אוֹפְנָה' },
    { id: 'Travel', label: 'מַסָּע' },
    { id: 'Sport', label: 'סְפּוֹרְט' },
  ];

  const toggleLevel = (l: Level) => {
    setFilters(prev => ({ ...prev, level: prev.level === l ? 'All' : l }));
  };

  const toggleCategory = (c: Category) => {
    setFilters(prev => ({ ...prev, category: prev.category === c ? 'All' : c }));
  };

  const reset = () => setFilters({ level: 'All', category: 'All' });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-28 right-0 lg:right-auto h-screen lg:h-fit w-[280px] bg-white lg:bg-transparent z-[110] 
        transition-all duration-300 transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} 
        border-l lg:border-l-0 border-gray-100 overflow-y-auto lg:overflow-visible
      `}>
        <div className="p-6 lg:p-0 flex flex-col gap-8">
          
          {/* Header for Mobile */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-black text-[#2d3a54]">סינון כתבות</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Level Filter Section */}
          <div>
            <h3 className="text-lg font-black text-[#2d3a54] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#5b4efd] rounded-full"></span>
              רמת עברית
            </h3>
            <div className="flex flex-col gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => toggleLevel(lvl.id)}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                    filters.level === lvl.id 
                    ? 'border-[#5b4efd] bg-white shadow-md' 
                    : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-black uppercase tracking-wider ${filters.level === lvl.id ? 'text-[#5b4efd]' : 'text-gray-400'}`}>
                      {lvl.label}
                    </span>
                    <span className="text-base font-bold text-gray-700">
                      {lvl.sub}
                    </span>
                  </div>
                  {filters.level === lvl.id && (
                    <div className="w-6 h-6 rounded-full bg-[#5b4efd] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Section */}
          <div>
            <h3 className="text-lg font-black text-[#2d3a54] mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
              קטגוריות
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`py-3 px-2 rounded-xl text-center text-sm font-black transition-all duration-200 ${
                    filters.category === cat.id 
                    ? 'ring-2 ring-offset-2 ring-gray-200 scale-105 shadow-sm text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-white hover:shadow-sm'
                  }`}
                  style={{ 
                    backgroundColor: filters.category === cat.id ? CATEGORY_COLORS[cat.id] : undefined,
                    color: filters.category === cat.id ? 'white' : undefined
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-6 border-t border-gray-100 mt-4">
            {(filters.level !== 'All' || filters.category !== 'All') && (
              <button 
                onClick={reset}
                className="w-full py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-colors"
              >
                נקה סינון
              </button>
            )}
            <button className="w-full py-4 bg-[#2d3a54] text-white rounded-2xl font-black shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
              שדרוג מנוי
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
