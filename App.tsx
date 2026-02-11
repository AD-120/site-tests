
import React, { useState, useMemo } from 'react';
import { FilterState, Level, Category } from './types';
import { ARTICLES } from './data';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleCard from './components/ArticleCard';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ level: 'All', category: 'All' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const levelMatch = filters.level === 'All' || article.level === filters.level;
      const catMatch = filters.category === 'All' || article.category === filters.category;
      return levelMatch && catMatch;
    });
  }, [filters]);

  const isFiltering = filters.level !== 'All' || filters.category !== 'All';

  // Content groups for standard view
  const featured = ARTICLES.find(a => a.id === 'h1') || ARTICLES[0];
  const h2 = ARTICLES.find(a => a.id === 'h2') || ARTICLES[1];
  const h3 = ARTICLES.find(a => a.id === 'h3') || ARTICLES[2];
  const h4 = ARTICLES.find(a => a.id === 'h4') || ARTICLES[3];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-right font-sans" dir="rtl">
      <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
      
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Permanent E-commerce style Sidebar on the side */}
          <div className="flex-shrink-0">
            <Sidebar 
              filters={filters} 
              setFilters={setFilters} 
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Main Content Area (Flexible width) */}
          <div className="flex-1 min-w-0">
            {isFiltering ? (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-[#2d3a54]">
                    תוצאות עבורך <span className="text-gray-400 text-lg font-bold mr-4">({filteredArticles.length} כתבות נמצאו)</span>
                  </h2>
                </div>
                
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredArticles.map(article => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-inner">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <p className="text-2xl text-[#2d3a54] font-black mb-3">לא מצאנו כלום...</p>
                    <p className="text-gray-400 font-bold mb-8">נסו לשנות את רמת הקושי או את הקטגוריה שבחרתם</p>
                    <button 
                      onClick={() => setFilters({ level: 'All', category: 'All' })} 
                      className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                    >
                      נקה את כל הסינונים
                    </button>
                  </div>
                )}
              </section>
            ) : (
              <div className="space-y-16">
                {/* Hero Grid layout */}
                <section className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                  {/* Large Featured Card */}
                  <div className="xl:col-span-3">
                    <ArticleCard article={featured} />
                  </div>
                  
                  {/* Right side group */}
                  <div className="xl:col-span-2 flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-8">
                       <ArticleCard article={h3} />
                       <ArticleCard article={h2} />
                    </div>
                    <div className="flex-1">
                       <ArticleCard article={h4} />
                    </div>
                  </div>
                </section>

                {/* Categories Rows */}
                <section>
                   <div className="flex items-center gap-4 mb-8">
                      <div className="h-10 w-2 bg-yellow-400 rounded-full"></div>
                      <h2 className="text-3xl font-black text-[#2d3a54]">מיוחדים בשבילך <span className="text-gray-300 font-bold text-lg mr-2 italic">RECOMMENDED</span></h2>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {ARTICLES.slice(4, 10).map(a => <ArticleCard key={a.id} article={a} />)}
                   </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 mt-20">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-[#2d3a54] uppercase tracking-tighter">Steps to Hebrew</span>
            <div className="w-full h-1 bg-gradient-to-l from-transparent via-blue-400 to-transparent mt-2"></div>
            <span className="text-[11px] tracking-[0.5em] font-black text-blue-500 uppercase mt-2">עִבְרִית צַעַד אַחַר צַעַד</span>
          </div>
          <p className="text-gray-400 text-base font-bold">© 2025 stepstohebrew.com • למידת עברית בדרך חדשה</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
